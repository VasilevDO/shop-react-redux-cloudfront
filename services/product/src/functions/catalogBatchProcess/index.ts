import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: 'arn:aws:sqs:eu-north-1:637423538581:catalogItemsQueue',
        batchSize: 5,
      },
    },
  ],
};
