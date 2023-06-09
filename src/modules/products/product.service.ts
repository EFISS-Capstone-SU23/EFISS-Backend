/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import mongoose, { type HydratedDocument } from 'mongoose';
import { type IProductEntity, ProductEntity } from './entities/product.entity';
import { ProductCategory, SearchSortBy } from '../../loaders/enums';

export class ProductService {
  private static instance: ProductService;

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getProductByImageUrl(imageUrl: string): Promise<HydratedDocument<IProductEntity> | null> {
    // Get file name and extension only!
    const fileName = imageUrl.split('/').pop();
    return await ProductEntity.findOne({
      images: { $regex: fileName, $options: 'i' },
    });
  }

  async getProductById(id: string): Promise<HydratedDocument<IProductEntity> | null> {
    try {
      return await ProductEntity.findOne({
        _id: id,
      });
    } catch (err) {
      return null;
    }
  }

  async getProductsSortedByPrice(opts: {
    imageUrls: string[];
    limit: number;
    sortBy: SearchSortBy.PRICE_ASC | SearchSortBy.PRICE_DESC;
    category: ProductCategory;
  }): Promise<any> {
    const { imageUrls, limit = 10, sortBy = SearchSortBy.PRICE_ASC, category = ProductCategory.ALL } = opts;
    const productIds = this.getProductIdsFromImageUrls(imageUrls);
    const detailedResults = await ProductEntity.find({ _id: { $in: productIds } })
      .sort(sortBy === SearchSortBy.PRICE_ASC ? { price: 1 } : { price: -1 })
      .limit(limit)
      .exec();

    const restIdResults = await ProductEntity.find({ _id: { $in: productIds } })
      .sort(sortBy === SearchSortBy.PRICE_ASC ? { price: 1 } : { price: -1 })
      .skip(limit)
      .select('_id')
      .exec();
    return {
      detailedResults,
      remainingProductIds: restIdResults.map((product) => product._id),
    };
  }

  async getProductsSortedByRelevance(opts: {
    imageUrls: string[];
    limit: number;
    category: ProductCategory;
  }): Promise<any> {
    const { imageUrls, limit = 10, category = ProductCategory.ALL } = opts;
    const productIds: string[] = this.getProductIdsFromImageUrls(imageUrls);

    const detailedResults: HydratedDocument<IProductEntity>[] = await ProductEntity.find({
      _id: { $in: productIds.splice(0, limit) },
    });
    // while (detailedResults.length < limit && productIds.length !== 0) {
    //   const product = await ProductEntity.findOne({ _id: productIds.shift() });
    //   if (product) {
    //     detailedResults.push(product);
    //   }
    // }

    return {
      detailedResults,
      remainingProductIds: productIds,
    };
  }

  async getProductsByIdList(idList: string[]): Promise<HydratedDocument<IProductEntity>[]> {
    const idObjectList = idList.map((id) => new mongoose.Types.ObjectId(id));
    const result: HydratedDocument<IProductEntity>[] = await ProductEntity.aggregate([
      {
        $match: {
          _id: {
            $in: idObjectList,
          },
        },
      },
      {
        $addFields: {
          index: {
            $indexOfArray: [idObjectList, '$_id'],
          },
        },
      },
      {
        $sort: {
          index: 1,
        },
      },
      {
        $unset: 'index',
      },
    ]).exec();
    return result;
  }

  private getProductIdsFromImageUrls(imageUrls: string[]): string[] {
    const productIds: string[] = [];
    for (const imageUrl of imageUrls) {
      const fileName = imageUrl?.split('/')?.pop();
      const productId = fileName?.split('_')?.[0];
      if (productId && !productIds.includes(productId)) {
        productIds.push(productId);
      }
    }
    return productIds;
  }
}

export const productService = ProductService.getInstance();
