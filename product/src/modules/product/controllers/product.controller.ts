import { Router, type Request, type Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { productService } from '../services/product.service';
import { convertPrice, sendResponse } from '../../../common/helpers';
import {
  GetProductListByIdListRequestDto,
  GetProductListByImageUrlsDto,
  GetRecommendedProductsBySearchHistoryDto,
} from '../dtos/product.dto';
import { RequestValidator } from '../../../common/error-handler';
import { checkJwt, checkPermission } from '../../auth/middlewares/auth.middleware';
import { Permission } from '../../../loaders/enums';

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
  RequestValidator.validate(GetRecommendedProductsBySearchHistoryDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getRecommendedProductsBySearchHistory = plainToInstance(GetRecommendedProductsBySearchHistoryDto, req.body);
    const productsResult = await productService.getRecommendedProductsBySearchHistory(
      getRecommendedProductsBySearchHistory,
    );
    sendResponse(productsResult, res, next);
  },
);

productRouter.post(
  '/list/by-image-urls',
  RequestValidator.validate(GetProductListByImageUrlsDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const getProductListByImageUrls = plainToInstance(GetProductListByImageUrlsDto, req.body);
    let productResults = await productService.getProductsByImageUrls(getProductListByImageUrls);

    sendResponse(productResults, res, next);
  },
);

productRouter.post(
  '/new',
  // checkJwt,
  // checkPermission(Permission.MANAGE_PRODUCTS),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const product = req.body;

    if (product.price) {
      product.price = convertPrice(product.price);
    }
    product.active = true;
    const productResult = await productService.insertProduct(product);

    sendResponse(productResult, res, next);
  },
);

productRouter.post(
  '/update/:id',
  // checkJwt,
  // checkPermission(Permission.MANAGE_PRODUCTS),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const productId = req.params.id;
    const product = req.body;

    const productResult = await productService.updateProductById(productId, product);
    sendResponse(productResult, res, next);
  },
);

productRouter.get(
  '/downloadedUrls/:domain',
  // checkJwt,
  // checkPermission(Permission.MANAGE_PRODUCTS),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const domain = req.params.domain;
    const downloadedUrls = await productService.getDownloadedProductURL(domain);

    sendResponse(downloadedUrls, res, next);
  },
);

productRouter.delete(
  '/delete/:id',
  checkJwt,
  checkPermission(Permission.MANAGE_PRODUCTS),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const productId = req.params.id;
    const productResult = await productService.deleteProductById(productId);
    sendResponse(productResult, res, next);
  },
);

productRouter.post(
  '/allProduct',
  // checkJwt,
  // checkPermission(Permission.MANAGE_PRODUCTS),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('allProduct route');
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 20;

    console.log('page', page, 'pageSize', pageSize);
    console.log('query', req.query);
    const { query = {} } = req.body;
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
  },
);

productRouter.put('/setActiveForImage', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { productId, imageIndex, active } = req.body;

  const productResult = await productService.setActiveForImage(productId, imageIndex, active);
  sendResponse(productResult, res, next);
});

productRouter.get('/stat/product', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const productResult = await productService.countNumberOfProducts();
  sendResponse(productResult, res, next);
});

productRouter.get('/stat/image', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const imageResult = await productService.countNumberOfImages();
  sendResponse(imageResult, res, next);
});
