/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { productService } from '../products/product.service';
import { AccountRole } from '../../loaders/enums';
import { BadRequestError } from '../../common/error-handler';
import { checkJwt, checkRole } from '../auth/auth.service';
import { accountService } from '../auth/account.service';

export const productRouter = Router();

productRouter.get(
  '/:id',
  checkJwt,
  checkRole([AccountRole.USER]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (!product) {
      next(new BadRequestError('Product not found'));
      return;
    }

    res.status(200).send({
      status: true,
      product,
    });
  },
);
