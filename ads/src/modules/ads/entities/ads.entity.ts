import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdStatus, AdType } from '../../../loaders/enums';
import { BannerAdsEntity } from './banner-ads.entity';
import { CollectionAdsEntity } from './collection-ads.entity';
import { SearchAdsEntity } from './search-ads.entity';

@Entity({ name: 'ads' })
export class AdsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: AdType,
  })
  adType: AdType;

  @Column()
  accountId: number;

  @Column({
    type: 'enum',
    enum: AdStatus,
  })
  status: AdStatus;

  @Column({
    nullable: true,
  })
  shopId: number;

  @OneToOne(() => BannerAdsEntity)
  @JoinColumn()
  bannerAds: BannerAdsEntity;

  @OneToOne(() => CollectionAdsEntity)
  @JoinColumn()
  collectionAds: CollectionAdsEntity;

  @OneToOne(() => SearchAdsEntity)
  @JoinColumn()
  searchAds: SearchAdsEntity;

  @Column({
    default: 0,
  })
  viewCount: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
