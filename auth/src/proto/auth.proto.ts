import * as grpc from '@grpc/grpc-js';
import {
  CheckAccountPermissionRequest,
  CheckAccountPermissionResponse,
  CheckJwtRequest,
  CheckJwtResponse,
} from './auth_pb';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/configuration';
import { Permission } from '../loaders/enums';
import { accountService } from '../modules/auth/services/account.service';

export async function checkJwt(
  call: grpc.ServerUnaryCall<CheckJwtRequest, CheckJwtResponse>,
  callback: grpc.sendUnaryData<CheckJwtResponse>,
) {
  try {
    const accessToken = call.request.getAccesstoken();

    const response = new CheckJwtResponse();

    let jwtPayload: any;
    try {
      jwtPayload = jwt.verify(accessToken, config.jwt.accessSecret);
      response.setAccountid(jwtPayload.accountId);
      response.setUsername(jwtPayload.username);
      const newAccessToken = jwt.sign(
        { accountId: jwtPayload.accountId, username: jwtPayload.username },
        config.jwt.accessSecret,
        {
          expiresIn: config.jwt.accessExpiration,
        },
      );
      response.setAccesstoken(newAccessToken);
    } catch (err) {
      response.setError('Invalid access token');
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function checkAccountPermission(
  call: grpc.ServerUnaryCall<CheckAccountPermissionRequest, CheckAccountPermissionResponse>,
  callback: grpc.sendUnaryData<CheckAccountPermissionResponse>,
) {
  try {
    const permission = call.request.getPermission();
    const accountId = call.request.getAccountid();
    const response = new CheckAccountPermissionResponse();

    const account = await accountService.getAccountRolesPermissionsByAccountId(accountId);

    if (!account) {
      response.setHaspermission(false);
    } else {
      const userPermissions = account?.roles.flatMap((role) => role.permissions.map((permission) => permission.name));
      if (!userPermissions) {
        response.setHaspermission(false);
      } else {
        const hasPermissions = userPermissions.includes(<Permission>permission);
        response.setHaspermission(hasPermissions);
      }
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}
