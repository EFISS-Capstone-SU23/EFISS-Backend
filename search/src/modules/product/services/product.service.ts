import mongoose, { HydratedDocument } from 'mongoose';
import { SearchSortBy } from '../../../loaders/enums';
import { IProductEntity, ProductEntity } from '../entities/product.entity';

export class ProductService {
  constructor() {}

  async getProductsByIdList(idList: string[], limit = -1, additionalFilter: any = {}): Promise<any> {
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
      {
        $addFields: {
          id: '$_id',
        },
      },
    ]).exec();
    return {
      products: limit !== -1 ? products.splice(0, limit) : products,
      remainingProductIds: limit !== -1 ? products.map((product) => product._id.toString()) : [],
    };
  }

  getProductIdsFromImageUrls(imageUrls: string[]): string[] {
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

  async searchByImage(opts: {
    imageUrls: string[];
    limit: number;
    categories: string[] | undefined;
    sortBy: SearchSortBy;
  }) {
    const { imageUrls, limit = 10, categories = undefined, sortBy = SearchSortBy.RELEVANCE } = opts;

    const productIds: string[] = this.getProductIdsFromImageUrls(imageUrls);

    // Filter
    const additionalFilter: any = {};
    if (categories && categories.length > 0) {
      additionalFilter.categories = { $in: categories.map((category) => new RegExp(category, 'i')) };
    }

    let products: HydratedDocument<IProductEntity>[] = [];
    let remainingProductIds: string[] = [];

    switch (sortBy) {
      case SearchSortBy.PRICE_ASC: {
      }
      case SearchSortBy.PRICE_DESC: {
        products = await ProductEntity.find({
          _id: { $in: productIds },
          ...additionalFilter,
        })
          .sort(sortBy === SearchSortBy.PRICE_ASC ? { price: 1 } : { price: -1 })
          .exec();

        remainingProductIds = products.map((product) => product._id.toString()).slice(limit);
        break;
      }
      case SearchSortBy.RELEVANCE: {
        const orderByRelevanceResult = await this.getProductsByIdList(productIds, limit, additionalFilter);
        products = orderByRelevanceResult.products;
        remainingProductIds = orderByRelevanceResult.remainingProductIds;
        break;
      }
    }

    return { products, remainingProductIds };
  }
}

export const productService = new ProductService();
