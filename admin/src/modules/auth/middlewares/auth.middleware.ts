import { NextFunction, Request, Response } from 'express';
import { ForbiddenError, UnauthorizedError } from '../../../common/error-handler';
import { authService } from '../auth.service';
import { Permission } from '../../../loaders/enums';

export const checkPermission =
  (requiredPermission: Permission) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = res['locals'].accountId;

    const hasPermission = ((await authService.checkAccountPermission(accountId, requiredPermission)) as any)
      .hasPermission;

    if (!hasPermission) {
      next(new ForbiddenError('Permission denied'));
      return;
    }

    next();
  };

export const checkJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    next(new UnauthorizedError('Authorization header is missing'));
    return;
  }
  const token = req.headers.authorization.split(' ')[1];
  let jwtPayload = (await authService.checkJwt(token)) as any;

  if (jwtPayload.error) {
    next(new UnauthorizedError('Invalid access token'));
    return;
  }

  const { accountId, username, accessToken } = jwtPayload;

  res['locals'].accountId = accountId;
  res.setHeader('access-token', accessToken);

  next();
};
