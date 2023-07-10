import { msg200, msg500 } from '../../../common/helpers';
import { IResponse } from '../../../common/response';
import { config } from '../../../config/configuration';
import { SearchOrderBy } from '../../../proto/product_pb';
import { aiService } from '../../ai/ai.service';
import { productService } from '../../product/services/product.service';
import { SearchImageRequest } from '../dtos/search.dto';

export class SearchService {
  constructor() {}

  async searchByImage(searchImageRequestDto: SearchImageRequest): Promise<IResponse> {
    // Get relevant images by encodedImage (from AI model)
    const imageUrlsFromAi = await aiService.findRelevantImages({
      topk: config.search.maximumResults,
      image: searchImageRequestDto.encodedImage,
    });

    if (imageUrlsFromAi instanceof Error) {
      if (imageUrlsFromAi?.stack?.includes('ECONNREFUSED')) {
        return msg500('[AI Model API] Failed to connect to AI Model API');
      } else {
        return msg500(`[AI Model API] ${imageUrlsFromAi.message}`);
      }
    }

    // Get product list by imageUrls
    let results: any = await productService.searchByImage({
      imageUrls: imageUrlsFromAi.relevant,
      limit: searchImageRequestDto.limit ?? 10,
      categories: searchImageRequestDto.categories ?? [],
      orderBy: <SearchOrderBy>(searchImageRequestDto.sortBy ?? SearchOrderBy.RELEVANCE),
    });

    return msg200({
      searchResults: results.productsList,
      remainingProductIds: results.remainingproductidsList,
    });
  }
}

export const searchService = new SearchService();
