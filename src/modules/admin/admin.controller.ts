import { Router } from 'express';
import { checkJwt, checkRole } from '../auth/auth.service';
import { AccountRole, ViewAccountListSortBy, ViewBugReportSortBy } from '../../loaders/enums';
import { ViewBugReportsRequest } from './dtos/admin.dto';
import { BadRequestError, RequestValidator } from '../../common/error-handler';
import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { bugReportService } from '../user/bug-report.service';
import { ViewAccountListRequest } from './dtos/admin.dto';
import { accountService } from '../auth/account.service';

export const adminRouter = Router();

// View bug reports
adminRouter.get(
  '/bug-report',
  checkJwt,
  checkRole([AccountRole.ADMIN]),
  RequestValidator.validate(ViewBugReportsRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const viewBugReportsRequest = plainToInstance(ViewBugReportsRequest, req.query);

    const results = await bugReportService.getBugReportList({
      pageNumber: viewBugReportsRequest.pageNumber ?? 1,
      pageSize: viewBugReportsRequest.pageSize ?? 10,
      sortBy: viewBugReportsRequest.sortBy ?? ViewBugReportSortBy.NEWEST,
    });

    res.status(200).send({
      status: true,
      bugReports: results.bugReports,
      totalPages: results.totalPages,
      pageSize: results.pageSize,
      pageNumber: results.pageNumber,
      totalItems: results.totalItems,
    });
  },
);

// Delete bug report
adminRouter.delete(
  '/bug-report/:id',
  checkJwt,
  checkRole([AccountRole.ADMIN]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const bugReportId = Number(req.params.id);
    if (!bugReportId) {
      next(new BadRequestError('Invalid bug report id'));
      return;
    }

    const bugReport = await bugReportService.getBugReportById(bugReportId);
    if (!bugReport) {
      next(new BadRequestError('Bug report not found'));
      return;
    }

    await bugReportService.deleteBugReportById(bugReportId);

    res.status(200).send({
      status: true,
      message: 'Delete bug report successfully',
    });
  },
);

// View account list
// - Search by username/email/firstName/lastName
adminRouter.get(
  '/account',
  checkJwt,
  checkRole([AccountRole.ADMIN]),
  RequestValidator.validate(ViewAccountListRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    const viewAccountListRequest = plainToInstance(ViewAccountListRequest, req.query);

    const results = await accountService.getAccountList({
      pageNumber: viewAccountListRequest.pageNumber ?? 1,
      pageSize: viewAccountListRequest.pageSize ?? 10,
      query: viewAccountListRequest.query ?? '',
      sortBy: viewAccountListRequest.sortBy ?? ViewAccountListSortBy.NEWEST,
    });

    res.status(200).send({
      status: true,
      accounts: results.accounts,
      totalItems: results.totalItems,
      totalPages: results.totalPages,
      pageSize: results.pageSize,
      pageNumber: results.pageNumber,
    });
  },
);

// Delete account
adminRouter.delete(
  '/account/:id',
  checkJwt,
  checkRole([AccountRole.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (!id) {
      next(new BadRequestError('Invalid account id'));
      return;
    }

    const account = await accountService.getAccountById(id);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    await accountService.deleteAccountById(id);

    res.status(200).send({
      status: true,
      message: 'Delete account successfully',
    });
  },
);
