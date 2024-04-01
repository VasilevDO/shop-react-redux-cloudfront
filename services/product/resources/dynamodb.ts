export default {
    products: {
      Type: "AWS::DynamoDB::Table",
      DeletionPolicy: "Delete",
      Properties: {
        TableName: "products",
        AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        ProvisionedThroughput: {
            ReadCapacityUnits: "3",
            WriteCapacityUnits: "3",
          },
      },
      
    },
    stocks: {
      Type: "AWS::DynamoDB::Table",
      DeletionPolicy: "Delete",
      Properties: {
        TableName: "stocks",
        AttributeDefinitions: [
          { AttributeName: "product_id", AttributeType: "S" },
        ],
        KeySchema: [{ AttributeName: "product_id", KeyType: "HASH" }],
        ProvisionedThroughput: {
            ReadCapacityUnits: "3",
            WriteCapacityUnits: "3",
          },
      },
    },
  };