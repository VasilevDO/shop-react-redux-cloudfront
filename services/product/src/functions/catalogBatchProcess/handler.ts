import { createProduct } from "@services/products";
import * as AWS from 'aws-sdk';

const sns = new AWS.SNS({region: 'eu-north-1'})

export const main = async (event) => {
  try {
    for (const record of event.Records) {
      const parsedBody = JSON.parse(record.body)
      const {title, description, price, count} = parsedBody

      await createProduct(title, description, price, count)

      const params = {
        Message: `New product has been created: title - ${title}, description - ${description}, price - ${price}, count - ${count}`,
        Subject: 'New product alert',
        TopicArn: 'arn:aws:sns:eu-north-1:637423538581:createProductTopic'
      };

      await sns.publish(params).promise()
    }
  } catch (e) {
    console.log(e);
  }
};
