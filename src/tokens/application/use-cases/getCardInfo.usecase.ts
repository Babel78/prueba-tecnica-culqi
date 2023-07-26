import { ITokenRepository } from '../../domain/token.repository';
import { ParamsGetCardDto } from '../dto/paramsGetCard.dto';
import { ResponseCardInfoDto } from '../dto/responseCardInfo.dto';

export class GetCardInfoUseCase {
  private tokenRepository: ITokenRepository;

  constructor(tokenRepository: ITokenRepository) {
    this.tokenRepository = tokenRepository;
  }
  async execute(params: ParamsGetCardDto): Promise<ResponseCardInfoDto> {
    return await this.tokenRepository.getCardInfo(params);
  }
}
