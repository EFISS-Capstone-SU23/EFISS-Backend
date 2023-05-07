import { HydratedDocument } from "mongoose";
import { IProductEntity, ProductEntity } from "./entities/product.entity";

export class ProductService {
  constructor() {}
  async getProductByImageUrl(
    imageUrl: string
  ): Promise<HydratedDocument<IProductEntity>> {
    return await ProductEntity.findOne({
      images: imageUrl,
    });
  }
}
