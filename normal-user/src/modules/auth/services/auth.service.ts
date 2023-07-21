import * as grpc from '@grpc/grpc-js';
import { config } from '../../../config/configuration';
import { AuthServiceClient } from '../../../proto/auth_grpc_pb';
import {
  CheckAccountPermissionRequest,
  CheckJwtRequest,
  UpdateAccountInformationRequest,
  ViewAccountInformationRequest,
} from '../../../proto/auth_pb';
import { UpdateAccountInfoRequest } from '../../normal-user/dtos/user.dto';

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

  async viewAccountInformation(accountId: number) {
    return new Promise(async (resolve, reject) => {
      const request = new ViewAccountInformationRequest();
      request.setAccountid(accountId);

      this.authServiceClient.viewAccountInformation(request, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve({
            accountId: response.getAccountid(),
            username: response.getUsername(),
            email: response.getEmail(),
            firstName: response.getFirstname(),
            lastName: response.getLastname(),
            isEmailVerified: response.getIsemailverified(),
            createdAt: new Date(parseInt(response.getCreatedat() as string)),
            lastLogin: new Date(parseInt(response.getLastlogin() as string)),
            status: response.getStatus(),
          });
        }
      });
    });
  }

  async updateAccountInformation(accountId: number, firstName?: string, lastName?: string) {
    return new Promise(async (resolve, reject) => {
      const request = new UpdateAccountInformationRequest();
      request.setAccountid(accountId);
      if (firstName) request.setFirstname(firstName);
      if (lastName) request.setLastname(lastName);

      this.authServiceClient.updateAccountInformation(request, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve({
            error: response.getError(),
            message: response.getMessage(),
          });
        }
      });
    });
  }
}

export const authService = new AuthService(config.authService.grpc.host, config.authService.grpc.port);
