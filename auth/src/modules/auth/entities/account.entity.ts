import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { TokenEntity } from './token.entity';
import { RoleEntity } from './role.entity';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  lastLogin: Date;

  @Column('boolean', { default: false })
  isEmailVerified: boolean;

  @Column('boolean', { default: true })
  status: boolean;

  @OneToMany(() => TokenEntity, (token) => token.account)
  tokens: TokenEntity[];

  @ManyToMany(() => RoleEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable({
    name: 'account_roles',
    joinColumn: {
      name: 'account_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 8);
  }

  comparePassword(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  static createVerificationToken(): { verificationToken: string; hashedVerificationToken: string } {
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    return { verificationToken, hashedVerificationToken };
  }
}
