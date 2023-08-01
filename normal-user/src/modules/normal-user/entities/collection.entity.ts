import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { CollectionProductEntity } from './collection-product.entity';

@Entity({ name: 'collections' })
export class CollectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  accountId: number;

  @OneToMany(() => CollectionProductEntity, (collectionProduct) => collectionProduct.collection)
  collectionProducts: CollectionProductEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
