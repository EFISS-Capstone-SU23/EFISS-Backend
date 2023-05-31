/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type HydratedDocument } from 'mongoose';
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

  async getProductsSortedByPrice(opts: {
    imageUrls: string[];
    limit: number;
    sortBy: SearchSortBy.PRICE_ASC | SearchSortBy.PRICE_DESC;
    category: ProductCategory;
  }): Promise<any> {
    const { imageUrls, limit = 10, sortBy = SearchSortBy.PRICE_ASC, category = ProductCategory.ALL } = opts;
    const filter: any = {};
    const orOperator = imageUrls.map((imageUrl) => {
      return { images: { $regex: imageUrl.split('/').pop(), $options: 'i' } };
    });
    filter.$or = orOperator;
    if (category !== ProductCategory.ALL) {
      filter.category = category;
    }
    const detailedResults = await ProductEntity.find(filter)
      .sort(sortBy === SearchSortBy.PRICE_ASC ? { price: 1 } : { price: -1 })
      .limit(limit)
      .exec();
    const restIdResults = await ProductEntity.find(filter)
      .sort(sortBy === SearchSortBy.PRICE_ASC ? { price: 1 } : { price: -1 })
      .skip(limit)
      .select('_id')
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
    const filter: any = {};
    const orOperator = imageUrls.map((imageUrl) => {
      return { images: { $regex: imageUrl.split('/').pop(), $options: 'i' } };
    });
    filter.$or = orOperator;
    if (category !== ProductCategory.ALL) {
      filter.category = category;
    }

    // Only get first 10 products for detailedResults
    const detailedResults: HydratedDocument<IProductEntity>[] = [];
    while (detailedResults.length < limit || orOperator.length !== 0) {
      const currentFilter = orOperator.shift();
      const currentProduct = await ProductEntity.findOne(currentFilter);
      if (currentProduct && !detailedResults.some((product) => product._id === currentProduct._id)) {
        detailedResults.push(currentProduct);
      }
    }

    // Remove all imageUrls that already have a product in detailResults
    // for (const product of detailedResults) {
    //   for (const imageUrl of product.images) {
    //     imageUrls.
    //   }
    // }

    // const restIdResults: any[] = [];
    // for (const filter of orOperator) {
    //   const currentProduct = await ProductEntity.findOne(filter).select('_id');
    // }
    // const detailedResults = await ProductEntity.find(filter).limit(limit).exec();
    // const restIdResults = await ProductEntity.find(filter).skip(limit).select('_id').exec();
    return {
      detailedResults,
      // restIdResults,
    };
  }
}

export const productService = ProductService.getInstance();
