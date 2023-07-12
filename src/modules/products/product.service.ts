/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import mongoose, { type HydratedDocument } from 'mongoose';
import { type IProductEntity, ProductEntity } from './entities/product.entity';
import { SearchSortBy } from '../../loaders/enums';
import perf from 'execution-time';

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
    categories?: string[];
  }): Promise<any> {
    const { imageUrls, limit = 10, sortBy = SearchSortBy.PRICE_ASC, categories = undefined } = opts;
    const productIds = this.getProductIdsFromImageUrls(imageUrls);

    // Add more conditions here
    const additionalFilter: any = {};
    if (categories && categories.length > 0) {
      additionalFilter.categories = { $in: categories.map((category) => new RegExp(category, 'i')) };
    }

    let products = await ProductEntity.find({ _id: { $in: productIds }, ...additionalFilter })
      .sort(sortBy === SearchSortBy.PRICE_ASC ? { price: 1 } : { price: -1 })
      .exec();

    products = products.splice(0, limit);

    // Move search image url results of product to the top of the list
    for (let i = 0; i < products.length; i++) {
      products[i].images = products[i].images.sort(function (a, b) {
        let index1 = imageUrls.findIndex((imageUrl) => imageUrl.includes(a.split('/').pop() as string));
        let index2 = imageUrls.findIndex((imageUrl) => imageUrl.includes(b.split('/').pop() as string));
        if (index1 === -1) index1 = 999;
        if (index2 === -1) index2 = 999;
        return index1 - index2;
      });
    }
    // Get remaining image urls
    for (const product of products) {
      for (const imageUrl of product.images) {
        const fileName = imageUrl?.split('/')?.pop();
        if (imageUrls.includes(fileName as string)) {
          imageUrls.splice(imageUrls.indexOf(fileName as string), 1);
        }
      }
    }

    return {
      products: products,
      remainingImageUrls: imageUrls,
    };
  }

  async getProductsSortedByRelevance(opts: {
    imageUrls: string[];
    limit: number;
    categories?: string[];
  }): Promise<any> {
    const { imageUrls, limit = 10, categories = undefined } = opts;
    const productIds: string[] = this.getProductIdsFromImageUrls(imageUrls);

    // Add more conditions here
    const additionalFilter: any = {};
    if (categories && categories.length > 0) {
      additionalFilter.categories = { $in: categories.map((category) => new RegExp(category, 'i')) };
    }

    const { products, remainingProductIds } = await this.getProductsByIdList(productIds, limit, additionalFilter);

    const performance = perf();
    // Move search image url results of product to the top of the list
    performance.start();
    for (let i = 0; i < products.length; i++) {
      products[i].images = products[i].images.sort(function (a, b) {
        let index1 = imageUrls.findIndex((imageUrl) => imageUrl.includes(a.split('/').pop() as string));
        let index2 = imageUrls.findIndex((imageUrl) => imageUrl.includes(b.split('/').pop() as string));
        if (index1 === -1) index1 = 999;
        if (index2 === -1) index2 = 999;
        return index1 - index2;
      });
    }
    console.log(
      `[PERFORMANCE] Move search image url results of product to the top of the list: ${performance.stop().time}ms`,
    );

    // Get remaining image urls
    performance.start();
    for (const product of products) {
      for (const imageUrl of product.images) {
        const fileName = imageUrl?.split('/')?.pop();
        if (imageUrls.includes(fileName as string)) {
          imageUrls.splice(imageUrls.indexOf(fileName as string), 1);
        }
      }
    }
    console.log(`[PERFORMANCE] Get remaining image urls: ${performance.stop().time}ms`);
    return {
      products,
      remainingImageUrls: imageUrls,
    };
  }

  async getProductsByIdList(
    idList: string[],
    limit = -1,
    additionalFilter: any = {},
  ): Promise<{ products: HydratedDocument<IProductEntity>[]; remainingProductIds: string[] }> {
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

    return {
      products: limit !== -1 ? products.splice(0, limit) : products,
      remainingProductIds: limit !== -1 ? products.map((product) => product._id.toString()) : [],
    };
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

  async getProductsByImageUrls(imageUrls: string[]): Promise<IProductEntity[]> {
    const productIds = this.getProductIdsFromImageUrls(imageUrls);

    const { products } = await this.getProductsByIdList(productIds);

    // Move search image url results of product to the top of the list
    for (let i = 0; i < products.length; i++) {
      products[i].images = products[i].images.sort(function (a, b) {
        let index1 = imageUrls.findIndex((imageUrl) => imageUrl.includes(a.split('/').pop() as string));
        let index2 = imageUrls.findIndex((imageUrl) => imageUrl.includes(b.split('/').pop() as string));
        if (index1 === -1) index1 = 999;
        if (index2 === -1) index2 = 999;
        return index1 - index2;
      });
    }

    return products;
  }
}

export const productService = ProductService.getInstance();
