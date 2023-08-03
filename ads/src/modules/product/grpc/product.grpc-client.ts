import * as grpc from '@grpc/grpc-js';
import { ProductServiceClient } from '../../../proto/product_grpc_pb';
import { config } from '../../../config/configuration';
import { ProductIds } from '../../../proto/product_pb';

export class ProductServiceGrpcClient {
  private productServiceClient: ProductServiceClient;
  constructor(private readonly grpcHost: string, private readonly grpcPort: number) {
    this.productServiceClient = new ProductServiceClient(`${grpcHost}:${grpcPort}`, grpc.credentials.createInsecure());
  }

  async getProductsByIds(productIds: string[]) {
    return new Promise(async (resolve, reject) => {
      const request = new ProductIds();
      request.setIdsList(productIds);

      this.productServiceClient.getProductsByIds(request, (err, response) => {
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

export const productServiceGrpcClient = new ProductServiceGrpcClient(
  config.productService.grpc.host,
  config.productService.grpc.port,
);
