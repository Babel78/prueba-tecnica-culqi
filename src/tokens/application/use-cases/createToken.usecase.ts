import { ITokenRepository } from '../../domain/token.repository';
import { Token } from '../../domain/token';
import { CreateTokenDto } from '../dto/createToken.dto';
import { ResponseTokenDto } from '../dto/reponseToken.dto';

export class CreateTokenUseCase {
  private tokenRepository: ITokenRepository;

  constructor(tokenRepository: ITokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  async execute(input: CreateTokenDto): Promise<ResponseTokenDto> {
    const { card_number, cvv, expiration_month, expiration_year, email } =
      input;
    const newToken = new Token({
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email,
    });
    return await this.tokenRepository.createToken(newToken);
  }
}
