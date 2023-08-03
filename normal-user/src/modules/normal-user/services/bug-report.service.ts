import { Repository } from 'typeorm';
import { BugReportEntity } from '../entities/bug-report.entity';
import { ViewBugReportSortBy } from '../../../loaders/enums';
import { dataSource } from '../../../database/data-source';

export class BugReportService {
  private bugReportRepository: Repository<BugReportEntity>;
  constructor() {
    this.bugReportRepository = dataSource.getRepository(BugReportEntity);
  }

  async addNewBugReport(title: string, content: string, accountId: number): Promise<void> {
    const bugReport = new BugReportEntity();
    bugReport.title = title;
    bugReport.content = content;
    bugReport.accountId = accountId;
    await this.bugReportRepository.save(bugReport);
  }

  async getBugReportById(id: number): Promise<BugReportEntity | null> {
    const bugReport = await this.bugReportRepository
      .createQueryBuilder('bug_reports')
      .where('id = :id', { id: id })
      .getOne();
    return bugReport;
  }

  async deleteBugReportById(id: number): Promise<void> {
    await this.bugReportRepository
      .createQueryBuilder('bug_reports')
      .delete()
      .from(BugReportEntity)
      .where('id = :id', { id: id })
      .execute();
  }

  async getBugReportList(opts: { pageNumber: number; pageSize: number; sortBy: ViewBugReportSortBy }): Promise<any> {
    const { pageNumber = 1, pageSize = 10, sortBy = ViewBugReportSortBy.NEWEST } = opts;
    const bugReports = await this.bugReportRepository
      .createQueryBuilder('bug_reports')
      .orderBy('bug_reports.createdAt', sortBy === ViewBugReportSortBy.NEWEST ? 'DESC' : 'ASC')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getMany();
    const totalItems = await this.bugReportRepository.createQueryBuilder('bug_reports').getCount();
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      pageNumber: pageNumber,
      totalPages: totalPages,
      pageSize: pageSize,
      totalItems: totalItems,
      bugReports: bugReports,
    };
  }
}

export const bugReportService = new BugReportService();
