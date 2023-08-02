/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { productService } from '../services/products.service';
import { sendResponse } from '../../../common/helpers';
import {
  GetProductListByIdListRequestDto,
  GetProductListByImageUrls,
  GetRecommendedProductsBySearchHistory,
} from '../dtos/products.dto';
import { RequestValidator } from '../../../common/error-handler';

export const productRouter = Router();

function convertPrice(price: string): number {
	// Remove all non-digit characters
	const priceString = price.replace(/[^0-9]/g, '');

	// Convert to number
	const priceNumber = Number(priceString);

	// Check if price is a number
	if (priceNumber) {
		return priceNumber;
	}

	return -1;
}


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

productRouter.post(
  '/list/by-image-urls',
  RequestValidator.validate(GetProductListByImageUrls),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getProductListByImageUrls = plainToInstance(GetProductListByImageUrls, req.body);
    let productResults = await productService.getProductsByImageUrls(getProductListByImageUrls);

    sendResponse(productResults, res, next);
  },
);

productRouter.post('/new', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const product = req.body;

  if (product.price) {
    product.price = convertPrice(product.price);
  }
  product.active = true;
  const productResult = await productService.insertProduct(product);

  sendResponse(productResult, res, next);
});

productRouter.post('/update/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const productId = req.params.id;
  const product = req.body;

  const productResult = await productService.updateProductById(productId, product);
  sendResponse(productResult, res, next);
});

productRouter.get('/downloadedUrls/:domain', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const domain = req.params.domain;
  const downloadedUrls = await productService.getDownloadedProductURL(domain);

  sendResponse(downloadedUrls, res, next);
});

productRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const productId = req.params.id;
  const productResult = await productService.deleteProductById(productId);
  sendResponse(productResult, res, next);
});

productRouter.post('/allProduct', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const page = parseInt(req.query.page as string , 10);
  const pageSize = parseInt(req.query.pageSize as string, 10);

  const {
    query
  } = req.body;
  const searchQuery = {};

  if (query.active && query.active !== 'all') {
    searchQuery['active'] = query.active === 'active';
  }

  if (query.crawlId) {
    searchQuery['crawlId'] = query.crawlId;
  }

  if (query.search) {
    searchQuery['$text'] = {
      $search: query.search,
      // $caseSensitive: true,
      // $diacriticSensitive: true,
    };
  }

  const productResults = await productService.getProductList(page, pageSize, searchQuery);
  sendResponse(productResults, res, next);
});

productRouter.put('/setActiveForImage', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    productId,
    imageIndex,
    active
  } = req.body;

  const productResult = await productService.setActiveForImage(productId, imageIndex, active);
  sendResponse(productResult, res, next);
});
