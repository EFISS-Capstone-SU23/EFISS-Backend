/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { AIService } from '../ai/ai.service';
import { productService } from '../products/product.service';
import isBase64 from 'is-base64';
import { config } from '../../config/configuration';
import { SearchSortBy } from '../../loaders/enums';
import { AIError, BadRequestError, RequestValidator } from '../../common/error-handler';
import { SearchImageRequest } from './dtos/search.dto';
import { plainToInstance } from 'class-transformer';
import { routeRolesConfig } from '../../config/route-roles.config';

export const searchRouter = Router();

// Search using image
searchRouter.post(
  routeRolesConfig.search.routes.searchByImage.route,
  RequestValidator.validate(SearchImageRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const searchImageRequest = plainToInstance(SearchImageRequest, req.body);
    // Validate encodedImage
    if (!isBase64(req.body.encodedImage)) {
      next(new BadRequestError('encodedImage is not a valid base64 string'));
      return;
    }

    // Get relevant images by encodedImage (from AI model)
    const aiService = AIService.getInstance();
    const imageUrlsFromAi = await aiService.findRelevantImages({
      topk: config.search.maximumResults,
      image: req.body.encodedImage,
    });
    if (imageUrlsFromAi instanceof Error) {
      if (imageUrlsFromAi?.stack?.includes('ECONNREFUSED')) {
        next(new AIError('[AI Model API] Failed to connect to AI Model API'));
      } else {
        next(new AIError(`[AI Model API] ${imageUrlsFromAi.message}`));
      }
      return;
    }
    // Get product list by imageUrls
    let results: any;
    if (!searchImageRequest?.sortBy || searchImageRequest.sortBy === SearchSortBy.RELEVANCE) {
      results = await productService.getProductsSortedByRelevance({
        imageUrls: imageUrlsFromAi.relevant,
        limit: searchImageRequest.limit ?? 10,
        categories: searchImageRequest.categories,
      });
    } else if (
      searchImageRequest.sortBy === SearchSortBy.PRICE_ASC ||
      searchImageRequest.sortBy === SearchSortBy.PRICE_DESC
    ) {
      results = await productService.getProductsSortedByPrice({
        imageUrls: imageUrlsFromAi.relevant,
        limit: searchImageRequest.limit ?? 10,
        sortBy: searchImageRequest.sortBy,
        categories: searchImageRequest.categories,
      });
    }

    res.send({
      status: true,
      searchResults: results.products,
      remainingProductIds: results.remainingProductIds,
    });
  },
);

// Todo: Search using text endpoint
//
