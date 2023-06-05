import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { AccountEntity } from '../../auth/entities/account.entity';

@Entity({ name: 'bug_reports' })
export class BugReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @ManyToOne(() => AccountEntity, (account) => account.bugReports)
  @JoinColumn()
  account: AccountEntity;
}
