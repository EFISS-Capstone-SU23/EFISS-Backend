import { HydratedDocument, ObjectId } from "mongoose";
import { IProductEntity, ProductEntity } from "./entities/product.entity";
import { ProductCategory, SearchSortBy } from "../../loaders/enums";

export class ProductService {
  private static instance: ProductService;

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getProductByImageUrl(
    imageUrl: string
  ): Promise<HydratedDocument<IProductEntity>> {
    // Get file name and extension only!
    const fileName = imageUrl.split("/").pop();
    return await ProductEntity.findOne({
      images: { $regex: fileName, $options: "i" },
    });
  }

  async getProductsSortedByPrice(opts: {
    imageUrls: string[];
    limit: number;
    sortBy: SearchSortBy.PRICE_ASC | SearchSortBy.PRICE_DESC;
    category: ProductCategory;
  }): Promise<any> {
    const {
      imageUrls,
      limit = 10,
      sortBy = SearchSortBy.PRICE_ASC,
      category = ProductCategory.ALL,
    } = opts;
    let filter: any = {};
    const orOperator = imageUrls.map((imageUrl) => {
      return { images: { $regex: imageUrl.split("/").pop(), $options: "i" } };
    });
    filter.$or = orOperator;
    if (category != ProductCategory.ALL) {
      filter.category = category;
    }
    const detailedResults = await ProductEntity.find(filter)
      .sort(sortBy == SearchSortBy.PRICE_ASC ? { price: 1 } : { price: -1 })
      .limit(limit)
      .select("_id")
      .exec();
    const restIdResults = await ProductEntity.find(filter)
      .sort(sortBy == SearchSortBy.PRICE_ASC ? { price: 1 } : { price: -1 })
      .skip(limit)
      .select("_id")
      .exec();
    return {
      detailedResults,
      restIdResults,
    };
  }

  async getProductsSortedByRelevance(opts: {
    imageUrls: string[];
    limit: number;
    category: ProductCategory;
  }): Promise<any> {
    const { imageUrls, limit = 10, category = ProductCategory.ALL } = opts;
    let filter: any = {};
    const orOperator = imageUrls.map((imageUrl) => {
      return { images: { $regex: imageUrl.split("/").pop(), $options: "i" } };
    });
    filter.$or = orOperator;
    if (category != ProductCategory.ALL) {
      filter.category = category;
    }
    const detailedResults = await ProductEntity.find(filter)
      .limit(limit)
      .exec();
    const restIdResults = await ProductEntity.find(filter)
      .skip(limit)
      .select("_id")
      .exec();
    return {
      detailedResults,
      restIdResults,
    };
  }
}
