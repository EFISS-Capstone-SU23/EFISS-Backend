/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import mongoose, { isObjectIdOrHexString, type HydratedDocument } from 'mongoose';
import { SearchSortBy } from '../../../loaders/enums';
import { IProductEntity, ProductEntity } from '../entities/product.entity';
import { IResponse } from '../../../common/response';
import { msg200, msg404 } from '../../../common/helpers';
import {
  GetProductListByIdListRequestDto,
  GetProductListByImageUrls,
  GetRecommendedProductsBySearchHistory,
} from '../dtos/products.dto';
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

  async getRecommendedProductsBySearchHistory(
    getRecommendedProductsBySearchHistory: GetRecommendedProductsBySearchHistory,
  ): Promise<IResponse> {
    // Get all categories, groups from search history
    const categories: string[] = [];
    const groups: string[] = [];
    for (const searchHistory of getRecommendedProductsBySearchHistory.searchHistories) {
      if (searchHistory?.categories && searchHistory?.categories?.length > 0) {
        categories.push(...(searchHistory.categories as string[]));
      }
      if (searchHistory?.group) {
        groups.push(searchHistory.group);
      }
    }

    // Sort categories, groups by frequencies
    const sortedCategoriesByFrequencies = _.chain(categories).countBy().toPairs().sortBy(1).reverse().map(0).value();
    const sortedGroupsByFrequencies = _.chain(groups).countBy().toPairs().sortBy(1).reverse().map(0).value();

    // Get top 20%
    const topCategories = sortedCategoriesByFrequencies.splice(
      0,
      Math.ceil(sortedCategoriesByFrequencies.length * 0.2),
    );
    const topGroups = sortedGroupsByFrequencies.splice(0, Math.ceil(sortedGroupsByFrequencies.length * 0.2));

    // Filter
    const productFilter: any = {};
    if (topCategories.length > 0) {
      productFilter.categories = {
        $in: topCategories,
      };
    }
    if (topGroups.length > 0) {
      productFilter.group = {
        $in: topGroups,
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

  async getProductsByImageUrls(getProductListByImageUrls: GetProductListByImageUrls): Promise<IResponse> {
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
      : products;

    // Get remaining image urls
    for (const product of returnProducts) {
      for (const imageUrl of product.images) {
        const fileName = imageUrl?.split('/')?.pop();
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
        let index1 = imageUrls.findIndex((imageUrl) => imageUrl.includes(a.split('/').pop() as string));
        let index2 = imageUrls.findIndex((imageUrl) => imageUrl.includes(b.split('/').pop() as string));
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
    }
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
}

export const productService = new ProductService();
