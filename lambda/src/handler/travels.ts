import { middyfy } from "../lib/lambda";
import {
  formatErrorJSONResponse,
  formatJSONResponse,
  NormalizedAPIGatewayProxyHandler,
} from "../lib/responses";
import { mockTravels } from "./mockTravels";

const travelsHandler: NormalizedAPIGatewayProxyHandler = async ({
  pathParameters: { userid },
}) => {
  // check user exists or not
  if (userid === "dummy-user") {
    return formatJSONResponse(mockTravels);
  } else {
    return formatErrorJSONResponse(404, `user: ${userid} is not found.`);
  }
};

export const handler = middyfy(travelsHandler);
