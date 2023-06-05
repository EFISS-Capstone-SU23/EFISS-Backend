import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from '../config/configuration';
import { AccountEntity } from '../modules/auth/entities/account.entity';
import { RoleEntity } from '../modules/auth/entities/role.entity';
import { TokenEntity } from '../modules/auth/entities/token.entity';
import { WishlistEntity } from '../modules/user/entities/wishlist.entity';
import { BugReportEntity } from '../modules/user/entities/bug-report.entity';

export const BEDataSource = new DataSource({
  type: config.database.type,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: true,
  logging: true,
  entities: [AccountEntity, RoleEntity, TokenEntity, WishlistEntity, BugReportEntity],
  subscribers: [],
  migrations: [],
});
