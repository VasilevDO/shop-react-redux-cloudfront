import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

const headers = {
  "Access-Control-Allow-Origin": "*"
}

export const formatJSONResponse = <T>(response: T, statusCode = 200) => {
  return {
    statusCode,
    headers,
    body: JSON.stringify(response)
  }
}

export const formatFailureResponse = (statusCode = 500, message = 'Something went wrong') => {
  return { statusCode, headers, body: JSON.stringify({ message })}
}
