import { formatFailureResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { availableProducts } from '../../mocks/products';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  try {
    const productId = event.pathParameters.productId;
    const product = availableProducts.find(product=>product.id === productId);

    if (!product) {
      return formatFailureResponse(404, `No product with id: ${productId} found`)
    }

    return formatJSONResponse({ product });
  } catch (e) {
    return formatFailureResponse();
  }
};

export const main = middyfy(getProductsById);
