import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerHandler,
} from "aws-lambda";
import { middyfy } from "../lib/lambda";

const principalId: string = "niranken-simple-travel-diary";

const authorizerHandler: APIGatewayTokenAuthorizerHandler = async ({
  authorizationToken,
  methodArn,
}) =>
  authorizationToken === `Bearer Allow ${principalId}`
    ? generatePolicy(principalId, "Allow", methodArn)
    : generatePolicy(principalId, "Deny", methodArn);

// Help function to generate an IAM policy
const generatePolicy = (
  principalId: string,
  effect: "Allow" | "Deny",
  resource: string
): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});

export const handler = middyfy(authorizerHandler);
