/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import mongoose, { isObjectIdOrHexString, type HydratedDocument } from 'mongoose';
import { SearchSortBy } from '../../../loaders/enums';
import { IProductEntity, ProductEntity } from '../entities/product.entity';
import { IResponse } from '../../../common/response';
import { msg200, msg404 } from '../../../common/helpers';
import {
  GetProductListByIdListRequestDto,
  GetProductListByImageUrlsDto,
  GetRecommendedProductsBySearchHistoryDto,
} from '../dtos/product.dto';
import _ from 'lodash';

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

  getProductIdsFromImageUrls(imageUrls: string[]): string[] {
    const productIds = new Set<string>();
    for (const imageUrl of imageUrls) {
      const fileName = imageUrl?.split('/')?.pop();
      const productId = fileName?.split('_')?.[0];
      if (productId && !productIds.has(productId)) {
        productIds.add(productId);
      }
    }
    return Array.from(productIds);
  }

  async getRecommendedProductsBySearchHistory(
    getRecommendedProductsBySearchHistory: GetRecommendedProductsBySearchHistoryDto,
  ): Promise<IResponse> {
    // Get all categories, shopNames from search history
    const categories: string[] = [];
    const shopNames: string[] = [];
    for (const searchHistory of getRecommendedProductsBySearchHistory.searchHistories) {
      if (searchHistory?.categories && searchHistory?.categories?.length > 0) {
        categories.push(...(searchHistory.categories as string[]));
      }
      if (searchHistory?.shopName) {
        shopNames.push(searchHistory.shopName);
      }
    }

    // Sort categories, shopNames by frequencies
    const sortedCategoriesByFrequencies = _.chain(categories).countBy().toPairs().sortBy(1).reverse().map(0).value();
    const sortedShopNamesByFrequencies = _.chain(shopNames).countBy().toPairs().sortBy(1).reverse().map(0).value();

    // Get top 20%
    const topCategories = sortedCategoriesByFrequencies.splice(
      0,
      Math.ceil(sortedCategoriesByFrequencies.length * 0.2),
    );
    const topShopNames = sortedShopNamesByFrequencies.splice(0, Math.ceil(sortedShopNamesByFrequencies.length * 0.2));

    // Filter
    const productFilter: any = {};
    if (topCategories.length > 0) {
      productFilter.categories = {
        $in: topCategories,
      };
    }
    if (topShopNames.length > 0) {
      productFilter.shopName = {
        $in: topShopNames,
      };
    }

    const products = await ProductEntity.find(productFilter)
      .skip(
        (getRecommendedProductsBySearchHistory.pageNumber ?? 1 - 1) *
          (getRecommendedProductsBySearchHistory.pageSize ?? 10),
      )
      .limit(getRecommendedProductsBySearchHistory.pageSize ?? 10);
    const totalItems = await ProductEntity.countDocuments(productFilter);
    const totalPages = Math.ceil(totalItems / (getRecommendedProductsBySearchHistory.pageSize ?? 10));

    return msg200({
      products: products,
      totalItems: totalItems,
      totalPages: totalPages,
      pageNumber: getRecommendedProductsBySearchHistory.pageNumber ?? 1,
    });
  }

  async getProductsByImageUrls(getProductListByImageUrls: GetProductListByImageUrlsDto): Promise<IResponse> {
    const productIds = this.getProductIdsFromImageUrls(getProductListByImageUrls.imageUrls);

    // Validate object id
    for (const id of productIds) {
      if (!isObjectIdOrHexString(id)) {
        return msg404('Invalid product id');
      }
    }

    const idObjectList = productIds.map((id) => new mongoose.Types.ObjectId(id));
    const products: HydratedDocument<IProductEntity>[] = await ProductEntity.aggregate([
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

    // Move search image url results of product to the top of the list
    const sortedProducts = await this.sortProductImagesByImageUrl(getProductListByImageUrls.imageUrls, products);
    const returnProducts = getProductListByImageUrls.limit
      ? sortedProducts.splice(0, getProductListByImageUrls.limit)
      : sortedProducts;

    // Get remaining image urls
    for (const product of returnProducts) {
      for (const imageUrl of product.images) {
        const fileName = imageUrl?.split('/')?.pop()?.split('.')[0];
        const index = getProductListByImageUrls.imageUrls.findIndex((url) => url.includes(fileName as string));
        if (index == -1) continue;
        getProductListByImageUrls.imageUrls.splice(index, 1);
      }
    }
    return msg200({
      products: returnProducts,
      remainingImageUrls: getProductListByImageUrls.imageUrls,
    });
  }

  async sortProductImagesByImageUrl(imageUrls: string[], products: IProductEntity[]): Promise<IProductEntity[]> {
    // Get a copy of products
    const copyProducts = products.map((product) => product);

    for (let i = 0; i < copyProducts.length; i++) {
      copyProducts[i].images = copyProducts[i].images.sort(function (a, b) {
        let index1 = imageUrls.findIndex((imageUrl) => imageUrl.includes(a.split('/').pop()?.split('.')[0] as string));
        let index2 = imageUrls.findIndex((imageUrl) => imageUrl.includes(b.split('/').pop()?.split('.')[0] as string));
        if (index1 === -1) index1 = 999;
        if (index2 === -1) index2 = 999;
        return index1 - index2;
      });
    }

    return copyProducts;
  }

  async insertProduct(product: IProductEntity): Promise<IResponse> {
    const newProduct = new ProductEntity(product);
    await newProduct.save();
    return msg200({
      product: newProduct,
    });
  }

  async updateProductById(id: string, product: IProductEntity): Promise<IResponse> {
    const update = {
      $set: product,
    };
    const updatedProduct = await ProductEntity.findOneAndUpdate({ _id: id }, update, { new: true });
    if (!updatedProduct) {
      return msg404('Product not found');
    }
    return msg200({
      product: updatedProduct,
    });
  }

  async getDownloadedProductURL(domain: string): Promise<IResponse> {
    const query = {
      url: {
        $regex: `^https?://${domain}`,
      },
    };

    const products = await ProductEntity.find(query);
    const downloadedURL = {};

    products.forEach((product) => {
      downloadedURL[product.url] = true;
    });

    return msg200({
      downloadedURL: downloadedURL,
    });
  }

  async deleteProductById(id: string): Promise<IResponse> {
    const deletedProduct = await ProductEntity.findOneAndDelete({ _id: id });
    if (!deletedProduct) {
      return msg404('Product not found');
    }
    return msg200({
      deletedProduct: deletedProduct,
    });
  }

  async getProductList(page = 1, pageSize = 20, searchQuery = {}): Promise<IResponse> {
    const skip = (page - 1) * pageSize;

    const sort = {
      createdAt: -1,
    };
    const projection = {
      description: 0,
      metadata: 0,
      images: 0,
      categories: 0,
      activeImageMap: 0,
      crawlId: 0,
    };

    const products = await ProductEntity.find(searchQuery, projection, {
      skip,
      limit: pageSize,
      sort,
    });

    const total = await ProductEntity.countDocuments(searchQuery);

    return msg200({
      data: products,
      total,
      page,
      hasNext: page * pageSize < total,
    });
  }

  async setActiveForImage(id: number, imageIndex: number, active: boolean): Promise<IResponse> {
    const product = await ProductEntity.findById(id);

    if (!product) {
      return msg404('Product not found');
    }

    const activeImageMap = product.activeImageMap || [];
    if (imageIndex >= activeImageMap.length) {
      return msg404('Image not found');
    }

    activeImageMap[imageIndex] = active;

    // Update product
    const update = {
      $set: {
        activeImageMap,
      },
    };

    const productUpdated = await ProductEntity.findOneAndUpdate({ _id: id }, update, { new: true });

    return msg200({
      product: productUpdated,
    });
  }

  async countNumberOfProducts(): Promise<IResponse> {
    const numberOfProducts = await ProductEntity.countDocuments();
    return msg200({
      numberOfProducts: numberOfProducts,
    });
  }

  async countNumberOfImages(): Promise<IResponse> {
    const res = await ProductEntity.aggregate([
      {
        $project: {
          numberOfImages: { $size: '$images' },
        },
      },
      {
        $group: {
          _id: null,
          totalImages: { $sum: '$numberOfImages' },
        },
      },
    ]);

    return msg200({
      totalImages: res[0]?.totalImages ?? 0,
    });
  }
}

export const productService = new ProductService();
