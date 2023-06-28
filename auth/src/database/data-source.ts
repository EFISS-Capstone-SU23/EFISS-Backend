import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from '../config/configuration';
import { AccountEntity } from '../modules/auth/entities/account.entity';
import { RoleEntity } from '../modules/auth/entities/role.entity';
import { TokenEntity } from '../modules/auth/entities/token.entity';
import { PermissionEntity } from '../modules/auth/entities/permission.entity';

export const dataSource = new DataSource({
  type: config.database.type,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: true,
  logging: true,
  entities: [AccountEntity, RoleEntity, TokenEntity, PermissionEntity],
  subscribers: [],
  migrations: [],
});
