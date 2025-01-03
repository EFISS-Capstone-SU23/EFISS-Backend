import { min } from 'class-validator';
import { msg200, msg400, msg500 } from '../../../common/helpers';
import { IResponse } from '../../../common/response';
import { config } from '../../../config/configuration';
import { SEARCH_MAXIMUM_RESULTS } from '../../../loaders/constants';
import { SearchSortBy, ShopType } from '../../../loaders/enums';
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
    const md5Perf = perf();
    md5Perf.start();
    const md5 = crypto.createHash('md5').update(searchImageRequestDto.encodedImage).digest('hex');
    const md5PerfResult = md5Perf.stop();
    console.log(`[MD5] Performance: ${md5PerfResult.time} ms`);

    const diversity = searchImageRequestDto.diversity ?? 1;

    // Check if it exists in cache
    let imageUrls: string[];
    let croppedImage: string = '';
    const key = `search:image:${md5}:${diversity}`;
    const getCachePerf = perf();
    getCachePerf.start();
    const cachedAiResults = await redisClient.get(key);
    const getCachePerfResult = getCachePerf.stop();
    console.log(`[Redis] Get cache: ${getCachePerfResult.time} ms`);
    if (cachedAiResults) {
      const parsePerf = perf();
      parsePerf.start();
      imageUrls = JSON.parse(cachedAiResults).imageUrls;
      croppedImage = JSON.parse(cachedAiResults).croppedImage;
      const parsePerfResult = parsePerf.stop();
      console.log(`[Redis] Parse cache: ${parsePerfResult.time} ms`);
    } else {
      const performance = perf();
      performance.start();
      // Get relevant images by encodedImage (from AI model)
      const imageUrlsFromAi = await aiService.findRelevantImages({
        topk: SEARCH_MAXIMUM_RESULTS,
        image: searchImageRequestDto.encodedImage,
        diversity: diversity,
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
      croppedImage = imageUrlsFromAi.croppedImage;
      const setCachePerf = perf();
      setCachePerf.start();
      redisClient.set(
        key,
        JSON.stringify({
          imageUrls: imageUrls,
          croppedImage: croppedImage,
        }),
        {
          EX: 60 * 15,
        },
      );
      const setCachePerfResult = setCachePerf.stop();
      console.log(`[Redis] Set cache: ${setCachePerfResult.time} ms`);
    }

    const performance = perf();
    performance.start();
    // Get product list by imageUrls
    let results: any = await productService.searchByImage({
      imageUrls: imageUrls,
      limit: searchImageRequestDto.limit ?? 10,
      categories: searchImageRequestDto.categories ?? [],
      sortBy: <SearchSortBy>(searchImageRequestDto.sortBy ?? SearchSortBy.RELEVANCE),
      minPrice: searchImageRequestDto.minPrice,
      maxPrice: searchImageRequestDto.maxPrice,
      shopType: <ShopType>searchImageRequestDto.shopType,
    });
    const mongoPerf = performance.stop();
    console.log(`[MongoDB] Performance: ${mongoPerf.time} ms`);

    return msg200({
      searchResults: results.products,
      remainingImageUrls: results.remainingImageUrls,
      croppedImage: croppedImage,
    });
  }

  async searchByText(opts: {
    query?: string;
    pageSize?: number;
    pageNumber?: number;
    minPrice?: number;
    maxPrice?: number;
    categories?: string[];
    sortBy?: SearchSortBy;
    shopType?: ShopType;
  }): Promise<IResponse> {
    const {
      query,
      pageSize = 10,
      pageNumber = 1,
      minPrice = undefined,
      maxPrice = undefined,
      categories = undefined,
      sortBy = SearchSortBy.DEFAULT,
      shopType = undefined,
    } = opts;

    if (!query) {
      return msg400('query is required');
    }

    if ((minPrice || minPrice == 0) && minPrice < 0) {
      return msg400('minPrice must be bigger than or equal to 0');
    }

    if ((maxPrice || maxPrice == 0) && maxPrice <= 0) {
      return msg400('maxPrice must be bigger than 0');
    }

    if ((minPrice || minPrice == 0) && (maxPrice || maxPrice == 0) && maxPrice < minPrice) {
      return msg400('maxPrice must be bigger than minPrice');
    }

    if (pageNumber < 1) {
      return msg400('pageNumber must be bigger than 0');
    }

    if (pageSize < 1) {
      return msg400('pageSize must be bigger than 0');
    }

    const searchResults = await productService.searchByText({
      query: query,
      pageSize: pageSize,
      pageNumber: pageNumber,
      minPrice: minPrice,
      maxPrice: maxPrice,
      categories: categories,
      sortBy: sortBy,
      shopType: shopType,
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
