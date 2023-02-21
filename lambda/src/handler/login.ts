import { APIGatewayEvent, Context, APIGatewayProxyCallback } from "aws-lambda";
import { middyfy } from "../lib/lambda";
import { NoSchemaAPIGatewayProxyEvent } from "../lib/responses";

const loginHandler: NoSchemaAPIGatewayProxyEvent = async (
  event: APIGatewayEvent,
  __context: Context,
  __callback: APIGatewayProxyCallback
) => {
  console.log(event.headers);
  return {
    statusCode: 200,
    headers: { "Context-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.path}\n`,
  };
};

export const handler = middyfy(loginHandler);