import { inject, injectable } from 'inversify';
import { TYPES } from '../../types/types.core';
import { ITokenRepository } from '../../domain/token.repository';
import { CreateTokenUseCase } from '../../application/use-cases/createToken.usecase';
import {
  validarPayloadCrearToken,
  validarPayloadGetCard,
} from '../../application/supports/validate.support';
import { GetCardInfoUseCase } from '../../application/use-cases/getCardInfo.usecase';

@injectable()
export class TokenService {
  constructor(
    @inject(TYPES.ITokenRepository)
    private readonly tokenRepository: ITokenRepository
  ) {}
  public async createToken(payload) {
    validarPayloadCrearToken(payload);
    return new CreateTokenUseCase(this.tokenRepository).execute(payload);
  }

  public async getCardInfo(payload) {
    validarPayloadGetCard(payload);
    return new GetCardInfoUseCase(this.tokenRepository).execute(payload);
  }
}
