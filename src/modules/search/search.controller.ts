/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { AIService } from '../ai/ai.service';
import { productService } from '../products/product.service';
import isBase64 from 'is-base64';
import { config } from '../../config/configuration';
import { ProductCategory, SearchSortBy } from '../../loaders/enums';
import { AIError, BadRequestError, RequestValidator } from '../../common/error-handler';
import { ImageSearchRequestDto } from './dtos/search.dto';
import { plainToInstance } from 'class-transformer';

export const searchRouter = Router();

// Search using image
searchRouter.post(
  '/image',
  RequestValidator.validate(ImageSearchRequestDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const imageSearchRequestDto = plainToInstance(ImageSearchRequestDto, req.body);
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
    if (!imageSearchRequestDto?.sortBy || imageSearchRequestDto.sortBy === SearchSortBy.RELEVANCE) {
      results = await productService.getProductsSortedByRelevance({
        imageUrls: imageUrlsFromAi.relevant,
        limit: imageSearchRequestDto.limit ?? 10,
        category: imageSearchRequestDto.category ?? ProductCategory.ALL,
      });
    } else if (
      imageSearchRequestDto.sortBy === SearchSortBy.PRICE_ASC ||
      imageSearchRequestDto.sortBy === SearchSortBy.PRICE_DESC
    ) {
      results = await productService.getProductsSortedByPrice({
        imageUrls: imageUrlsFromAi.relevant,
        limit: imageSearchRequestDto.limit ?? 10,
        sortBy: imageSearchRequestDto.sortBy,
        category: imageSearchRequestDto.category ?? ProductCategory.ALL,
      });
    }

    res.send({
      status: true,
      searchResults: results.detailedResults,
      // restIdResults: results.restIdResults,
    });
  },
);

// Todo: Search using text endpoint
//
