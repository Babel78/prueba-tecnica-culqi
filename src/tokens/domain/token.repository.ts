import { ParamsGetCardDto } from '../application/dto/paramsGetCard.dto';
import { ResponseTokenDto } from '../application/dto/reponseToken.dto';
import { ResponseCardInfoDto } from '../application/dto/responseCardInfo.dto';
import { Token } from './token';

export interface ITokenRepository {
  createToken(token: Token): Promise<ResponseTokenDto>;
  getCardInfo(params: ParamsGetCardDto): Promise<ResponseCardInfoDto>;
}
