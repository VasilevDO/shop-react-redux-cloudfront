import { formatFailureResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProduct } from '@services/products';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  try {
    const productId = event.pathParameters.productId;

    const product = await getProduct(productId)

    if (!product) {
      return formatFailureResponse(404, `No product with id: ${productId} found`)
    }

    return formatJSONResponse({ product });
  } catch (e) {
    return formatFailureResponse();
  }
};

export const main = middyfy(getProductsById);
