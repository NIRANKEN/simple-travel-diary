import type {
  APIGatewayProxyEvent,
  APIGatewayProxyEventBase,
  APIGatewayProxyEventMultiValueQueryStringParameters,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema, JSONSchema } from 'json-schema-to-ts';

export type ValidatedAPIGatewayProxyEvent<S extends JSONSchema> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};

export type ValidatedAPIGatewayProxyResult<S extends JSONSchema> = Omit<APIGatewayProxyResult, 'body'> & {
  body: FromSchema<S>;
};

export type ValidatedEventAPIGatewayProxyEvent<S extends JSONSchema> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;
export type NoSchemaAPIGatewayProxyEvent = Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
>;

type AuthorizedAPIGatewayProxyEvent = APIGatewayProxyEventBase<{
  principalId: string;
}>;

type NormalizedAPIGatewayProxyEvent = Omit<
  AuthorizedAPIGatewayProxyEvent,
  'pathParameters' | 'queryStringParameters' | 'multiValueQueryStringParameters'
> & {
  /*
   * キーが正しければルータにより値が null の状態で Lambda に渡ってくることことはないはず。
   * キーが違うことにより null になるのは設計時の問題なのでコード上で null check せずにいいように optional な扱いにしない。
   */
  pathParameters: { [name: string]: string };
  queryStringParameters: APIGatewayProxyEventQueryStringParameters;
  multiValueQueryStringParameters: APIGatewayProxyEventMultiValueQueryStringParameters;
};

export type NormalizedAPIGatewayProxyHandler = Handler<
  NormalizedAPIGatewayProxyEvent,
  APIGatewayProxyResult
>;

const headers = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': process.env.IS_LOCAL
    ? 'http://localhost:9000'
    : 'https://simple-travel-diary.niranken.tk',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Credentials': 'true',
};

export const formatJSONResponse = (
  response: Record<string, unknown> | Array<Record<string, unknown>>
) => {
  return {
    statusCode: 200,
    ...{headers},
    body: JSON.stringify(response),
  };
};

export const formatErrorJSONResponse = (
  statusCode: 404 | 502,
  message: string
) => {
  return {
    statusCode: statusCode,
    ...{headers},
    body: JSON.stringify({
      message,
    }),
  };
};