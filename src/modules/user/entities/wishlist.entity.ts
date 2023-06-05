import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { AccountEntity } from '../../auth/entities/account.entity';

@Entity({ name: 'wishlists' })
export class WishlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @ManyToOne(() => AccountEntity, (account) => account.wishlist)
  @JoinColumn()
  account: AccountEntity;
}
