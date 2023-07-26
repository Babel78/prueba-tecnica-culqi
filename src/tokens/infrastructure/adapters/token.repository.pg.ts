import { Token } from '../../domain/token';
import { TokenEntity } from './entities/token.entity';
import { inject, injectable } from 'inversify';
import { IDatabaseService } from '../database/interface/IDatabase.service';
import {
  HTTP_ERROR,
  MESSAGE_VALIDATION,
  TOKEN_LENGTH,
} from '../../application/constants/constants';
import { ITokenRepository } from '../../domain/token.repository';
import { TYPES } from '../../types/types.core';
import { ResponseTokenDto } from '../../application/dto/reponseToken.dto';
import { IStoreService } from '../database/interface/IStore.service';
import { ParamsGetCardDto } from '../../application/dto/paramsGetCard.dto';
import { ResponseCardInfoDto } from '../../application/dto/responseCardInfo.dto';
import { HttpError } from '../helpers/exceptions/request.exception';

@injectable()
export class TokenRepositoryPG implements ITokenRepository {
  constructor(
    @inject(TYPES.IDatabaseService) private readonly database: IDatabaseService,
    @inject(TYPES.IStoreService) private readonly store: IStoreService
  ) {}
  async createToken(token: Token): Promise<ResponseTokenDto> {
    const repository = await this.database.getRepository(TokenEntity);
    const newToken = new TokenEntity();
    newToken.card_number = token.card_number;
    newToken.cvv = token.cvv;
    newToken.expiration_month = token.expiration_month;
    newToken.expiration_year = token.expiration_year;
    newToken.email = token.email;
    const tokenInsert = await repository?.save(newToken);
    const tokenGenerate = this.generateToken(TOKEN_LENGTH);
    await this.store.set(tokenGenerate, JSON.stringify(tokenInsert));
    return new ResponseTokenDto({ token: tokenGenerate });
  }

  async getCardInfo(params: ParamsGetCardDto): Promise<ResponseCardInfoDto> {
    const { token } = params;
    const dataCardJSON = await this.store.get(token);
    if (!dataCardJSON) {
      throw new HttpError(
        HTTP_ERROR.NOT_DATA_FOUND,
        MESSAGE_VALIDATION.NOT_DATA_FOUND
      );
    }
    const dataCard = JSON.parse(dataCardJSON);
    return new ResponseCardInfoDto({
      card_number: dataCard.card_number,
      email: dataCard.email,
      expiration_month: dataCard.expiration_month,
      expiration_year: dataCard.expiration_year,
    });
  }

  generateToken(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
