import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { CollectionEntity } from './collection.entity';

@Entity({ name: 'collection_product' })
export class CollectionProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @ManyToOne(() => CollectionEntity, (collection) => collection.collectionProducts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  collection: CollectionEntity;
}