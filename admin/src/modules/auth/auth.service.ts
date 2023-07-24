import * as grpc from '@grpc/grpc-js';
import { AuthServiceClient } from '../../proto/auth_grpc_pb';
import {
  AddPermissionToRoleRequest,
  AddRoleToAccountRequest,
  CheckAccountPermissionRequest,
  CheckJwtRequest,
  CreateAccountRequest,
  DeleteAccountByIdRequest,
  DeletePermissionFromRoleRequest,
  DeleteRoleFromAccountRequest,
  GetAccountListRequest,
  UpdateAccountInformationRequest,
  UpdateAccountRequest,
  ViewAccountInformationRequest,
} from '../../proto/auth_pb';
import { config } from '../../config/configuration';
import { AccountRole, Permission, ViewAccountListSortBy } from '../../loaders/enums';

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

  async getAccountList(opts: { pageNumber: number; pageSize: number; query: string; sortBy: ViewAccountListSortBy }) {
    return new Promise(async (resolve, reject) => {
      const { pageNumber = 1, pageSize = 10, query = '', sortBy = ViewAccountListSortBy.NEWEST } = opts;
      const request = new GetAccountListRequest();
      request.setPagenumber(pageNumber);
      request.setPagesize(pageSize);
      request.setQuery(query);
      request.setSortby(sortBy);

      this.authServiceClient.getAccountList(request, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve({
            accounts: response.getAccountsList().map((acc) => {
              return {
                accountId: acc.getAccountid(),
                username: acc.getUsername(),
                email: acc.getEmail(),
                firstName: acc.getFirstname(),
                lastName: acc.getLastname(),
                createdAt: new Date(Number(acc.getCreatedat())),
                lastLogin: new Date(Number(acc.getLastlogin())),
                status: acc.getStatus(),
                isEmailVerified: acc.getIsemailverified(),
                roles: acc.getRolesList(),
              };
            }),
            pageNumber: response.getPagenumber(),
            pageSize: response.getPagesize(),
            totalAccounts: response.getTotalaccounts(),
            totalPages: response.getTotalpage(),
          });
        }
      });
    });
  }

  async createAccount(opts: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
    return new Promise(async (resolve, reject) => {
      const { username, email, firstName, lastName, password } = opts;
      const request = new CreateAccountRequest();
      request.setUsername(username);
      request.setEmail(email);
      request.setFirstname(firstName);
      request.setLastname(lastName);
      request.setPassword(password);

      this.authServiceClient.createAccount(request, (err, response) => {
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

  async updateAccount(opts: {
    accountId: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    status: boolean;
    isEmailVerified: boolean;
  }) {
    return new Promise(async (resolve, reject) => {
      const { username, email, firstName, lastName, password, status, isEmailVerified, accountId } = opts;
      const request = new UpdateAccountRequest();
      request.setUsername(username);
      request.setEmail(email);
      request.setFirstname(firstName);
      request.setLastname(lastName);
      request.setPassword(password);
      request.setStatus(status);
      request.setIsemailverified(isEmailVerified);
      request.setAccountid(accountId);

      this.authServiceClient.updateAccount(request, (err, response) => {
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

  async deleteAccount(accountId: number) {
    return new Promise(async (resolve, reject) => {
      const request = new DeleteAccountByIdRequest();
      request.setAccountid(accountId);

      this.authServiceClient.deleteAccountById(request, (err, response) => {
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

  async addPermissionToRole(permission: Permission, role: AccountRole) {
    return new Promise(async (resolve, reject) => {
      const request = new AddPermissionToRoleRequest();
      request.setPermission(permission);
      request.setRole(role);

      this.authServiceClient.addPermissionToRole(request, (err, response) => {
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

  async deletePermissionFromRole(permission: Permission, role: AccountRole) {
    return new Promise(async (resolve, reject) => {
      const request = new DeletePermissionFromRoleRequest();
      request.setPermission(permission);
      request.setRole(role);

      this.authServiceClient.deletePermissionFromRole(request, (err, response) => {
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

  async addRoleToAccount(role: AccountRole, accountId: number) {
    return new Promise(async (resolve, reject) => {
      const request = new AddRoleToAccountRequest();
      request.setRole(role);
      request.setAccountid(accountId);

      this.authServiceClient.addRoleToAccount(request, (err, response) => {
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

  async deleteRoleFromAccount(role: AccountRole, accountId: number) {
    return new Promise(async (resolve, reject) => {
      const request = new DeleteRoleFromAccountRequest();
      request.setRole(role);
      request.setAccountid(accountId);

      this.authServiceClient.deleteRoleFromAccount(request, (err, response) => {
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
