import 'reflect-metadata';
import { ITokenRepository } from '../../src/tokens/domain/token.repository';
import { TokenService } from '../../src/tokens/infrastructure/services/token.service';
import {
  payloadCardInfo,
  payloadCardNotLUHN,
  payloadCreateToken,
  payloadInvalidCVV,
  payloadInvalidCard,
  payloadInvalidEmail,
  payloadInvalidExMonth,
  payloadInvalidExYear,
  payloadToken,
  payloadTokenError,
  payloadTokenGenerate,
} from './mocks/data.mock';
import { HttpError } from '../../src/tokens/infrastructure/helpers/exceptions/request.exception';
import {
  HTTP_ERROR,
  MESSAGE_VALIDATION,
} from '../../src/tokens/application/constants/constants';

describe('Test - Servicio de Token', () => {
  let tokenService: TokenService;

  const mockTokenRepo: ITokenRepository = {
    createToken: jest.fn(() => Promise.resolve(payloadTokenGenerate)),
    getCardInfo: jest.fn(() => Promise.resolve(payloadCardInfo)),
  };

  beforeAll(() => {
    tokenService = new TokenService(mockTokenRepo);
  });

  describe('Creación Token - Método', () => {
    it('Creación Exitosa', async () => {
      const newToken = await tokenService.createToken(payloadCreateToken);
      expect(newToken).toEqual(payloadTokenGenerate);
    });

    it('Número de Tarjeta no valido', async () => {
      await tokenService.createToken(payloadInvalidCard).catch((error) => {
        if (error instanceof HttpError) {
          expect(error.code).toEqual(HTTP_ERROR.INVALID_DATA);
        }
      });
    });

    it('Número de Tarjeta no valido - Algoritmo LUHN', async () => {
      await tokenService.createToken(payloadCardNotLUHN).catch((error) => {
        if (error instanceof HttpError) {
          expect(error.code).toEqual(HTTP_ERROR.INVALID_DATA);
          expect(error.message).toEqual(MESSAGE_VALIDATION.INVALID_CARD);
        }
      });
    });

    it('CVV no valido', async () => {
      await tokenService.createToken(payloadInvalidCVV).catch((error) => {
        if (error instanceof HttpError) {
          expect(error.code).toEqual(HTTP_ERROR.INVALID_DATA);
        }
      });
    });

    it('Expiration Month - No es numero', async () => {
      const payload = payloadInvalidExMonth;
      payload.expiration_month = '1s';
      await tokenService.createToken(payload).catch((error) => {
        if (error instanceof HttpError) {
          expect(error.code).toEqual(HTTP_ERROR.INVALID_DATA);
        }
      });
    });

    it('Expiration Month - Fuera de rango', async () => {
      const payload = payloadInvalidExMonth;
      payload.expiration_month = '13';
      await tokenService.createToken(payload).catch((error) => {
        if (error instanceof HttpError) {
          expect(error.code).toEqual(HTTP_ERROR.INVALID_DATA);
          expect(error.message).toEqual(
            MESSAGE_VALIDATION.INVALID_EXPIRATION_MONTH
          );
        }
      });
    });

    it('Expiration Year - No es numero', async () => {
      await tokenService.createToken(payloadInvalidExYear).catch((error) => {
        if (error instanceof HttpError) {
          expect(error.code).toEqual(HTTP_ERROR.INVALID_DATA);
        }
      });
    });

    it('Expiration Year - Fuera de rango', async () => {
      const payload = payloadInvalidExYear;
      payload.expiration_year = '2021';
      await tokenService.createToken(payload).catch((error) => {
        if (error instanceof HttpError) {
          expect(error.code).toEqual(HTTP_ERROR.INVALID_DATA);
          expect(error.message).toEqual(
            MESSAGE_VALIDATION.INVALID_EXPIRATION_YEAR
          );
        }
      });
    });

    it('Email Dominio no valido', async () => {
      await tokenService.createToken(payloadInvalidEmail).catch((error) => {
        if (error instanceof HttpError) {
          expect(error.code).toEqual(HTTP_ERROR.INVALID_DATA);
          expect(error.message).toEqual(
            MESSAGE_VALIDATION.INVALID_EMAIL_DOMAIN
          );
        }
      });
    });
  });

  describe('Get Card method', () => {
    it('Obtener data - Exito', async () => {
      const cardInfo = await tokenService.getCardInfo(payloadToken);
      expect(cardInfo).toEqual(payloadCardInfo);
    });

    it('Obtener data - Error', async () => {
      await tokenService.getCardInfo(payloadTokenError).catch((error) => {
        if (error instanceof HttpError) {
          expect(error.code).toEqual(HTTP_ERROR.INVALID_DATA);
        }
      });
    });
  });
});
