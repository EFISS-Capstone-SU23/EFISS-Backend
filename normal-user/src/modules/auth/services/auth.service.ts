import * as grpc from '@grpc/grpc-js';
import { config } from '../../../config/configuration';
import { AuthServiceClient } from '../../../proto/auth_grpc_pb';
import { CheckAccountPermissionRequest, CheckJwtRequest } from '../../../proto/auth_pb';

export class AuthService {
  private authServiceClient: AuthServiceClient;
  constructor(private readonly grpcHost: string, private readonly grpcPort: number) {
    this.authServiceClient = new AuthServiceClient(`${grpcHost}:${grpcPort}`, grpc.credentials.createInsecure());
  }

  async checkJwt(accessToken: string) {
    return new Promise(async (resolve, reject) => {
      const request = new CheckJwtRequest();
      request.setAccesstoken(accessToken);

      this.authServiceClient.checkJwt(request, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve({
            error: response.getError(),
            accountId: response.getAccountid(),
            username: response.getUsername(),
            accessToken: response.getAccesstoken(),
          });
        }
      });
    });
  }

  async checkAccountPermission(accountId: number, permission: string) {
    return new Promise(async (resolve, reject) => {
      const request = new CheckAccountPermissionRequest();
      request.setAccountid(accountId);
      request.setPermission(permission);

      this.authServiceClient.checkAccountPermission(request, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve({
            hasPermission: response.getHaspermission(),
          });
        }
      });
    });
  }
}

export const authService = new AuthService(config.authService.grpc.host, config.authService.grpc.port);
