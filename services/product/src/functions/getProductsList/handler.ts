import { formatFailureResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { availableProducts } from '../../mocks/products';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  try {
    return formatJSONResponse(availableProducts);
  } catch (e) {
    return formatFailureResponse();
  }
};

export const main = middyfy(getProductsList);
