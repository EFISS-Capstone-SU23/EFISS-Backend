/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { productService } from '../products/product.service';
import { AccountRole } from '../../loaders/enums';
import { BadRequestError, RequestValidator } from '../../common/error-handler';
import { checkJwt, checkRole } from '../auth/auth.service';
import { accountService } from '../auth/account.service';
import { GetProductListByIdListRequest, GetProductListByImageUrls } from './dtos/product.dto';
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

productRouter.post(
  '/list/by-image-urls',
  RequestValidator.validate(GetProductListByImageUrls),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getProductListByImageUrls = plainToInstance(GetProductListByImageUrls, req.body);
    let products = await productService.getProductsByImageUrls(getProductListByImageUrls.imageUrls);
    if (getProductListByImageUrls?.limit) {
      products = products.splice(0, getProductListByImageUrls.limit);
    }

    // Get remaining image urls
    for (const product of products) {
      for (const imageUrl of product.images) {
        const fileName = imageUrl?.split('/')?.pop();
        const index = getProductListByImageUrls.imageUrls.findIndex((url) => url.includes(fileName as string));
        if (index == -1) continue;
        getProductListByImageUrls.imageUrls.splice(index, 1);
      }
    }
    res.status(200).send({
      status: true,
      products: products,
      remainingImageUrls: getProductListByImageUrls.imageUrls,
    });
  },
);
