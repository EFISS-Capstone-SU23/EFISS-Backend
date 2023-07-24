import { Repository } from 'typeorm';
import { dataSource } from '../../../database/data-source';
import { AccountRole } from '../../../loaders/enums';
import { RoleEntity } from '.././entities/role.entity';

export class RoleService {
  static roleService: RoleService;
  private constructor(private readonly roleRepository: Repository<RoleEntity>) {}

  static getInstance(): RoleService {
    if (!RoleService.roleService) {
      const roleRepository = dataSource.getRepository(RoleEntity);
      RoleService.roleService = new RoleService(roleRepository);
    }
    return RoleService.roleService;
  }

  async getRoleByName(role: AccountRole): Promise<RoleEntity | null> {
    return await this.roleRepository.findOne({ where: { name: role }, relations: { permissions: true } });
  }

  async getRoleByNameOrCreate(role: AccountRole): Promise<RoleEntity> {
    let currentRole = await this.roleRepository.findOne({ where: { name: role } });
    if (!currentRole) {
      currentRole = new RoleEntity();
      currentRole.name = role;
      await this.roleRepository.save(currentRole);
    }
    return currentRole;
  }

  async saveRole(role: RoleEntity) {
    return await this.roleRepository.save(role);
  }
}

export const roleService = RoleService.getInstance();
