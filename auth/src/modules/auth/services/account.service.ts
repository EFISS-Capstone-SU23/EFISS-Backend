import { Repository } from 'typeorm';
import { dataSource } from '../../../database/data-source';
import { AccountEntity } from '.././entities/account.entity';
import { AccountRole, Permission, ViewAccountListSortBy } from '../../../loaders/enums';
import { roleService } from './role.service';
import { tokenService } from './token.service';
import { permissionService } from './permission.service';

export class AccountService {
  private accountRepository: Repository<AccountEntity>;
  constructor() {
    this.accountRepository = dataSource.getRepository(AccountEntity);
  }

  async getAccountByUsername(username: string): Promise<AccountEntity | null> {
    return await this.accountRepository.findOne({ where: { username: username }, relations: ['tokens', 'roles'] });
  }

  async getAccountByEmail(email: string): Promise<AccountEntity | null> {
    return await this.accountRepository.findOne({ where: { email: email }, relations: ['tokens', 'roles'] });
  }

  async saveAccount(account: AccountEntity): Promise<AccountEntity> {
    return await this.accountRepository.save(account);
  }

  async getAccountById(accountId: number): Promise<AccountEntity | null> {
    return await this.accountRepository.findOne({ where: { id: accountId }, relations: ['tokens', 'roles'] });
  }

  async addRoleToAccount(
    accountId: number,
    role: AccountRole,
  ): Promise<{
    error?: string;
    message?: string;
  }> {
    const currentAccount = await this.getAccountById(accountId);

    if (!currentAccount) {
      console.error(`[Add Role To Account] Account ID ${accountId} not found`);
      return {
        error: `Account ID ${accountId} not found`,
      };
    }

    const roleEntity = await roleService.getRoleByNameOrCreate(role);
    if (currentAccount?.roles && currentAccount?.roles?.length) {
      currentAccount.roles.push(roleEntity);
    } else {
      currentAccount.roles = [roleEntity];
    }
    await this.saveAccount(currentAccount);
    return {
      message: 'Role added to account successfully',
    };
  }

  async deleteRoleOfAccount(
    accountId: number,
    role: AccountRole,
  ): Promise<{
    error?: string;
    message?: string;
  }> {
    const account = await this.getAccountById(accountId);
    if (!account) {
      console.error(`[Delete Role Of Account] Account ID ${accountId} not found`);
      return {
        error: `Account ID ${accountId} not found`,
      };
    }
    const roleEntity = await roleService.getRoleByName(role);
    if (!roleEntity) {
      return {
        error: `Role ${role} not found`,
      };
    }
    if (account?.roles && account?.roles?.length) {
      account.roles = account.roles.filter((r) => r.id !== roleEntity?.id);
    }
    await this.saveAccount(account);
    return {
      message: 'Role deleted from account successfully',
    };
  }

  async deleteAccountById(id: number): Promise<{
    error?: string;
    message?: string;
  }> {
    const deleteResult = await this.accountRepository
      .createQueryBuilder('accounts')
      .delete()
      .from(AccountEntity)
      .where('id = :id', { id: id })
      .execute();
    if (deleteResult.affected) {
      return {
        message: `Deleted account ID ${id} successfully!`,
      };
    } else {
      return {
        error: `Account ID ${id} was not found`,
      };
    }
  }

  async getAccountList(opts: {
    pageNumber: number;
    pageSize: number;
    query: string;
    sortBy: ViewAccountListSortBy;
  }): Promise<any> {
    const { pageNumber = 1, pageSize = 10, query = '', sortBy = ViewAccountListSortBy.NEWEST } = opts;
    const accounts = await this.accountRepository
      .createQueryBuilder('accounts')
      .where('username LIKE :query', { query: `%${query}%` })
      .orWhere('email LIKE :query', { query: `%${query}%` })
      .orWhere('firstName LIKE :query', { query: `%${query}%` })
      .orWhere('lastName LIKE :query', { query: `%${query}%` })
      .leftJoinAndSelect('accounts.roles', 'role')
      .orderBy('accounts.createdAt', sortBy === ViewAccountListSortBy.NEWEST ? 'DESC' : 'ASC')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getMany();
    const totalItems = await this.accountRepository
      .createQueryBuilder('accounts')
      .where('username LIKE :query', { query: `%${query}%` })
      .orWhere('email LIKE :query', { query: `%${query}%` })
      .orWhere('firstName LIKE :query', { query: `%${query}%` })
      .orWhere('lastName LIKE :query', { query: `%${query}%` })
      .orderBy('accounts.createdAt', sortBy === ViewAccountListSortBy.NEWEST ? 'DESC' : 'ASC')
      .getCount();
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      accounts: accounts,
      totalItems: totalItems,
      totalPages: totalPages,
      pageSize: pageSize,
      pageNumber: pageNumber,
    };
  }

  async countOnlineUsers(): Promise<number> {
    // Last login is less than 5 minutes ago
    return await this.accountRepository
      .createQueryBuilder('accounts')
      .where('accounts.lastLogin < :fiveMinutesAgo', { fiveMinutesAgo: new Date(Date.now() - 5 * 60000) })
      .getCount();
  }

  async countTotalUsers(): Promise<number> {
    return await this.accountRepository.count();
  }

  async countTodayNewUsers(): Promise<number> {
    return await this.accountRepository
      .createQueryBuilder('accounts')
      .where('accounts.createdAt > :today', { today: new Date().setHours(0, 0, 0, 0) })
      .getCount();
  }

  async createAccount(account: AccountEntity): Promise<void> {
    await this.accountRepository.save(account);
  }

  async getAccountRolesPermissionsByAccountId(accountId: number): Promise<AccountEntity | null> {
    return await this.accountRepository
      .createQueryBuilder('accounts')
      .leftJoinAndSelect('accounts.roles', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .where('accounts.id = :accountId', { accountId: accountId })
      .getOne();
  }

  async getAccountByToken(token: string): Promise<AccountEntity | null> {
    return await this.accountRepository
      .createQueryBuilder('accounts')
      .leftJoinAndSelect('accounts.tokens', 'token')
      .where('token.token = :token', { token: tokenService.hashToken(token) })
      .getOne();
  }

  async updateAccountInformation(accountId: number, firstName?: string, lastName?: string) {
    const account = await this.getAccountById(accountId);
    if (!account) {
      return;
    }
    account.firstName = firstName || account.firstName;
    account.lastName = lastName || account.lastName;
    await this.accountRepository.save(account);
  }

  async addPermissionToRole(
    permission: Permission,
    role: AccountRole,
  ): Promise<{
    error?: string;
    message?: string;
  }> {
    const roleEntity = await roleService.getRoleByName(role);
    if (!roleEntity) {
      return {
        error: `Role ${role} not found`,
      };
    }
    const currentPermission = await permissionService.getPermissionByNameOrCreate(permission);
    if (roleEntity?.permissions && roleEntity?.permissions?.length) {
      roleEntity.permissions.push(currentPermission);
    } else {
      roleEntity.permissions = [currentPermission];
    }
    await roleService.saveRole(roleEntity);
    return {
      message: `Permission ${permission} added to role ${role} successfully`,
    };
  }

  async deletePermissionFromRole(permission: Permission, role: AccountRole) {
    const currentRole = await roleService.getRoleByName(role);
    if (!currentRole) {
      return {
        error: `Role ${role} not found`,
      };
    }
    currentRole.permissions.splice(
      currentRole.permissions.findIndex((per) => per.name == permission),
      1,
    );
    await roleService.saveRole(currentRole);
    return {
      message: `Delete permission ${permission} from role ${role} successfully!`,
    };
  }

  async createAccountGrpc(opts: {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<{
    error?: string;
    message?: string;
  }> {
    const { username, password, email, firstName, lastName } = opts;
    let account = await this.getAccountByUsername(username);
    if (account) {
      return {
        error: `Username ${username} already exists`,
      };
    }
    account = await this.getAccountByEmail(email);
    if (account) {
      return {
        error: `Email ${email} already exists`,
      };
    }

    account = new AccountEntity();
    account.username = username;
    account.password = password;
    account.email = email;
    account.firstName = firstName;
    account.lastName = lastName;
    await this.saveAccount(account);
    return {
      message: 'Created new account successfully!',
    };
  }

  async updateAccountGrpc(opts: {
    accountId: number;
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    status?: boolean;
    lastName?: string;
    isEmailVerified?: boolean;
  }): Promise<{
    message?: string;
    error?: string;
  }> {
    const { accountId, username, password, email, firstName, status, lastName, isEmailVerified } = opts;
    const account = await this.getAccountById(accountId);
    if (!account) {
      return {
        error: `Account ID ${accountId} was not found`,
      };
    }
    if (username) {
      const tmpAccount = await this.getAccountByUsername(username);
      if (tmpAccount) {
        return {
          error: `Account username ${username} already exists`,
        };
      }
      account.username = username || account.username;
    }

    if (email) {
      const tmpAccount = await this.getAccountByEmail(email);
      if (tmpAccount) {
        return {
          error: `Email ${email} already exists`,
        };
      }
      account.email = email || account.email;
    }
    account.firstName = firstName || account.firstName;
    account.lastName = lastName || account.lastName;
    account.status = status || account.status;
    account.isEmailVerified = isEmailVerified ?? account.isEmailVerified;
    if (password) {
      account.password = password;
      account.hashPassword();
    }
    await this.saveAccount(account);
    return {
      message: 'Updated account information successfully',
    };
  }
  
  async getRolesOfAccount(accountId: number): Promise<AccountRole[]> {
    const account = await this.getAccountById(accountId);
    if (!account) {
      return [];
    }
    return account.roles.map((role) => role.name);
  }
}

export const accountService = new AccountService();
