import { Repository } from 'typeorm';
import { dataSource } from '../../../database/data-source';
import { AccountEntity } from '.././entities/account.entity';
import { AccountRole } from '../../../loaders/enums';
import { roleService } from './role.service';
import { tokenService } from './token.service';
// import { roleService } from './role.service';

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

  async saveAccount(account: AccountEntity): Promise<void> {
    await this.accountRepository.save(account);
  }

  async getAccountById(accountId: number): Promise<AccountEntity | null> {
    return await this.accountRepository.findOne({ where: { id: accountId }, relations: ['tokens', 'roles'] });
  }

  async addRoleToAccount(account: AccountEntity, role: AccountRole): Promise<void> {
    const roleEntity = await roleService.getRoleByNameOrCreate(role);
    if (account?.roles && account?.roles?.length) {
      account.roles.push(roleEntity);
    } else {
      account.roles = [roleEntity];
    }
    await this.saveAccount(account);
  }

  // async deleteRoleOfAccount(account: AccountEntity, role: AccountRole): Promise<void> {
  //   const roleEntity = await roleService.getRoleByName(role);
  //   if (account?.roles && account?.roles?.length) {
  //     account.roles = account.roles.filter((r) => r.id !== roleEntity?.id);
  //   }
  //   await this.saveAccount(account);
  // }

  async deleteAccountById(id: number): Promise<void> {
    await this.accountRepository
      .createQueryBuilder('accounts')
      .delete()
      .from(AccountEntity)
      .where('id = :id', { id: id })
      .execute();
  }

  // async getAccountList(opts: {
  //   pageNumber: number;
  //   pageSize: number;
  //   query: string;
  //   sortBy: ViewAccountListSortBy;
  // }): Promise<any> {
  //   const { pageNumber = 1, pageSize = 10, query = '', sortBy = ViewAccountListSortBy.NEWEST } = opts;
  //   const accounts = await this.accountRepository
  //     .createQueryBuilder('accounts')
  //     .where('username LIKE :query', { query: `%${query}%` })
  //     .orWhere('email LIKE :query', { query: `%${query}%` })
  //     .orWhere('firstName LIKE :query', { query: `%${query}%` })
  //     .orWhere('lastName LIKE :query', { query: `%${query}%` })
  //     .orderBy('accounts.createdAt', sortBy === ViewAccountListSortBy.NEWEST ? 'DESC' : 'ASC')
  //     .skip((pageNumber - 1) * pageSize)
  //     .take(pageSize)
  //     .getMany();
  //   const totalItems = await this.accountRepository
  //     .createQueryBuilder('accounts')
  //     .where('username LIKE :query', { query: `%${query}%` })
  //     .orWhere('email LIKE :query', { query: `%${query}%` })
  //     .orWhere('firstName LIKE :query', { query: `%${query}%` })
  //     .orWhere('lastName LIKE :query', { query: `%${query}%` })
  //     .orderBy('accounts.createdAt', sortBy === ViewAccountListSortBy.NEWEST ? 'DESC' : 'ASC')
  //     .getCount();
  //   const totalPages = Math.ceil(totalItems / pageSize);
  //   return {
  //     accounts: accounts,
  //     totalItems: totalItems,
  //     totalPages: totalPages,
  //     pageSize: pageSize,
  //     pageNumber: pageNumber,
  //   };
  // }

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
}

export const accountService = new AccountService();
