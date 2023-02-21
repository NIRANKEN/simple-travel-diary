import { APIGatewayEvent, Context, APIGatewayProxyCallback } from "aws-lambda";
import { middyfy } from "../lib/lambda";
import {
  formatJSONResponse,
  NoSchemaAPIGatewayProxyEvent,
} from "../lib/responses";

const helloHandler: NoSchemaAPIGatewayProxyEvent = async (
  event: APIGatewayEvent,
  __context: Context,
  __callback: APIGatewayProxyCallback
) => {
  console.log(event.headers);
  return formatJSONResponse({
    message: `Hello, CDK! You've hit ${event.path}\n`,
  });
};

export const handler = middyfy(helloHandler);
