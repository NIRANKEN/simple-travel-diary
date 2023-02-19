import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export class SimpleTravelDiaryApiStack extends Stack {
  public readonly hcViewerUrl: CfnOutput;
  public readonly hcEndpoint: CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda/src/handlers"),
      handler: "hello.handler",
    });

    const authFunc = new lambda.Function(this,'AuthorizationFunction',{
      runtime:lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda/src/handlers"),
      handler:'authorizer.handler'
    });

    const auth = new apigw.TokenAuthorizer(this, "NewRequestAuthorizer", {
      handler: authFunc,
      identitySource: "method.request.header.AuthorizeToken"
    })

    // defines an API Gateway REST API resource backed by our "hello" function.
    const gateway = new apigw.LambdaRestApi(this, "Endpoint", {
      handler: hello,
    });

    // add resources to api-gateway
    const helloResource = gateway.root.addResource("hello");
    helloResource.addMethod("GET", new apigw.LambdaIntegration(hello), {authorizer: auth});

    // write gatewayUrl as a CfnOutput
    this.hcEndpoint = new CfnOutput(this, "GatewayUrl", {
      value: gateway.url,
    });
  }
}
