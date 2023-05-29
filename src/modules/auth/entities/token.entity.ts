import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { TokenType } from '../../../loaders/enums';

@Entity({ name: 'tokens' })
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({
    type: 'enum',
    enum: TokenType,
  })
  type: TokenType;

  @Column('timestamp')
  expiresAt: Date;

  @ManyToOne(() => AccountEntity, (account) => account.tokens)
  @JoinColumn()
  account: AccountEntity;
}
