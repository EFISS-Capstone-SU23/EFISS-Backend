import * as grpc from '@grpc/grpc-js';
import { ProductServiceClient } from '../../../proto/product_grpc_pb';
import { config } from '../../../config/configuration';
import { SearchByImageOptions, SearchOrderBy } from '../../../proto/product_pb';

export class ProductService {
  private productServiceClient: ProductServiceClient;
  constructor(private readonly grpcHost: string, private readonly grpcPort: number) {
    this.productServiceClient = new ProductServiceClient(`${grpcHost}:${grpcPort}`, grpc.credentials.createInsecure());
  }

  async searchByImage(opts: {
    imageUrls: string[];
    limit: number;
    categories: string[] | undefined;
    orderBy: SearchOrderBy;
  }) {
    return new Promise(async (resolve, reject) => {
      const { imageUrls, limit = 10, categories = undefined, orderBy = SearchOrderBy.RELEVANCE } = opts;
      const request = new SearchByImageOptions();
      request.setImageurlsList(imageUrls);
      request.setLimit(limit);
      request.setCategoriesList(categories ?? []);
      request.setOrderby(orderBy);

      this.productServiceClient.searchByImage(request, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(response.toObject());
        }
      });
    });
  }
}

export const productService = new ProductService(config.productService.grpc.host, config.productService.grpc.port);
