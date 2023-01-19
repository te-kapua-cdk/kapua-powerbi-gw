import * as cdk from 'aws-cdk-lib';
import {
  aws_ec2 as ec2,
  aws_autoscaling as autoscaling,
  aws_iam as iam,
  aws_secretsmanager as sm,
} from 'aws-cdk-lib';
import * as constructs from 'constructs';


/**
 * This defines entrys in an outbound security rule, to allow access to datasources
 */
export interface PrefixListPortTuple {
  /**
   * a prefix list id
   */
  readonly prefixList: string;
  /**
   * a ec2.Port, describing the port/protocols that are allowed to be used
   */
  readonly connection: ec2.Port;
}

/**
 * Create a group of PowerBi Gateways, that scale on demand to provide
 * a gateway functon between internal datasources and PowerBI.com.
 * The instances are intended to be immutable, and regularly replaced using up to date
 * base images.
 */
export interface PowerBiGatewaysProps {
  /**
   * The VPC that the PowerBiGateways will be placed
   */
  readonly vpc: ec2.IVpc | ec2.Vpc;
  /**
   * The subnets where the PowerBIGateways will be placed
   */
  readonly subnets: ec2.ISubnet[];
  /**
   * A name for the Applicaiton Scaling Group
   */
  readonly asgName: string;
  /**
   * The Windows Machine Image type.
   */
  readonly machineImage: ec2.WindowsVersion;
  /**
   * Full Arn of the secret that contains the credentials for Power BI.
   */
  readonly powerBIsecretArn: string;
  /**
   * Initial MinCapacity of machines. Typically this would be 2
   */
  readonly minCapacity: number;
  /**
   * Maximum number of machines that will be deployed
   */
  readonly maxCapacity: number; // = 5;
  /**
   * How long before the scaling will reduce the size.
   * Suggested starting point for this is 15 minutes.
   */
  readonly cooldownMinutes: cdk.Duration; //  cdk.Duration.minutes(5);
  /**
   * What is the maximum life time of an instance before the instance is withdrawn
   */
  readonly maxInstanceLifetime: cdk.Duration; // cdk.Duration.days(7),
  /**
   * What level of CPU to use to invoke scaling up
   */
  readonly targetCpu: number; //= 70,
  /**
   * the Class of the instance
   */
  readonly instanceClass: ec2.InstanceClass;
  /**
   * the Size of the instance
   */
  readonly instanceSize: ec2.InstanceSize;
  /**
   * allowed PrefixPort Tuples for security group creation
   */
  readonly allowedInternalPrefixListPortTuples?: undefined | PrefixListPortTuple[];
  /**
   * Allowable domains to connect to in TLS
   */
  readonly additionalAllowableInternetFQDN?: string[];
  /*
  * Turn on out of office scale down
  */
  readonly weekdayScaling?: undefined | boolean;
  /*
  * Offset from UTC for weekday scaling, ( range +13 to -12)
  */
  readonly timeZone?: undefined | number;
  /*
  * UserData for the instances
  */
  readonly userData?: ec2.UserData | undefined;
}

/**
 * PowerBiGateways: This construct builds immutable powerbigateways that are self replacing
 */
export class PowerBiGateways extends constructs.Construct {
  /**

	 * @param scope
	 * @param id
	 * @param props
	 */
  constructor(scope: constructs.Construct, id: string, props: PowerBiGatewaysProps) {
    super(scope, id);

    // create ASG
    const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
      vpc: props.vpc,
      allowAllOutbound: false,
      autoScalingGroupName: props.asgName,
      vpcSubnets: { subnets: props.subnets },
      cooldown: props.cooldownMinutes,
      requireImdsv2: true,
      groupMetrics: [autoscaling.GroupMetrics.all()],
      instanceType: ec2.InstanceType.of(props.instanceClass, props.instanceSize),
      machineImage: ec2.MachineImage.latestWindows(props.machineImage),
      maxInstanceLifetime: props.maxInstanceLifetime,
      minCapacity: props.minCapacity,
      maxCapacity: props.maxCapacity,
      userData: props.userData,
    });

    // scale to track cpu load
    asg.scaleOnCpuUtilization('ScaleoutCPU', {
      targetUtilizationPercent: props.targetCpu,
    });

    // optional time based scaling to reduce min, for workhours
    if (props.weekdayScaling) {

      let morning = 6;
      let evening = 18;

      if (props.timeZone) {
        if (props.timeZone > 13 || props.timeZone < -12 ) {
          throw new Error('Invalid TimeZone specified');
        }
        morning += props.timeZone;
        evening += props.timeZone;
        if (morning > 23) {
          morning -= 24;
        }
        if (morning < 0 ) {
          morning += 24;
        }
        if (evening > 23) {
          evening -= 24;
        }
        if (evening < 0 ) {
          morning += 24;
        }
      }

      asg.scaleOnSchedule('ScaleUpinmorning', {
        schedule: autoscaling.Schedule.cron({
          hour: morning.toString(),
          minute: '0',
          weekDay: '1-5',	// monday to friday
        }),
        minCapacity: props.minCapacity,
      });

      asg.scaleOnSchedule('ScaleDownEvenings', {
        schedule: autoscaling.Schedule.cron({
          hour: evening.toString(),
          minute: '30',
          weekDay: '1-5',	// monday to friday
        }),
        minCapacity: 1,
      });
    }

    const powerBISG = new ec2.SecurityGroup(this, 'PowerBIGatewaySG', {
      vpc: props.vpc,
      description: 'powerBIgatewaySG',
      allowAllOutbound: false,
    });

    // allow connections to datasources
    if (props.allowedInternalPrefixListPortTuples) {
      props.allowedInternalPrefixListPortTuples.forEach((tuple) => {
        powerBISG.addEgressRule(
          ec2.Peer.prefixList(tuple.prefixList),
          tuple.connection,
        );
      });
    }
    // allow connections to powerBi.com
    //https://learn.microsoft.com/en-us/data-integration/gateway/service-gateway-communication
    // tcp 443, 5671, 5672, and from 9350 through 9354
    // *.servicebus.windows.net

    powerBISG.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443));
    powerBISG.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.tcpRange(5671, 5672));
    powerBISG.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.tcpRange(9350, 9354));

    // attach the security group to the ASG
    asg.addSecurityGroup(powerBISG);

    // allow Instances to be managed by SSM
    asg.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));

    // allow the instance to read the powerbi secret
    const secret = sm.Secret.fromSecretCompleteArn(this, 'secret', props.powerBIsecretArn);
    secret.grantRead(asg.role);

    //

  }
}