/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';

export const adminRouter = Router();

adminRouter.get('/accounts', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.send('ok');
  // sendResponse(bannerAdsResponse, res, next);
});
