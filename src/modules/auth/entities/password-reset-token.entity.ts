import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity()
export class PasswordResetTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expiredAt: Date;

  @OneToOne(() => AccountEntity, (account) => account.passwordResetToken)
  @JoinColumn()
  account: AccountEntity;
}
