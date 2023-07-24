import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from '../config/configuration';

export const dataSource = new DataSource({
  type: config.database.type,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
