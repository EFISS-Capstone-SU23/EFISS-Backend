import { Repository } from 'typeorm';
import { BEDataSource } from '../../database/datasource';
import { AccountEntity } from './entities/account.entity';
import { AccountRole } from '../../loaders/enums';
import { roleService } from './role.service';

export class AccountService {
  static accountService: AccountService;
  private constructor(private readonly accountRepository: Repository<AccountEntity>) {}

  static getInstance(): AccountService {
    if (!AccountService.accountService) {
      const accountRepository = BEDataSource.getRepository(AccountEntity);
      AccountService.accountService = new AccountService(accountRepository);
    }
    return AccountService.accountService;
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
}

export const accountService = AccountService.getInstance();
