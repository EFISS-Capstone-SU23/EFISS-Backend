import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from '../config/configuration';
import { AdsEntity } from '../modules/ads/entities/ads.entity';
import { BannerAdsEntity } from '../modules/ads/entities/banner-ads.entity';
import { CollectionAdsEntity } from '../modules/ads/entities/collection-ads.entity';
import { SearchAdsEntity } from '../modules/ads/entities/search-ads.entity';
import { ShopEntity } from '../modules/ads/entities/shop.entity';

export const dataSource = new DataSource({
  type: config.database.type,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: true,
  logging: true,
  entities: [AdsEntity, BannerAdsEntity, CollectionAdsEntity, SearchAdsEntity, ShopEntity],
  subscribers: [],
  migrations: [],
});
