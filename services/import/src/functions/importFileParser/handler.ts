import * as AWS from 'aws-sdk'
const csv = require('csv-parser');

export const main = async (event) => {
  try {
    const s3 = new AWS.S3({ region: 'eu-north-1', apiVersion: '2006-03-01' })
    
    for (const record of event.Records) {
      const params = {
        Bucket: record.s3.bucket.name,
        Key: record.s3.object.key,
      }

      const rows = [];

      const s3Stream = s3.getObject(params).createReadStream();

      s3Stream
          .pipe(csv())
          .on('data', (data) => {
            rows.push(data)
          })
          .on('error', (error) => { console.log(error)})
          .on('end', () => {
            for (const row of rows ) {
              console.log(row)
            }
          })
    }
  } catch (e) {
    console.log(e)
  }
};
