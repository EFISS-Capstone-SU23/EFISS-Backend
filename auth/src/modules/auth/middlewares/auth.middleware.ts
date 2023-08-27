import { NextFunction, Request, Response } from 'express';
import { ForbiddenError, UnauthorizedError } from '../../../common/error-handler';
import { config } from '../../../config/configuration';
import * as jwt from 'jsonwebtoken';
import { Permission } from '../../../loaders/enums';
import { accountService } from '../services/account.service';
import { JWT_ACCESS_EXPIRES_IN } from '../../../loaders/constants';
import { COOKIE_NAME } from '../../../config';

export const checkPermissions =
  (requiredPermissions: Permission[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = res['locals'].accountId;

    const account = await accountService.getAccountRolesPermissionsByAccountId(accountId);

    if (!account) {
      next(new ForbiddenError('Permission denied'));
      return;
    }

    const userPermissions = account?.roles.flatMap((role) => role.permissions.map((permission) => permission.name));
    if (!userPermissions) {
      next(new ForbiddenError('Permission denied'));
      return;
    }

    const hasPermissions = requiredPermissions.every((permission) => userPermissions.includes(permission));

    if (!hasPermissions) {
      next(new ForbiddenError('Permission denied'));
      return;
    }

    next();
  };

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
  const getBearerToken = (req: Request): string => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return '';
    }

    return req.headers.authorization.split(' ')[1];
  };

  const getTokenViaCookie = (req: Request): string => {
    return req.cookies[COOKIE_NAME];
  };

  const token = getBearerToken(req) || getTokenViaCookie(req);

  if (!token) {
    next(new UnauthorizedError('Access token is missing'));
    return;
  }

  let jwtPayload;

  // Validate the token and get data
  try {
    jwtPayload = jwt.verify(token, config.jwt.accessSecret);
    res['locals'] = jwtPayload;
  } catch (err) {
    next(new UnauthorizedError('Invalid access token'));
    return;
  }

  // Send a new access token on every request
  const { accountId, username } = jwtPayload;
  const newAccessToken = jwt.sign({ accountId, username }, config.jwt.accessSecret, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });
  res.setHeader('access-token', newAccessToken);

  next();
};
