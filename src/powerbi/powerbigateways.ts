import * as cdk from 'aws-cdk-lib';
import {
  aws_ec2 as ec2,
  aws_autoscaling as autoscaling,
  aws_iam as iam,
} from 'aws-cdk-lib';
import * as constructs from 'constructs';

export interface PrefixListPortTuple {
  readonly prefixList: string;
  readonly connection: ec2.Port;
}

export interface PowerBiGatewaysProps {
  readonly vpc: ec2.Vpc;
  readonly subnetGroupName: string;
  readonly asgName: string;
  readonly minCapacity: number; //= 2;
  readonly maxCapacity: number; // = 5;
  readonly cooldownMinutes: cdk.Duration; //  cdk.Duration.minutes(5);
  readonly maxInstanceLifetime: cdk.Duration; // cdk.Duration.days(7),
  readonly targetCpu: number; //= 70,
  readonly instanceClass: ec2.InstanceClass;
  readonly instanceSize: ec2.InstanceSize;
  readonly allowedPrefixListPortTuples?: undefined | PrefixListPortTuple[];
  readonly weekdayScaling?: undefined | boolean;
}

/**
 * PowerBiGateways: This construct builds immutable powerbigateways that are self replacing, and updating.
 */
export class PowerBiGateways extends constructs.Construct {
  /**
	   * AttachmentId when the vpc is attached to a Cloudwan
	   */
  public thing: string | undefined;
  /**
	 *
	 * @param scope
	 * @param id
	 * @param props
	 */
  constructor(scope: constructs.Construct, id: string, props: PowerBiGatewaysProps) {
    super(scope, id);


    // craft user-data
    const powerBIUserData = ec2.UserData.forWindows();
    powerBIUserData.addCommands(
      '',
      '',
    );

    // create ASG
    const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
      vpc: props.vpc,
      allowAllOutbound: false,
      autoScalingGroupName: props.asgName,
      vpcSubnets: { subnetGroupName: props.subnetGroupName },
      cooldown: props.cooldownMinutes,
      requireImdsv2: true,

      groupMetrics: [autoscaling.GroupMetrics.all()],
      instanceType: ec2.InstanceType.of(props.instanceClass, props.instanceSize),
      machineImage: new ec2.LookupMachineImage({ // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.LookupMachineImageProps.html
        name: 'xxxx',
        owners: ['xxxx'],
        windows: true,
      }),
      maxInstanceLifetime: props.maxInstanceLifetime,
      minCapacity: props.minCapacity,
      maxCapacity: props.maxCapacity,
      userData: powerBIUserData,
    });

    // scale to track cpu load
    asg.scaleOnCpuUtilization('ScaleoutCPU', {
      targetUtilizationPercent: props.targetCpu,
    });

    // optional time based scaling to reduce min, for workhours
    if (props.weekdayScaling) {
      asg.scaleOnSchedule('ScaleUpinmorning', {
        schedule: autoscaling.Schedule.cron({
          hour: '8',
          minute: '0',
          weekDay: '1-5',	// monday to friday
        }),
        minCapacity: props.minCapacity,
      });
      asg.scaleOnSchedule('ScaleDownEvenings', {
        schedule: autoscaling.Schedule.cron({
          hour: '17',
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
    if (props.allowedPrefixListPortTuples) {
      props.allowedPrefixListPortTuples.forEach((tuple) => {
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

  }
}