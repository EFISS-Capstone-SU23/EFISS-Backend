import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SearchAdsEntity } from './search-ads.entity';

@Entity({ name: 'shops' })
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  websiteUrl: string;

  @Column()
  shopName: string;

  @OneToOne(() => SearchAdsEntity, (searchAdsEntity) => searchAdsEntity.shop) // specify inverse side as a second parameter
  searchAds: SearchAdsEntity;

  @Column()
  accountId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
