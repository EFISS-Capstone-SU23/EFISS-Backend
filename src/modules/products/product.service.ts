import { HydratedDocument } from "mongoose";
import { IProductEntity, ProductEntity } from "./entities/product.entity";

export class ProductService {
  constructor() {}
  async getProductByImageUrl(
    imageUrl: string
  ): Promise<HydratedDocument<IProductEntity>> {
    // Get file name and extension only!
    const fileName = imageUrl.split("/").pop();
    return await ProductEntity.findOne({
      images: { $regex: fileName, $options: "i" },
    });
  }
}
