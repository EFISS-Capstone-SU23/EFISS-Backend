import * as grpc from '@grpc/grpc-js';
import {
  Account,
  AddPermissionToRoleRequest,
  AddPermissionToRoleResponse,
  AddRoleToAccountRequest,
  AddRoleToAccountResponse,
  CheckAccountPermissionRequest,
  CheckAccountPermissionResponse,
  CheckJwtRequest,
  CheckJwtResponse,
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountByIdRequest,
  DeleteAccountByIdResponse,
  DeletePermissionFromRoleRequest,
  DeletePermissionFromRoleResponse,
  DeleteRoleFromAccountRequest,
  DeleteRoleFromAccountResponse,
  GetAccountListRequest,
  GetAccountListResponse,
  UpdateAccountInformationRequest,
  UpdateAccountInformationResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
  ViewAccountInformationRequest,
  ViewAccountInformationResponse,
} from './auth_pb';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/configuration';
import { AccountRole, Permission, ViewAccountListSortBy } from '../loaders/enums';
import { accountService } from '../modules/auth/services/account.service';
import { JWT_ACCESS_EXPIRES_IN } from '../loaders/constants';
import { CreateDateColumn } from 'typeorm';

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
          expiresIn: JWT_ACCESS_EXPIRES_IN,
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

export async function viewAccountInformation(
  call: grpc.ServerUnaryCall<ViewAccountInformationRequest, ViewAccountInformationResponse>,
  callback: grpc.sendUnaryData<ViewAccountInformationResponse>,
) {
  try {
    const accountId = call.request.getAccountid();
    const response = new ViewAccountInformationResponse();

    const account = await accountService.getAccountById(accountId);

    if (!account) {
      response.setError("Account doesn't exist");
    } else {
      response.setAccountid(account.id);
      response.setUsername(account.username);
      response.setEmail(account.email);
      response.setFirstname(account.firstName);
      response.setLastname(account.lastName);
      response.setCreatedat(account.createdAt.getTime().toString());
      response.setLastlogin(account.lastLogin.getTime().toString());
      response.setIsemailverified(account.isEmailVerified);
      response.setStatus(account.status);
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function updateAccountInformation(
  call: grpc.ServerUnaryCall<UpdateAccountInformationRequest, UpdateAccountInformationResponse>,
  callback: grpc.sendUnaryData<UpdateAccountInformationResponse>,
) {
  try {
    const accountId = call.request.getAccountid();
    const response = new UpdateAccountInformationResponse();

    const account = await accountService.getAccountById(accountId);

    if (!account) {
      response.setError("Account doesn't exist");
    } else {
      accountService.updateAccountInformation(accountId, call.request.getFirstname(), call.request.getLastname());
      response.setMessage('Updated account information successfully!');
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function getAccountList(
  call: grpc.ServerUnaryCall<GetAccountListRequest, GetAccountListResponse>,
  callback: grpc.sendUnaryData<GetAccountListResponse>,
) {
  try {
    const pageNumber = call.request.getPagenumber();
    const pageSize = call.request.getPagesize();
    const query = call.request.getQuery();
    const sortBy = <ViewAccountListSortBy>call.request.getSortby();
    const response = new GetAccountListResponse();

    const accountList = await accountService.getAccountList({
      pageNumber: pageNumber || 1,
      pageSize: pageSize || 10,
      query: query || '',
      sortBy: sortBy,
    });
    const accounts: Account[] = [];
    for (const account of accountList.accounts) {
      const newAccount = new Account();
      newAccount.setAccountid(account.id);
      newAccount.setCreatedat(account.createdAt.getTime().toString());
      newAccount.setEmail(account.email);
      newAccount.setFirstname(account.firstName);
      newAccount.setIsemailverified(account.isEmailVerified);
      newAccount.setLastlogin(account.lastLogin.getTime().toString());
      newAccount.setUsername(account.username);
      newAccount.setStatus(account.status);
      newAccount.setLastname(account.lastName);
      newAccount.setRolesList(account.roles.map((role) => role.name));
      accounts.push(newAccount);
    }

    if (!accountList) {
      response.setError('Something went wrong');
    } else {
      response.setAccountsList(accounts);
      response.setPagenumber(accountList.pageNumber);
      response.setPagesize(accountList.pageSize);
      response.setTotalaccounts(accountList.totalItems);
      response.setTotalpage(accountList.totalPages);
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function addRoleToAccount(
  call: grpc.ServerUnaryCall<AddRoleToAccountRequest, AddRoleToAccountResponse>,
  callback: grpc.sendUnaryData<AddRoleToAccountResponse>,
) {
  try {
    const accountId = call.request.getAccountid();
    const role = call.request.getRole();

    const response = new AddRoleToAccountResponse();
    const result = await accountService.addRoleToAccount(accountId, <AccountRole>role);

    if (result.error) {
      response.setError(result.error);
    }

    if (result.message) {
      response.setMessage(result.message);
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function deleteRoleFromAccount(
  call: grpc.ServerUnaryCall<DeleteRoleFromAccountRequest, DeleteRoleFromAccountResponse>,
  callback: grpc.sendUnaryData<DeleteRoleFromAccountResponse>,
) {
  try {
    const accountId = call.request.getAccountid();
    const role = call.request.getRole();

    const response = new DeleteRoleFromAccountResponse();
    const result = await accountService.deleteRoleOfAccount(accountId, <AccountRole>role);

    if (result.error) {
      response.setError(result.error);
    }
    if (result.message) {
      response.setMessage(result.message);
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function addPermissionToRole(
  call: grpc.ServerUnaryCall<AddPermissionToRoleRequest, AddRoleToAccountResponse>,
  callback: grpc.sendUnaryData<AddPermissionToRoleResponse>,
) {
  try {
    const permission = call.request.getPermission();
    const role = call.request.getRole();

    const response = new AddPermissionToRoleResponse();
    const result = await accountService.addPermissionToRole(<Permission>permission, <AccountRole>role);

    if (result.error) {
      response.setError(result.error);
    }
    if (result.message) {
      response.setMessage(result.message);
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function deletePermissionFromRole(
  call: grpc.ServerUnaryCall<DeletePermissionFromRoleRequest, DeletePermissionFromRoleResponse>,
  callback: grpc.sendUnaryData<DeletePermissionFromRoleResponse>,
) {
  try {
    const permission = call.request.getPermission();
    const role = call.request.getRole();

    const response = new DeletePermissionFromRoleResponse();
    const result = await accountService.deletePermissionFromRole(<Permission>permission, <AccountRole>role);

    if (result.error) {
      response.setError(result.error);
    }
    if (result.message) {
      response.setMessage(result.message);
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function deleteAccountById(
  call: grpc.ServerUnaryCall<DeleteAccountByIdRequest, DeleteAccountByIdResponse>,
  callback: grpc.sendUnaryData<DeleteAccountByIdResponse>,
) {
  try {
    const accountId = call.request.getAccountid();

    const response = new DeleteAccountByIdResponse();
    const result = await accountService.deleteAccountById(accountId);

    if (result.error) {
      response.setError(result.error);
    }
    if (result.message) {
      response.setMessage(result.message);
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function createAccount(
  call: grpc.ServerUnaryCall<CreateAccountRequest, CreateAccountResponse>,
  callback: grpc.sendUnaryData<CreateAccountResponse>,
) {
  try {
    const username = call.request.getUsername();
    const email = call.request.getEmail();
    const firstName = call.request.getFirstname();
    const lastName = call.request.getLastname();
    const password = call.request.getPassword();

    const response = new CreateAccountResponse();
    const result = await accountService.createAccountGrpc({
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    if (result.error) {
      response.setError(result.error);
    }
    if (result.message) {
      response.setMessage(result.message);
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function updateAccount(
  call: grpc.ServerUnaryCall<UpdateAccountRequest, UpdateAccountResponse>,
  callback: grpc.sendUnaryData<UpdateAccountResponse>,
) {
  try {
    const accountId = call.request.getAccountid();
    const username = call.request.getUsername();
    const email = call.request.getEmail();
    const firstName = call.request.getFirstname();
    const lastName = call.request.getLastname();
    const password = call.request.getPassword();
    const isEmailVerified = call.request.getIsemailverified();
    const status = call.request.getStatus();

    const response = new UpdateAccountResponse();
    const result = await accountService.updateAccountGrpc({
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      accountId: accountId,
      isEmailVerified: isEmailVerified,
      status: status,
    });

    if (result.error) {
      response.setError(result.error);
    }
    if (result.message) {
      response.setMessage(result.message);
    }

    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}
