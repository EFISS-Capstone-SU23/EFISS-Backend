import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'collection_ads' })
export class CollectionAdsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array', {
    nullable: true,
  })
  productIds: string[];

  @Column()
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
