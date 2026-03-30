import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from "aws-cdk-lib/aws-s3"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import * as path from 'path';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as ecrdeploy from 'cdk-ecr-deployment';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';


import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2"

import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations"
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class WarehouseInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dbHost = ssm.StringParameter.valueForStringParameter(this, '/warehouse/DB_HOST');
    const dbName = ssm.StringParameter.valueForStringParameter(this, '/warehouse/DB_NAME');
    const dbUser = ssm.StringParameter.valueForStringParameter(this, '/warehouse/DB_USER');
    const dbPort = ssm.StringParameter.valueForStringParameter(this, '/warehouse/DB_PORT');
    const dbPasswordParamVersion = Number(this.node.tryGetContext('dbPasswordParamVersion') ?? 1);
    const dbPassword = ssm.StringParameter.fromSecureStringParameterAttributes(this, 'DbPasswordParameter', {
      parameterName: '/warehouse/DB_PASSWORD',
      version: dbPasswordParamVersion,
    });


    const bucket = new s3.Bucket(this, "ImagesBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.PUT, s3.HttpMethods.GET],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"]
        }
      ]
    })

    const uploadLambda = new lambda.Function(this, "UploadImageLambda", {
      functionName: 'uploadImage',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda/generate-upload-url"),
      environment: {
        BUCKET_NAME: bucket.bucketName
      }
    })

    bucket.grantPut(uploadLambda)

    const vpc = new ec2.Vpc(this, 'AppVpc', {
      maxAzs: 2,
      natGateways: 1,
    });

    const repository = new ecr.Repository(this, 'BackendRepository', {
      repositoryName: 'backend-repository',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const cluster = new ecs.Cluster(this, 'AppCluster', {
      vpc,
      clusterName: 'warehouse-backend-cluster'
    });

    const logGroup = new logs.LogGroup(this, 'AppLogGroup', {
      retention: logs.RetentionDays.ONE_WEEK,
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {
      cpu: 256,
      memoryLimitMiB: 512,
    });

    const dockerImage = new DockerImageAsset(this, 'some-image', {
      directory: path.join(__dirname, '../../warehouse-backend'),
      platform: ecr_assets.Platform.LINUX_AMD64,
    });

    const deployBackendImageToAppRepo = new ecrdeploy.ECRDeployment(this, 'DeployBackendImageToAppRepo', {
      src: new ecrdeploy.DockerImageName(dockerImage.imageUri),
      dest: new ecrdeploy.DockerImageName(`${repository.repositoryUri}:latest`),
    });
    deployBackendImageToAppRepo.node.addDependency(repository);
    deployBackendImageToAppRepo.node.addDependency(dockerImage);

    const container = taskDefinition.addContainer('AppContainer', {
      image: ecs.ContainerImage.fromEcrRepository(repository, 'latest'),
      logging: ecs.LogDrivers.awsLogs({
        logGroup,
        streamPrefix: 'ecs',
      }),
      environment: {
        NODE_ENV: 'production',
        DB_USER: dbUser,
        DB_NAME: dbName,
        DB_HOST: dbHost,
        DB_PORT: dbPort,
      },
      secrets: {
        DB_PASSWORD: ecs.Secret.fromSsmParameter(dbPassword),
      },
    });

    repository.grantPull(taskDefinition.executionRole!);
    dbPassword.grantRead(taskDefinition.taskRole);

    container.addPortMappings({
      containerPort: 3000,
    });

    const service = new ecs.FargateService(this, 'AppService', {
      cluster,
      taskDefinition,
      desiredCount: 1,
      assignPublicIp: false,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      serviceName: 'warehouse-backend-service'
    });
    service.node.addDependency(deployBackendImageToAppRepo);

    const alb = new elbv2.ApplicationLoadBalancer(this, 'ALB', {
      vpc,
      internetFacing: true,
    });

    const listener = alb.addListener('HttpListener', {
      port: 80,
      open: true,
    });

    listener.addTargets('ECS', {
      port: 80,
      targets: [
        service.loadBalancerTarget({
          containerName: 'AppContainer',
          containerPort: 3000,
        }),
      ],
      healthCheck: {
        path: '/',
        interval: cdk.Duration.seconds(30),
      },
    });

    const scaling = service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 3,
    });

    scaling.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50,
    });


    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: alb.loadBalancerDnsName,
    });

    new cdk.CfnOutput(this, 'EcrRepositoryUri', {
      value: repository.repositoryUri,
    });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'WarehouseInfrastructureQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}