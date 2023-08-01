import { msg200, msg400 } from '../../../common/helpers';
import { IResponse } from '../../../common/response';
import { ViewAccountListSortBy } from '../../../loaders/enums';
import { authServiceGrpcClient } from '../../auth/grpc/auth.grpc-client';
import {
  AddPermissionToRoleDto,
  AddRoleToAccountDto,
  CreateAccountDto,
  DeletePermissionFromRoleDto,
  DeleteRoleFromAccountDto,
  UpdateAccountDto,
} from '../dtos/admin.dto';

export class AdminService {
  constructor() {}

  async getAccountListResponse(opts: {
    pageNumber: number;
    pageSize: number;
    query: string;
    sortBy: ViewAccountListSortBy;
  }): Promise<IResponse> {
    const { pageNumber = 1, pageSize = 10, query = '', sortBy = ViewAccountListSortBy.NEWEST } = opts;
    const results = await authServiceGrpcClient.getAccountList({
      pageNumber,
      pageSize,
      query,
      sortBy,
    });
    return msg200({
      accounts: (results as any).accounts.map((acc) => {
        return {
          accountId: acc.accountId,
          username: acc.username,
          email: acc.email,
          firstName: acc.firstName,
          lastName: acc.lastName,
          createdAt: acc.createdAt,
          lastLogin: acc.lastLogin,
          status: acc.status,
          isEmailVerified: acc.isEmailVerified,
          roles: acc.roles,
        };
      }),
      pageNumber: (results as any).pageNumber,
      pageSize: (results as any).pageSize,
      totalAccounts: (results as any).totalAccounts,
      totalPages: (results as any).totalPages,
    });
  }

  async createAccountResponse(createAccountDto: CreateAccountDto): Promise<IResponse> {
    const result = await authServiceGrpcClient.createAccount({
      username: createAccountDto.username,
      password: createAccountDto.password,
      email: createAccountDto.email,
      firstName: createAccountDto.firstName,
      lastName: createAccountDto.lastName,
    });
    if ((result as any)?.error) {
      return msg400((result as any).error);
    } else {
      return msg200({
        message: (result as any).message,
      });
    }
  }

  async updateAccountResponse(updateAccountDto: UpdateAccountDto, accountId: number): Promise<IResponse> {
    const result = await authServiceGrpcClient.updateAccount({
      accountId: accountId,
      username: updateAccountDto.username as string,
      password: updateAccountDto.password as string,
      email: updateAccountDto.email as string,
      firstName: updateAccountDto.firstName as string,
      lastName: updateAccountDto.lastName as string,
      isEmailVerified: updateAccountDto.isEmailVerified as boolean,
      status: updateAccountDto.status as boolean,
    });

    if ((result as any)?.error) {
      return msg400((result as any).error);
    } else {
      return msg200({
        message: (result as any).message,
      });
    }
  }

  async deleteAccountResponse(accountId: number): Promise<IResponse> {
    const result = await authServiceGrpcClient.deleteAccount(accountId);
    if ((result as any)?.error) {
      return msg400((result as any).error);
    } else {
      return msg200({
        message: (result as any).message,
      });
    }
  }

  async addPermissionToRoleResponse(addPermissionToRoleDto: AddPermissionToRoleDto): Promise<IResponse> {
    const result = await authServiceGrpcClient.addPermissionToRole(
      addPermissionToRoleDto.permission,
      addPermissionToRoleDto.role,
    );
    if ((result as any)?.error) {
      return msg400((result as any).error);
    } else {
      return msg200({
        message: (result as any).message,
      });
    }
  }

  async deletePermissionFromRoleResponse(deletePermissionFromRoleDto: DeletePermissionFromRoleDto): Promise<IResponse> {
    const result = await authServiceGrpcClient.deletePermissionFromRole(
      deletePermissionFromRoleDto.permission,
      deletePermissionFromRoleDto.role,
    );
    if ((result as any)?.error) {
      return msg400((result as any).error);
    } else {
      return msg200({
        message: (result as any).message,
      });
    }
  }

  async addRoleToAccountResponse(addRoleToAccountDto: AddRoleToAccountDto, accountId: number): Promise<IResponse> {
    const result = await authServiceGrpcClient.addRoleToAccount(addRoleToAccountDto.role, accountId);
    if ((result as any)?.error) {
      return msg400((result as any).error);
    } else {
      return msg200({
        message: (result as any).message,
      });
    }
  }

  async deleteRoleFromAccountResponse(
    deleteRoleFromAccountDto: DeleteRoleFromAccountDto,
    accountId: number,
  ): Promise<IResponse> {
    const result = await authServiceGrpcClient.deleteRoleFromAccount(deleteRoleFromAccountDto.role, accountId);
    if ((result as any)?.error) {
      return msg400((result as any).error);
    } else {
      return msg200({
        message: (result as any).message,
      });
    }
  }
}

export const adminService = new AdminService();
