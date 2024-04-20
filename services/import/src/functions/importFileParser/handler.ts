import * as AWS from 'aws-sdk'
const csv = require('csv-parser');

export const main = async (event) => {
  try {
    const s3 = new AWS.S3({ region: 'eu-north-1', apiVersion: '2006-03-01' })
    const sqs = new AWS.SQS({region: 'eu-north-1'})
    
    for (const record of event.Records) {
      const params = {
        Bucket: record.s3.bucket.name,
        Key: record.s3.object.key,
      }

      const s3Stream = s3.getObject(params).createReadStream();

      await new Promise<void>((resolve)=>  {
        const rows = [];
    
        s3Stream
        .pipe(csv({
          separator: ';',
          headers: ['title', 'description', 'price', 'count'],
          skipLines: 1
        }))
        .on('data', (data) => {
          rows.push(data)
        })
        .on('error', (error) => { console.log(error)})
        .on('end', async () => {
          for (const row of rows) {
            const msg = JSON.stringify(row)

            const sqsParams = {
              MessageBody: msg,
              QueueUrl: 'https://sqs.eu-north-1.amazonaws.com/637423538581/catalogItemsQueue'
            };

            await sqs.sendMessage(sqsParams).promise()
          }
          resolve()
        })
      })
    }

  } catch (e) {
    console.log(e)
  }
};
