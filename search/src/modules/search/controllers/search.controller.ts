/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { AIService, aiService } from '../../ai/ai.service';
import isBase64 from 'is-base64';
import { config } from '../../../config/configuration';
import { AIError, BadRequestError, RequestValidator } from '../../../common/error-handler';
import { SearchImageRequest } from '.././dtos/search.dto';
import { plainToInstance } from 'class-transformer';
import { productService } from '../../product/services/product.service';
import { SearchOrderBy } from '../../../proto/product_pb';

export const searchRouter = Router();

// Search using image
searchRouter.post(
  '/image',
  RequestValidator.validate(SearchImageRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const searchImageRequest = plainToInstance(SearchImageRequest, req.body);
    // Validate encodedImage
    if (!isBase64(req.body.encodedImage)) {
      next(new BadRequestError('encodedImage is not a valid base64 string'));
      return;
    }

    // Get relevant images by encodedImage (from AI model)
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
    let results: any = await productService.searchByImage({
      imageUrls: imageUrlsFromAi.relevant,
      limit: searchImageRequest.limit ?? 10,
      categories: searchImageRequest.categories ?? [],
      orderBy: <SearchOrderBy>(searchImageRequest.sortBy ?? SearchOrderBy.RELEVANCE),
    });

    res.send({
      status: true,
      searchResults: results.productsList,
      remainingProductIds: results.remainingproductidsList,
    });
  },
);

// Todo: Search using text endpoint
//
