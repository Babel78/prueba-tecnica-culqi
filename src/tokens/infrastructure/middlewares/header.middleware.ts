import {
  COMMONS,
  HTTP_ERROR,
  MESSAGE_VALIDATION,
} from '../../application/constants/constants';
import { HttpError } from '../helpers/exceptions/request.exception';

export const authorizationMiddleware = (event) => {
  const { headers } = event;
  const bearerHeader: string = headers[COMMONS.AUTHORIZATION];
  if (!bearerHeader) {
    throw new HttpError(
      HTTP_ERROR.UNAUTHORIZED,
      MESSAGE_VALIDATION.UNAUTHORIZED
    );
  }
  const pk_token: string = bearerHeader.replace(/^Bearer\s+/, '');
  if (pk_token.length === 0 || !pk_token.startsWith(COMMONS.PK)) {
    throw new HttpError(
      HTTP_ERROR.UNAUTHORIZED,
      MESSAGE_VALIDATION.UNAUTHORIZED
    );
  }
};
