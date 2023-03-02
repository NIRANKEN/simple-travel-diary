import { Duration, Stack } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambda_nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import path = require("path");
import { Construct } from "constructs";

export interface ApiProps {
  principalId: string;
}

export class SimpleTravelDiaryApiStack extends Construct {
  constructor(scope: Stack, id: string, props: ApiProps) {
    super(scope, id);

    // create lambda Functions
    const getNodejsFunctionProps = (
      fileName: string
    ): lambda_nodejs.NodejsFunctionProps => ({
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "/../lambda/src/handler/" + fileName),
      handler: "handler",
      timeout: Duration.seconds(30),
      environment: {
        PRINCIPAL_ID: props.principalId,
      },
    });

    const travelsHandler = new lambda_nodejs.NodejsFunction(
      this,
      "TravelsHandler",
      getNodejsFunctionProps("travels.ts")
    );

    // create Authorizer
    const authorizer = new lambda_nodejs.NodejsFunction(
      this,
      "AuthorizerHandler",
      getNodejsFunctionProps("authorizer.ts")
    );

    const auth = new apigateway.TokenAuthorizer(this, "NewTokenAuthorizer", {
      handler: authorizer,
      identitySource: "method.request.header.Authorization",
    });

    const restApi = new apigateway.RestApi(this, "Endpoint");
    const v1 = restApi.root.addResource("v1");
    const user = v1.resourceForPath("{userid}");
    const travels = user.addResource("travels");
    travels.addMethod("GET", new apigateway.LambdaIntegration(travelsHandler), {
      authorizer: auth,
    });
    travels.addCorsPreflight({
      allowOrigins: [
        "https://simple-travel-diary.niranken.tk",
        "http://localhost:9000",
      ],
      allowMethods: apigateway.Cors.ALL_METHODS,
      allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      allowCredentials: true,
      statusCode: 200,
      disableCache: true,
    });
  }
}
