import { Repository } from 'typeorm';
import { Permission } from '../../../loaders/enums';
import { PermissionEntity } from '../entities/permission.entity';
import { dataSource } from '../../../database/data-source';

export class PermissionService {
  private permissionRepository: Repository<PermissionEntity>;
  constructor() {
    this.permissionRepository = dataSource.getRepository(PermissionEntity);
  }

  async getPermissionByNameOrCreate(permission: Permission): Promise<PermissionEntity> {
    let currentPermission = await this.permissionRepository.findOne({ where: { name: permission } });
    if (!currentPermission) {
      currentPermission = new PermissionEntity();
      currentPermission.name = permission;
      await this.permissionRepository.save(currentPermission);
    }
    return currentPermission;
  }
}

export const permissionService = new PermissionService();
