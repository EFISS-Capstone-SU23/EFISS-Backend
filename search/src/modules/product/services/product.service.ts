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

  sortProductImagesByImageUrls(imageUrls: string[], products: IProductEntity[]): IProductEntity[] {
    // Get a copy of products
    const productsCopy = [...products];

    for (let i = 0; i < productsCopy.length; i++) {
      productsCopy[i].images = productsCopy[i].images.sort(function (a, b) {
        let index1 = imageUrls.findIndex((imageUrl) => imageUrl.includes(a.split('/').pop() as string));
        let index2 = imageUrls.findIndex((imageUrl) => imageUrl.includes(b.split('/').pop() as string));
        if (index1 === -1) index1 = 999;
        if (index2 === -1) index2 = 999;
        return index1 - index2;
      });
    }
    return productsCopy;
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

    let products: IProductEntity[] = [];
    // let remainingProductIds: string[] = [];

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

        // remainingProductIds = products.map((product) => product._id.toString()).slice(limit);
        break;
      }
      case SearchSortBy.RELEVANCE: {
        const orderByRelevanceResult = await this.getProductsByIdList(productIds, limit, additionalFilter);
        products = orderByRelevanceResult.products;
        // remainingProductIds = orderByRelevanceResult.remainingProductIds;
        break;
      }
    }

    products = this.sortProductImagesByImageUrls(imageUrls, products);

    // Get remaining image urls
    for (const product of products) {
      for (const imageUrl of product.images) {
        const fileName = imageUrl?.split('/')?.pop();
        const index = imageUrls.findIndex((url) => url.includes(fileName as string));
        if (index == -1) continue;
        imageUrls.splice(index, 1);
      }
    }

    return { products, remainingImageUrls: imageUrls };
  }

  async searchByText(opts: { query: string; pageSize?: number; pageNumber?: number }): Promise<{
    products: IProductEntity[];
    totalPages: number;
    totalProducts: number;
    pageNumber: number;
  }> {
    const { query, pageSize = 10, pageNumber = 1 } = opts;

    const totalProducts = await ProductEntity.countDocuments({
      $text: { $search: query, $caseSensitive: false },
    });
    const totalPages = Math.ceil(totalProducts / pageSize);
    const products = await ProductEntity.find({
      $text: { $search: query, $caseSensitive: false },
    })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    return { products, totalPages, totalProducts, pageNumber };
  }
}

export const productService = new ProductService();
