/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { productService } from '../products/product.service';
import { AccountRole } from '../../loaders/enums';
import { BadRequestError, RequestValidator } from '../../common/error-handler';
import { checkJwt, checkRole } from '../auth/auth.service';
import { accountService } from '../auth/account.service';
import { GetProductListByIdListRequest } from './dtos/product.dto';
import { plainToInstance } from 'class-transformer';

export const productRouter = Router();

productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
});

productRouter.post(
  '/list',
  RequestValidator.validate(GetProductListByIdListRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getProductByIdListRequest = plainToInstance(GetProductListByIdListRequest, req.body);
    const products = await productService.getProductsByIdList(getProductByIdListRequest.idList);
    res.status(200).send({
      status: true,
      products: products.products,
    });
  },
);
