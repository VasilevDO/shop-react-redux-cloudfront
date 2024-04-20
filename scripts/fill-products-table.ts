const AWS = require('aws-sdk')

const products = [
    {
      description: "Short Product Description1",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      price: 24,
      title: "ProductOne",
    },
    {
      description: "Short Product Description7",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
      price: 15,
      title: "ProductTitle",
    },
    {
      description: "Short Product Description2",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
      price: 23,
      title: "Product",
    },
    {
      description: "Short Product Description4",
      id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
      price: 15,
      title: "ProductTest",
    },
    {
      description: "Short Product Descriptio1",
      id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
      price: 23,
      title: "Product2",
    },
    {
      description: "Short Product Description7",
      id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
      price: 15,
      title: "ProductName",
    },
  ];

  const stocks = products.map(u=>({
    product_id: u.id,
    count: Math.floor((Math.random())*(100-10+1))+10
  }))

const dynamo = new AWS.DynamoDB.DocumentClient({region:'eu-north-1'})

const fillProducts = async () => {
    await dynamo.batchWrite({
        RequestItems: {
            'products': products.map(u=>({
                PutRequest: {
                    Item: u
                }
            })),
            'stocks': stocks.map(u=>({
              PutRequest: {
                Item: u
              }
            }))
        }
    }).promise()
}

fillProducts();
