import { formatFailureResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { createProduct} from '@services/products';
import schema from './schema'

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    // const {title, description, price, count} = event.body;

    console.log( event.body)

    const title = event.body.title
    const description = event.body.description
    const price = event.body.price
    const count = event.body.count

    console.log('TITLE', title)
    console.log('description', description)

    const productId = await createProduct(title, description, price, count)

    return formatJSONResponse({ productId});
  } catch (e) {
    console.log(e)
    return formatFailureResponse();
  }
};

export const main = middyfy(handler);
