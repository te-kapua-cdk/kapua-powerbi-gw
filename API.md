# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### PowerBiGateways <a name="PowerBiGateways" id="kapua-powerbi-gw.PowerBiGateways"></a>

PowerBiGateways: This construct builds immutable powerbigateways that are self replacing.

#### Initializers <a name="Initializers" id="kapua-powerbi-gw.PowerBiGateways.Initializer"></a>

```typescript
import { PowerBiGateways } from 'kapua-powerbi-gw'

new PowerBiGateways(scope: Construct, id: string, props: PowerBiGatewaysProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#kapua-powerbi-gw.PowerBiGateways.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#kapua-powerbi-gw.PowerBiGateways.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#kapua-powerbi-gw.PowerBiGateways.Initializer.parameter.props">props</a></code> | <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps">PowerBiGatewaysProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="kapua-powerbi-gw.PowerBiGateways.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="kapua-powerbi-gw.PowerBiGateways.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="kapua-powerbi-gw.PowerBiGateways.Initializer.parameter.props"></a>

- *Type:* <a href="#kapua-powerbi-gw.PowerBiGatewaysProps">PowerBiGatewaysProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#kapua-powerbi-gw.PowerBiGateways.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="kapua-powerbi-gw.PowerBiGateways.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#kapua-powerbi-gw.PowerBiGateways.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="kapua-powerbi-gw.PowerBiGateways.isConstruct"></a>

```typescript
import { PowerBiGateways } from 'kapua-powerbi-gw'

PowerBiGateways.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="kapua-powerbi-gw.PowerBiGateways.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#kapua-powerbi-gw.PowerBiGateways.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="kapua-powerbi-gw.PowerBiGateways.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### PowerBiGatewaysProps <a name="PowerBiGatewaysProps" id="kapua-powerbi-gw.PowerBiGatewaysProps"></a>

Create a group of PowerBi Gateways, that scale on demand to provide a gateway functon between internal datasources and PowerBI.com. The instances are intended to be immutable, and regularly replaced using up to date base images.

#### Initializer <a name="Initializer" id="kapua-powerbi-gw.PowerBiGatewaysProps.Initializer"></a>

```typescript
import { PowerBiGatewaysProps } from 'kapua-powerbi-gw'

const powerBiGatewaysProps: PowerBiGatewaysProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.asgName">asgName</a></code> | <code>string</code> | A name for the Applicaiton Scaling Group. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.cooldownMinutes">cooldownMinutes</a></code> | <code>aws-cdk-lib.Duration</code> | How long before the scaling will reduce the size. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.instanceClass">instanceClass</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceClass</code> | the Class of the instance. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.instanceSize">instanceSize</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceSize</code> | the Size of the instance. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.machineImage">machineImage</a></code> | <code>aws-cdk-lib.aws_ec2.WindowsVersion</code> | The Windows Machine Image type. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.maxCapacity">maxCapacity</a></code> | <code>number</code> | Maximum number of machines that will be deployed. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.maxInstanceLifetime">maxInstanceLifetime</a></code> | <code>aws-cdk-lib.Duration</code> | What is the maximum life time of an instance before the instance is withdrawn. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.minCapacity">minCapacity</a></code> | <code>number</code> | Initial MinCapacity of machines. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.powerBIsecretArn">powerBIsecretArn</a></code> | <code>string</code> | Full Arn of the secret that contains the credentials for Power BI. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.subnets">subnets</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet[]</code> | The subnets where the PowerBIGateways will be placed. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.targetCpu">targetCpu</a></code> | <code>number</code> | What level of CPU to use to invoke scaling up. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc \| aws-cdk-lib.aws_ec2.Vpc</code> | The VPC that the PowerBiGateways will be placed. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.additionalAllowableInternetFQDN">additionalAllowableInternetFQDN</a></code> | <code>string[]</code> | Allowable domains to connect to in TLS. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.allowedInternalPrefixListPortTuples">allowedInternalPrefixListPortTuples</a></code> | <code><a href="#kapua-powerbi-gw.PrefixListPortTuple">PrefixListPortTuple</a>[]</code> | allowed PrefixPort Tuples for security group creation. |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.timeZone">timeZone</a></code> | <code>number</code> | *No description.* |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.userData">userData</a></code> | <code>aws-cdk-lib.aws_ec2.UserData</code> | *No description.* |
| <code><a href="#kapua-powerbi-gw.PowerBiGatewaysProps.property.weekdayScaling">weekdayScaling</a></code> | <code>boolean</code> | *No description.* |

---

##### `asgName`<sup>Required</sup> <a name="asgName" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.asgName"></a>

```typescript
public readonly asgName: string;
```

- *Type:* string

A name for the Applicaiton Scaling Group.

---

##### `cooldownMinutes`<sup>Required</sup> <a name="cooldownMinutes" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.cooldownMinutes"></a>

```typescript
public readonly cooldownMinutes: Duration;
```

- *Type:* aws-cdk-lib.Duration

How long before the scaling will reduce the size.

Suggested starting point for this is 15 minutes.

---

##### `instanceClass`<sup>Required</sup> <a name="instanceClass" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.instanceClass"></a>

```typescript
public readonly instanceClass: InstanceClass;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceClass

the Class of the instance.

---

##### `instanceSize`<sup>Required</sup> <a name="instanceSize" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.instanceSize"></a>

```typescript
public readonly instanceSize: InstanceSize;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceSize

the Size of the instance.

---

##### `machineImage`<sup>Required</sup> <a name="machineImage" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.machineImage"></a>

```typescript
public readonly machineImage: WindowsVersion;
```

- *Type:* aws-cdk-lib.aws_ec2.WindowsVersion

The Windows Machine Image type.

---

##### `maxCapacity`<sup>Required</sup> <a name="maxCapacity" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.maxCapacity"></a>

```typescript
public readonly maxCapacity: number;
```

- *Type:* number

Maximum number of machines that will be deployed.

---

##### `maxInstanceLifetime`<sup>Required</sup> <a name="maxInstanceLifetime" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.maxInstanceLifetime"></a>

```typescript
public readonly maxInstanceLifetime: Duration;
```

- *Type:* aws-cdk-lib.Duration

What is the maximum life time of an instance before the instance is withdrawn.

---

##### `minCapacity`<sup>Required</sup> <a name="minCapacity" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.minCapacity"></a>

```typescript
public readonly minCapacity: number;
```

- *Type:* number

Initial MinCapacity of machines.

Typically this would be 2

---

##### `powerBIsecretArn`<sup>Required</sup> <a name="powerBIsecretArn" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.powerBIsecretArn"></a>

```typescript
public readonly powerBIsecretArn: string;
```

- *Type:* string

Full Arn of the secret that contains the credentials for Power BI.

---

##### `subnets`<sup>Required</sup> <a name="subnets" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.subnets"></a>

```typescript
public readonly subnets: ISubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet[]

The subnets where the PowerBIGateways will be placed.

---

##### `targetCpu`<sup>Required</sup> <a name="targetCpu" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.targetCpu"></a>

```typescript
public readonly targetCpu: number;
```

- *Type:* number

What level of CPU to use to invoke scaling up.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc | Vpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc | aws-cdk-lib.aws_ec2.Vpc

The VPC that the PowerBiGateways will be placed.

---

##### `additionalAllowableInternetFQDN`<sup>Optional</sup> <a name="additionalAllowableInternetFQDN" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.additionalAllowableInternetFQDN"></a>

```typescript
public readonly additionalAllowableInternetFQDN: string[];
```

- *Type:* string[]

Allowable domains to connect to in TLS.

---

##### `allowedInternalPrefixListPortTuples`<sup>Optional</sup> <a name="allowedInternalPrefixListPortTuples" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.allowedInternalPrefixListPortTuples"></a>

```typescript
public readonly allowedInternalPrefixListPortTuples: PrefixListPortTuple[];
```

- *Type:* <a href="#kapua-powerbi-gw.PrefixListPortTuple">PrefixListPortTuple</a>[]

allowed PrefixPort Tuples for security group creation.

---

##### `timeZone`<sup>Optional</sup> <a name="timeZone" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.timeZone"></a>

```typescript
public readonly timeZone: number;
```

- *Type:* number

---

##### `userData`<sup>Optional</sup> <a name="userData" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.userData"></a>

```typescript
public readonly userData: UserData;
```

- *Type:* aws-cdk-lib.aws_ec2.UserData

---

##### `weekdayScaling`<sup>Optional</sup> <a name="weekdayScaling" id="kapua-powerbi-gw.PowerBiGatewaysProps.property.weekdayScaling"></a>

```typescript
public readonly weekdayScaling: boolean;
```

- *Type:* boolean

---

### PrefixListPortTuple <a name="PrefixListPortTuple" id="kapua-powerbi-gw.PrefixListPortTuple"></a>

This defines entrys in an outbound security rule, to allow access to datasources.

#### Initializer <a name="Initializer" id="kapua-powerbi-gw.PrefixListPortTuple.Initializer"></a>

```typescript
import { PrefixListPortTuple } from 'kapua-powerbi-gw'

const prefixListPortTuple: PrefixListPortTuple = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#kapua-powerbi-gw.PrefixListPortTuple.property.connection">connection</a></code> | <code>aws-cdk-lib.aws_ec2.Port</code> | a ec2.Port, describing the port/protocols that are allowed to be used. |
| <code><a href="#kapua-powerbi-gw.PrefixListPortTuple.property.prefixList">prefixList</a></code> | <code>string</code> | a prefix list id. |

---

##### `connection`<sup>Required</sup> <a name="connection" id="kapua-powerbi-gw.PrefixListPortTuple.property.connection"></a>

```typescript
public readonly connection: Port;
```

- *Type:* aws-cdk-lib.aws_ec2.Port

a ec2.Port, describing the port/protocols that are allowed to be used.

---

##### `prefixList`<sup>Required</sup> <a name="prefixList" id="kapua-powerbi-gw.PrefixListPortTuple.property.prefixList"></a>

```typescript
public readonly prefixList: string;
```

- *Type:* string

a prefix list id.

---



