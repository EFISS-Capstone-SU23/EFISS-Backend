import { Repository } from 'typeorm';
import { BEDataSource } from '../../database/datasource';
import { AccountRole } from '../../loaders/enums';
import { RoleEntity } from './entities/role.entity';

export class RoleService {
  static roleService: RoleService;
  private constructor(private readonly roleRepository: Repository<RoleEntity>) {}

  static getInstance(): RoleService {
    if (!RoleService.roleService) {
      const roleRepository = BEDataSource.getRepository(RoleEntity);
      RoleService.roleService = new RoleService(roleRepository);
    }
    return RoleService.roleService;
  }

  async getRoleByName(role: AccountRole): Promise<RoleEntity | null> {
    return await this.roleRepository.findOne({ where: { role: role } });
  }

  async getRoleByNameOrCreate(role: AccountRole): Promise<RoleEntity> {
    let currentRole = await this.roleRepository.findOne({ where: { role: role } });
    if (!currentRole) {
      currentRole = new RoleEntity();
      currentRole.role = role;
      await this.roleRepository.save(currentRole);
    }
    return currentRole;
  }

  async saveRole(role: RoleEntity) {
    return await this.roleRepository.save(role);
  }
}

export const roleService = RoleService.getInstance();
