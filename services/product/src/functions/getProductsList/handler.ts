import { formatFailureResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProducts } from '@services/products';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  try {
    const products = await getProducts();

    return formatJSONResponse(products);
  } catch (e) {
    console.log(e);
    return formatFailureResponse();
  }
};

export const main = middyfy(getProductsList);
