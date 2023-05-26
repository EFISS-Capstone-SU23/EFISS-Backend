/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response } from 'express';

export const authRouter = Router();

authRouter.post('/signup', async (req: Request, res: Response): Promise<void> => {
  res.send('ok');
});

authRouter.post('/change-password', async (req: Request, res: Response): Promise<void> => {});
