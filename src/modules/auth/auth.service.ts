/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { type NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config/configuration';
import { AccountRole } from '../../loaders/enums';
import { AccountEntity } from './entities/account.entity';
import { BEDataSource } from '../../database/datasource';
import { UnauthorizedError } from '../../common/error-handler';
import { accountService } from './account.service';

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    next(new UnauthorizedError('Authorization header is missing'));
    return;
  }
  const token = req.headers.authorization.split(' ')[1];
  let jwtPayload;

  // Validate the token and get data
  try {
    jwtPayload = jwt.verify(token, config.auth.jwtSecret);
    res['locals'] = jwtPayload;
  } catch (err) {
    next(new UnauthorizedError('Invalid access token'));
    return;
  }

  // The token is valid for 24 hours
  // We want to send a new token on every request
  const { accountId, username } = jwtPayload;
  const newToken = jwt.sign({ accountId, username }, config.auth.jwtSecret, {
    expiresIn: '6h',
  });
  res.setHeader('token', newToken);

  next();
};

export const checkRole =
  (roles: AccountRole[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = res['locals'].accountId;

    // Get user role(s) from the database
    let account: AccountEntity | null;
    account = await accountService.getAccountById(accountId);
    if (!account) {
      next(new UnauthorizedError('Account not found'));
      return;
    }

    // Check if array of account roles includes the user's role
    if (roles.every((role) => (account as AccountEntity).roles.some((accountRole) => accountRole.role === role)))
      next();
    else next(new UnauthorizedError('Permission denied'));
  };
