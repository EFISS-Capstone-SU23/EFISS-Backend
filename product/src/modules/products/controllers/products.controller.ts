/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { productService } from '../services/products.service';
import { sendResponse } from '../../../common/helpers';
import { GetProductListByIdListRequestDto, GetRecommendedProductsBySearchHistory } from '../dtos/products.dto';
import { RequestValidator } from '../../../common/error-handler';
import { send } from 'process';

export const productRouter = Router();

productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const productId = req.params.id;

  const productResult = await productService.getProductById(productId);

  sendResponse(productResult, res, next);
});

productRouter.post(
  '/list',
  RequestValidator.validate(GetProductListByIdListRequestDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getProductByIdListRequest = plainToInstance(GetProductListByIdListRequestDto, req.body);
    const productsResult = await productService.getProductsByIdList(getProductByIdListRequest.idList);

    sendResponse(productsResult, res, next);
  },
);

productRouter.post(
  '/recommend',
  RequestValidator.validate(GetRecommendedProductsBySearchHistory),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getRecommendedProductsBySearchHistory = plainToInstance(GetRecommendedProductsBySearchHistory, req.body);
    const productsResult = await productService.getRecommendedProductsBySearchHistory(
      getRecommendedProductsBySearchHistory,
    );
    sendResponse(productsResult, res, next);
  },
);
