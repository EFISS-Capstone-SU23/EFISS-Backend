import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'search_ads' })
export class SearchAdsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  website: string;

  @Column()
  group: string;

  @Column()
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
