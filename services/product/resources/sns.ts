const createProductTopic = {
    Type: "AWS::SNS::Topic",
    Properties: {
      TopicName: 'createProductTopic',
    },
  }

const createProductTopicPolicy = {
  Type: "AWS::SNS::TopicPolicy",
    Properties: {
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: {
          Sid: 'allow-lambda-sns-messages',
          Action: ['SNS:Publish'],
          Effect: 'Allow',
          Principal: {
            AWS: 'arn:aws:sts::637423538581:assumed-role/product-dev-eu-north-1-lambdaRole/product-dev-catalogBatchProcess'
          },
          Resource: 'arn:aws:sns:eu-north-1:637423538581:createProductTopic'
        },
      },
      Topics: [{
        Ref: 'createProductTopic'
      }]
    },
  }
    
const createProductTopicSubsctiption = {
    Type: "AWS::SNS::Subscription",
    Properties: {
      Endpoint: "pwnztesting@gmail.com",
      Protocol: "email",
      TopicArn: "arn:aws:sns:eu-north-1:637423538581:createProductTopic"
    },
  }

export default {createProductTopic, createProductTopicSubsctiption, createProductTopicPolicy}