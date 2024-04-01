import { putItem, queryItems, scanItems } from "./table"
import { v4 as uuidv4 } from 'uuid';

export const getProducts = async () => {
    const products = await scanItems('products');
    const stocks = await scanItems('stocks')

    return products.map(u=>({
        ...u,
        count: stocks.find(stock=>stock.product_id===u.id)?.count || 0 
    }))
}

export const getProduct = async (id: string) => {
    const product = await queryItems({
        TableName: 'products',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {':id': id}
    });

    const stock = await queryItems({
        TableName: 'stocks',
        KeyConditionExpression: 'product_id = :product_id',
        ExpressionAttributeValues: {':product_id': id}
    })

    const formattedProduct = product[0] && stock[0] && {
        ...product[0],
        count: stock[0].count
    }

    return formattedProduct;
}

export const createProduct = async (title: string, description: string, price: number, count: number) => {
    const product = {
        id: uuidv4(),
        title,
        description,
        price,
    }

    console.log('PPP', product)
   await putItem('products', product)
   await putItem('stocks', {product_id: product.id, count})

   return product.id
}