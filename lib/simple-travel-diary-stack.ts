import { CfnOutput, Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3_deploy from "aws-cdk-lib/aws-s3-deployment";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53_targets from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as iam from "aws-cdk-lib/aws-iam";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as secrets_manager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export interface StaticSiteProps {
  domainName: string;
  appSubDomain: string;
  googleClientId: string;
  googleClientSecret: string;
  googleCognitoSecretArn: string;
}

export class SimpleTravelDiaryStack extends Construct {
  constructor(scope: Stack, id: string, props: StaticSiteProps) {
    super(scope, id);

    // The code that defines your stack goes here
    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName: props.domainName,
    });
    const appDomain = props.appSubDomain + "." + props.domainName;
    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      "cloudfront-OAI",
      {
        comment: `OAI for ${id}`,
      }
    );
    new CfnOutput(this, "WebAppPage", { value: "https://" + appDomain });

    // create GoogleUserAuth
    const userPool = new cognito.UserPool(this, "simple-travel-diary-userpool", {
      userPoolName: "simple-travel-diary-user-pool",
      selfSignUpEnabled: false, // TODO: should be true when sign-up is ready
      signInAliases: {
        email: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });
    const userPoolClient = new cognito.UserPoolClient(this, "simple-travel-diary-userpool-client", {
      userPool,
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userSrp: true,
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.GOOGLE,
      ],
      oAuth: {
        callbackUrls: [`https://${appDomain}`, "http://localhost:9000"], // TODO: 開発用にstagingとは異なるuserPoolつくる
        logoutUrls: [`https://${appDomain}`, "http://localhost:9000"],
      },
    });
    const secrets = secrets_manager.Secret.fromSecretAttributes(this, "staging/SimpleTravelDiary/CognitoClientSecret", {
      secretCompleteArn: props.googleCognitoSecretArn,
    });
    const provider = new cognito.UserPoolIdentityProviderGoogle(
      this,
      "simple-travel-diary-userpool-idp-google",
      {
        clientId: props.googleClientId,
        clientSecretValue: secrets.secretValue,
        userPool: userPool,
        scopes: ["email", "profile", "openid"],
        attributeMapping: {
          email: cognito.ProviderAttribute.GOOGLE_EMAIL,
          givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
          familyName: cognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
          profilePicture: cognito.ProviderAttribute.GOOGLE_PICTURE,
        },
      }
    );
    userPoolClient.node.addDependency(provider);
    const cognitoDomain = userPool.addDomain("simple-travel-diary-auth-domain", {
      cognitoDomain: {
        domainPrefix: props.appSubDomain
      }
    });
    new CfnOutput(this, "UserPoolId", { value: userPool.userPoolId });
    new CfnOutput(this, "UserPoolClientId", { value: userPoolClient.userPoolClientId });
    new CfnOutput(this, "CognitoAuthDomainName", { value: cognitoDomain.domainName });

    // Content bucket for app
    const appBucket = new s3.Bucket(this, "SimpleTravelDiaryAppBucket", {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true, // NOT recommended for production code
    });

    // Grant access to cloudfront
    appBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [appBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );
    new CfnOutput(this, "Bucket", { value: appBucket.bucketName });

    // TLS certificate
    const certificate = new acm.Certificate(this, "AppCertificate", {
      domainName: appDomain,
      validation: acm.CertificateValidation.fromDns(zone),
    });
    new CfnOutput(this, "Certificate", { value: certificate.certificateArn });

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, "AppDistribution", {
      certificate: certificate,
      defaultRootObject: "index.html",
      domainNames: [appDomain],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
          ttl: Duration.minutes(30),
        },
      ],
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(appBucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
    new CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });

    // Route53 alias recourd for the CloudFront distribution
    new route53.ARecord(this, "AppAliasRecord", {
      recordName: appDomain,
      target: route53.RecordTarget.fromAlias(
        new route53_targets.CloudFrontTarget(distribution)
      ),
      zone,
    });

    // Deploy app contents to S3 bucket
    new s3_deploy.BucketDeployment(this, "DeployWithInvalidation", {
      sources: [s3_deploy.Source.asset("./app/build")],
      destinationBucket: appBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
