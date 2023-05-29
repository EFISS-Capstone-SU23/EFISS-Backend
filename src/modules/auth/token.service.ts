import { Repository } from 'typeorm';
import { BEDataSource } from '../../database/datasource';
import { TokenEntity } from './entities/token.entity';
import { TokenType } from '../../loaders/enums';
import { AccountEntity } from './entities/account.entity';
import { config } from '../../config/configuration';
import { accountService } from './account.service';
import crypto from 'crypto';

export class TokenService {
  static tokenService: TokenService;
  private constructor(private readonly tokenRepository: Repository<TokenEntity>) {}

  static getInstance(): TokenService {
    if (!TokenService.tokenService) {
      const tokenRepository = BEDataSource.getRepository(TokenEntity);
      TokenService.tokenService = new TokenService(tokenRepository);
    }
    return TokenService.tokenService;
  }

  async createNewToken(type: TokenType, account: AccountEntity): Promise<string> {
    const token = new TokenEntity();
    const { verificationToken, hashedVerificationToken } = AccountEntity.createVerificationToken();
    token.token = hashedVerificationToken;
    token.type = type;
    token.expiresAt =
      type === TokenType.VERIFY_EMAIL
        ? new Date(Date.now() + config.auth.verifyEmailExpiration)
        : new Date(Date.now() + config.auth.resetPasswordExpiration);
    await this.tokenRepository.save(token);
    if (account?.tokens && account?.tokens?.length) {
      account.tokens.push(token);
    } else {
      account.tokens = [token];
    }
    await accountService.saveAccount(account);
    return verificationToken;
  }

  async removeToken(token: TokenEntity): Promise<void> {
    await this.tokenRepository.remove(token);
  }

  hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async getTokenByHashedToken(hashedToken: string, type: TokenType): Promise<TokenEntity | null> {
    return await this.tokenRepository.findOne({
      where: { token: hashedToken, type: type },
      relations: ['account'],
    });
  }
}

export const tokenService = TokenService.getInstance();
