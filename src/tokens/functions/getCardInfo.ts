import { container } from '../config/inversify.config';
import { HttpError } from '../infrastructure/helpers/exceptions/request.exception';
import { authorizationMiddleware } from '../infrastructure/middlewares/header.middleware';
import { TokenService } from '../infrastructure/services/token.service';

export const handler = async (event) => {
  try {
    authorizationMiddleware(event);
    const tokenService = container.get(TokenService);
    const params = event.pathParameters;
    return await tokenService.getCardInfo(params);
  } catch (error) {
    if (error instanceof HttpError) {
      return {
        statusCode: error.code,
        body: JSON.stringify({
          message: error.message,
          code: error.code,
        }),
      };
    }
  }
};
