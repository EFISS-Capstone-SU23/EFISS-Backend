import { Repository } from 'typeorm';
import { dataSource } from '../../../database/data-source';
import { TokenEntity } from '.././entities/token.entity';
import { TokenType } from '../../../loaders/enums';
import { AccountEntity } from '.././entities/account.entity';
import { config } from '../../../config/configuration';
import { accountService } from './account.service';
import crypto from 'crypto';

export class TokenService {
  private tokenRepository: Repository<TokenEntity>;
  constructor() {
    this.tokenRepository = dataSource.getRepository(TokenEntity);
  }

  async getVerificationTokenByAccountId(accountId: number): Promise<TokenEntity | null> {
    return await this.tokenRepository
      .createQueryBuilder('tokens')
      .where('accountId = :accountId', { accountId })
      .andWhere('type = :type', { type: TokenType.VERIFY_EMAIL })
      .getOne();
  }

  async getResetPasswordTokenByAccountId(accountId: number): Promise<TokenEntity | null> {
    return await this.tokenRepository
      .createQueryBuilder('tokens')
      .where('accountId = :accountId', { accountId })
      .andWhere('type = :type', { type: TokenType.RESET_PASSWORD })
      .getOne();
  }

  async checkRefreshTokenOfAccount(refreshToken: string, account: AccountEntity): Promise<boolean> {
    let token = await this.tokenRepository
      .createQueryBuilder('tokens')
      .where('accountId = :accountId', { accountId: account.id })
      .andWhere('type = :type', { type: TokenType.REFRESH_TOKEN })
      .getOne();
    if (!token) {
      return false;
    }
    if (this.hashToken(refreshToken) == token.token) {
      return true;
    }
    return false;
  }

  async updateRefreshToken(account: AccountEntity, newToken: string): Promise<void> {
    let refreshToken = await this.tokenRepository
      .createQueryBuilder('tokens')
      .where('accountId = :accountId', { accountId: account.id })
      .andWhere('type = :type', { type: TokenType.REFRESH_TOKEN })
      .getOne();
    if (refreshToken) {
      refreshToken.token = this.hashToken(newToken);
      await this.tokenRepository.save(refreshToken);
      return;
    }

    refreshToken = new TokenEntity();
    refreshToken.type = TokenType.REFRESH_TOKEN;
    refreshToken.token = this.hashToken(newToken);
    refreshToken.account = account;
    await this.tokenRepository.save(refreshToken);
  }

  async updateResetPasswordToken(account: AccountEntity): Promise<string> {
    let resetPasswordToken = await this.tokenRepository
      .createQueryBuilder('tokens')
      .where('accountId = :accountId', { accountId: account.id })
      .andWhere('type = :type', { type: TokenType.RESET_PASSWORD })
      .getOne();

    const { token, hashedToken } = this.createToken();
    if (resetPasswordToken) {
      resetPasswordToken.token = hashedToken;
      resetPasswordToken.expiresAt = new Date();
      resetPasswordToken.expiresAt.setMilliseconds(
        resetPasswordToken.expiresAt.getMilliseconds() + config.token.verifyEmailExpirationInMs,
      );
      this.tokenRepository.save(resetPasswordToken);
      return token;
    }

    resetPasswordToken = new TokenEntity();
    resetPasswordToken.type = TokenType.RESET_PASSWORD;
    resetPasswordToken.token = hashedToken;
    resetPasswordToken.account = account;
    resetPasswordToken.expiresAt = new Date();
    resetPasswordToken.expiresAt.setMilliseconds(
      resetPasswordToken.expiresAt.getMilliseconds() + config.token.verifyEmailExpirationInMs,
    );
    this.tokenRepository.save(resetPasswordToken);

    return token;
  }

  async updateVerificationEmailToken(account: AccountEntity): Promise<string> {
    let verificationEmailToken = await this.tokenRepository
      .createQueryBuilder('tokens')
      .where('accountId = :accountId', { accountId: account.id })
      .andWhere('type = :type', { type: TokenType.VERIFY_EMAIL })
      .getOne();

    const { token, hashedToken } = this.createToken();
    if (verificationEmailToken) {
      verificationEmailToken.token = hashedToken;
      verificationEmailToken.expiresAt = new Date();
      verificationEmailToken.expiresAt.setMilliseconds(
        verificationEmailToken.expiresAt.getMilliseconds() + config.token.verifyEmailExpirationInMs,
      );
      this.tokenRepository.save(verificationEmailToken);
      return token;
    }

    verificationEmailToken = new TokenEntity();
    verificationEmailToken.type = TokenType.VERIFY_EMAIL;
    verificationEmailToken.expiresAt = new Date();
    verificationEmailToken.expiresAt.setMilliseconds(
      verificationEmailToken.expiresAt.getMilliseconds() + config.token.verifyEmailExpirationInMs,
    );
    verificationEmailToken.token = hashedToken;
    verificationEmailToken.account = account;
    this.tokenRepository.save(verificationEmailToken);

    return token;
  }

  createToken(): { token: string; hashedToken: string } {
    const token = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    return { token, hashedToken };
  }

  async createNewToken(type: TokenType, account: AccountEntity): Promise<string> {
    const token = new TokenEntity();
    const { verificationToken, hashedVerificationToken } = AccountEntity.createVerificationToken();
    token.token = hashedVerificationToken;
    token.type = type;
    token.expiresAt =
      type === TokenType.VERIFY_EMAIL
        ? new Date(Date.now() + config.token.verifyEmailExpirationInMs)
        : new Date(Date.now() + config.token.resetPasswordExpirationInMs);
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

  async getTokenByValue(token: string, type: TokenType): Promise<TokenEntity | null> {
    return await this.tokenRepository
      .createQueryBuilder('tokens')
      .where('token = :token', { token: this.hashToken(token) })
      .andWhere('type = :type', { type })
      .getOne();
  }

  async getTokenByHashedToken(hashedToken: string, type: TokenType): Promise<TokenEntity | null> {
    return await this.tokenRepository.findOne({
      where: { token: hashedToken, type: type },
      relations: ['account'],
    });
  }
}

export const tokenService = new TokenService();
