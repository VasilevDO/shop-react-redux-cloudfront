const catalogItemsQueue = {
  Type: "AWS::SQS::Queue",
  Properties: {
    QueueName: "catalogItemsQueue"
  },
}

const catalogItemsQueuePolicy = {
  Type: "AWS::SQS::QueuePolicy",
    Properties: {
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: {
          Sid: 'allow-lambda-messages',
          Action: ['sqs:sendmessage'],
          Effect: 'Allow',
          Principal: {
            AWS: 'arn:aws:sts::637423538581:assumed-role/import-dev-eu-north-1-lambdaRole/import-dev-importFileParser'
          },
          Resource: 'arn:aws:sqs:eu-north-1:637423538581:catalogItemsQueue'
        },
      },
      Queues: [{
        Ref: 'catalogItemsQueue'
      }]
    },
  }

export default { catalogItemsQueue , catalogItemsQueuePolicy };