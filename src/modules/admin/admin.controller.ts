/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { AccountRole } from '../../loaders/enums';
import { BadRequestError, RequestValidator } from '../../common/error-handler';
import { plainToInstance } from 'class-transformer';
import { ReportBugRequest } from './dtos/user.dto';
import { checkJwt, checkRole } from '../auth/auth.service';
import { accountService } from '../auth/account.service';
import { bugReportService } from '../user/bug-report.service';

export const adminRouter = Router();

adminRouter.get(
  '/bug-report',
  checkJwt,
  checkRole([AccountRole.ADMIN]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    const bugReportRequest = plainToInstance(ReportBugRequest, req.body);

    await bugReportService.addNewBugReport(bugReportRequest.title, bugReportRequest.content, account);

    res.status(200).send({
      status: true,
      message: 'Bug report sent successfully',
    });
  },
);
