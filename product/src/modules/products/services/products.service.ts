/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import mongoose, { isObjectIdOrHexString, type HydratedDocument } from 'mongoose';
import { SearchSortBy } from '../../../loaders/enums';
import { IProductEntity, ProductEntity } from '../entities/product.entity';
import { IResponse } from '../../../common/response';
import { msg200, msg404 } from '../../../common/helpers';

export class ProductService {
  constructor() {}

  async getProductByImageUrl(imageUrl: string): Promise<HydratedDocument<IProductEntity> | null> {
    // Get file name and extension only!
    const fileName = imageUrl.split('/').pop();
    return await ProductEntity.findOne({
      images: { $regex: fileName, $options: 'i' },
    });
  }

  async getProductById(id: string): Promise<IResponse> {
    if (!isObjectIdOrHexString(id)) {
      return msg404('Invalid product id');
    }
    const product = await ProductEntity.findOne({ _id: id });

    if (!product) {
      return msg404('Product not found');
    }

    return msg200({
      product,
    });
  }

  async getProductsSortedByPrice(opts: {
    imageUrls: string[];
    limit: number;
    sortBy: SearchSortBy.PRICE_ASC | SearchSortBy.PRICE_DESC;
    categories?: string[];
  }): Promise<any> {
    const { imageUrls, limit = 10, sortBy = SearchSortBy.PRICE_ASC, categories = undefined } = opts;
    const productIds = this.getProductIdsFromImageUrls(imageUrls);

    // Add more conditions here
    const additionalFilter: any = {};
    if (categories && categories.length > 0) {
      additionalFilter.categories = { $in: categories.map((category) => new RegExp(category, 'i')) };
    }

    const products = await ProductEntity.find({ _id: { $in: productIds }, ...additionalFilter })
      .sort(sortBy === SearchSortBy.PRICE_ASC ? { price: 1 } : { price: -1 })
      .exec();

    return {
      products: products.splice(0, limit),
      remainingProductIds: products.map((product) => product._id.toString()),
    };
  }

  // async getProductsSortedByRelevance(opts: {
  //   imageUrls: string[];
  //   limit: number;
  //   categories?: string[];
  // }): Promise<any> {
  //   const { imageUrls, limit = 10, categories = undefined } = opts;
  //   const productIds: string[] = this.getProductIdsFromImageUrls(imageUrls);

  //   // Add more conditions here
  //   const additionalFilter: any = {};
  //   if (categories && categories.length > 0) {
  //     additionalFilter.categories = { $in: categories.map((category) => new RegExp(category, 'i')) };
  //   }

  //   const { products, remainingProductIds } = await this.getProductsByIdList(productIds, limit, additionalFilter);

  //   return {
  //     products,
  //     remainingProductIds,
  //   };
  // }

  async getProductsByIdList(idList: string[], limit = -1, additionalFilter: any = {}): Promise<IResponse> {
    // Validate object id
    for (const id of idList) {
      if (!isObjectIdOrHexString(id)) {
        return msg404('Invalid product id');
      }
    }

    const idObjectList = idList.map((id) => new mongoose.Types.ObjectId(id));
    const products: HydratedDocument<IProductEntity>[] = await ProductEntity.aggregate([
      {
        $match: {
          _id: {
            $in: idObjectList,
          },
          ...additionalFilter,
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

    return msg200({
      products: limit !== -1 ? products.splice(0, limit) : products,
      remainingProductIds: limit !== -1 ? products.map((product) => product._id.toString()) : [],
    });
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

export const productService = new ProductService();
