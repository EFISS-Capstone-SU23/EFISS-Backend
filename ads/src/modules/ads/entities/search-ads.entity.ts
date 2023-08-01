import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShopEntity } from './shop.entity';

@Entity({ name: 'search_ads' })
export class SearchAdsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ShopEntity)
  @JoinColumn()
  shop: ShopEntity;

  @Column()
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
