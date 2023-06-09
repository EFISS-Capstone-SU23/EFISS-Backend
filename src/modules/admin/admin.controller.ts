import { Router } from 'express';
import { checkJwt, checkRole } from '../auth/auth.service';
import { AccountRole, ViewBugReportSortBy } from '../../loaders/enums';
import { ViewBugReportsRequest } from './dtos/admin.dto';
import { BadRequestError, RequestValidator } from '../../common/error-handler';
import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { bugReportService } from '../user/bug-report.service';

export const adminRouter = Router();

// View bug reports
adminRouter.get(
  '/bug-report',
  checkJwt,
  checkRole([AccountRole.ADMIN]),
  RequestValidator.validate(ViewBugReportsRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const viewBugReportsRequest = plainToInstance(ViewBugReportsRequest, req.query);

    const bugReports = await bugReportService.getBugReportList({
      pageNumber: viewBugReportsRequest.pageNumber ?? 1,
      pageSize: viewBugReportsRequest.pageSize ?? 10,
      sortBy: viewBugReportsRequest.sortBy ?? ViewBugReportSortBy.NEWEST,
    });

    res.status(200).send({
      status: true,
      bugReports: bugReports,
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
