import { Repository } from 'typeorm';
import { BEDataSource } from '../../database/datasource';
import { AccountEntity } from '../auth/entities/account.entity';
import { BugReportEntity } from './entities/bug-report.entity';

export class BugReportService {
  static bugReportService: BugReportService;
  private constructor(private readonly bugReportRepository: Repository<BugReportEntity>) {}

  static getInstance(): BugReportService {
    if (!BugReportService.bugReportService) {
      const bugReportRepository = BEDataSource.getRepository(BugReportEntity);
      BugReportService.bugReportService = new BugReportService(bugReportRepository);
    }
    return BugReportService.bugReportService;
  }

  async addNewBugReport(title: string, content: string, account: AccountEntity): Promise<void> {
    const bugReport = new BugReportEntity();
    bugReport.title = title;
    bugReport.content = content;
    bugReport.account = account;
    await this.bugReportRepository.save(bugReport);
  }
}

export const bugReportService = BugReportService.getInstance();
