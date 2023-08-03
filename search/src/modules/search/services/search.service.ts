import { msg200, msg400, msg500 } from '../../../common/helpers';
import { IResponse } from '../../../common/response';
import { config } from '../../../config/configuration';
import { SEARCH_MAXIMUM_RESULTS } from '../../../loaders/constants';
import { SearchSortBy } from '../../../loaders/enums';
import { aiService } from '../../ai/ai.service';
import { productService } from '../../product/services/product.service';
import { redisClient } from '../../redis/redis';
import { SearchImageRequestDto } from '../dtos/search.dto';
import crypto from 'crypto';
import perf from 'execution-time';

export class SearchService {
  constructor() {}

  async searchByImage(searchImageRequestDto: SearchImageRequestDto): Promise<IResponse> {
    // Create md5 hash from encodedImage
    const md5 = crypto.createHash('md5').update(searchImageRequestDto.encodedImage).digest('hex');

    // Check if it exists in cache
    let imageUrls: string[];
    const key = `search:image:${md5}`;
    const cachedImageUrls = await redisClient.get(key);
    if (cachedImageUrls) {
      imageUrls = JSON.parse(cachedImageUrls);
    } else {
      const performance = perf();
      performance.start();
      // Get relevant images by encodedImage (from AI model)
      const imageUrlsFromAi = await aiService.findRelevantImages({
        topk: SEARCH_MAXIMUM_RESULTS,
        image: searchImageRequestDto.encodedImage,
      });

      if (imageUrlsFromAi instanceof Error) {
        if (imageUrlsFromAi?.stack?.includes('ECONNREFUSED')) {
          return msg500('[AI Model API] Failed to connect to AI Model API');
        } else {
          return msg500(`[AI Model API] ${imageUrlsFromAi.message}`);
        }
      }
      const aiPerf = performance.stop();
      console.log(`[AI Model API] Performance: ${aiPerf.time} ms`);
      imageUrls = imageUrlsFromAi.relevant;
      redisClient.set(key, JSON.stringify(imageUrlsFromAi.relevant), {
        EX: 60 * 15,
      });
    }

    const performance = perf();
    performance.start();
    // Get product list by imageUrls
    let results: any = await productService.searchByImage({
      imageUrls: imageUrls,
      limit: searchImageRequestDto.limit ?? 10,
      categories: searchImageRequestDto.categories ?? [],
      sortBy: <SearchSortBy>(searchImageRequestDto.sortBy ?? SearchSortBy.RELEVANCE),
    });
    const mongoPerf = performance.stop();
    console.log(`[MongoDB] Performance: ${mongoPerf.time} ms`);

    return msg200({
      searchResults: results.products,
      remainingImageUrls: results.remainingImageUrls,
    });
  }

  async searchByText(opts: { query?: string; pageSize?: number; pageNumber?: number }): Promise<IResponse> {
    const { query, pageSize = 10, pageNumber = 1 } = opts;
    if (!query) {
      return msg400('query is required');
    }
    const searchResults = await productService.searchByText({
      query: query,
      pageSize: pageSize,
      pageNumber: pageNumber,
    });
    return msg200({
      products: searchResults.products,
      totalPages: searchResults.totalPages,
      pageSize: pageSize,
      pageNumber: pageNumber,
      totalProducts: searchResults.totalProducts,
    });
  }
}

export const searchService = new SearchService();
