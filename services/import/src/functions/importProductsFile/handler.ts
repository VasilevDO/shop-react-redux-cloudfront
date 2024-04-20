import { formatFailureResponse, ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'eu-north-1'})

const handler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  try {
  const name = event.queryStringParameters.name;

  const bucket = 'task5-mc-bucket'
  const catalogPath = `uploaded/${name}`

  const params = {
    Bucket: bucket,
    Key: catalogPath,
    Expires: 60,
    ContentType: 'text/csv'
  }

  const signedUrl = await s3.getSignedUrl('putObject', params)

  return formatJSONResponse(signedUrl);
} catch (e) {
  console.log(e)

  return formatFailureResponse()
}
};

export const main = middyfy(handler);
