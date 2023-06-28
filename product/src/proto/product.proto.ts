import mongoose, { HydratedDocument, isObjectIdOrHexString } from 'mongoose';
import { IProductEntity, ProductEntity } from '../modules/products/entities/product.entity';
import * as grpc from '@grpc/grpc-js';
import { SearchSortBy as SearchOrderBy, SearchSortBy } from '../loaders/enums';
import { Product, ProductIds, Products, SearchByImageOptions, SearchResults } from './product_pb';

export async function getProductsByIds(
  call: grpc.ServerUnaryCall<ProductIds, Products>,
  callback: grpc.sendUnaryData<Products>,
) {
  try {
    const productIds = call.request.getIdsList();
    const products: Product[] = [];
    const productListResults = await getProductsByIdList(productIds);
    for (const productEntity of productListResults.products) {
      const product = new Product();
      product.setId(productEntity._id.toString());
      product.setTitle(productEntity.title);
      product.setPrice(productEntity.price);
      product.setCategoriesList(productEntity.categories ?? []);
      product.setImagesList(productEntity.images);
      products.push(product);
    }
    const response = new Products();
    response.setProductsList(products);
    callback(null, response);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function searchByImage(
  call: grpc.ServerUnaryCall<SearchByImageOptions, SearchResults>,
  callback: grpc.sendUnaryData<SearchResults>,
) {
  try {
    // Get request data
    const imageUrls = call.request.getImageurlsList();
    const limit = call.request.getLimit() ?? 10;
    const categories = call.request.getCategoriesList() ?? undefined;
    const orderBy = <SearchOrderBy>(call.request.getOrderby() ?? SearchOrderBy.RELEVANCE);
    const productIds: string[] = getProductIdsFromImageUrls(imageUrls);

    // Filter
    const additionalFilter: any = {};
    if (categories && categories.length > 0) {
      additionalFilter.categories = { $in: categories.map((category) => new RegExp(category, 'i')) };
    }

    // Initialize response
    const searchResults = new SearchResults();
    let products: HydratedDocument<IProductEntity>[] = [];
    const productList: Product[] = [];
    let remainingProductIds: string[] = [];

    switch (orderBy) {
      case SearchOrderBy.PRICE_ASC: {
      }
      case SearchOrderBy.PRICE_DESC: {
        products = await ProductEntity.find({
          _id: { $in: productIds },
          ...additionalFilter,
        })
          .sort(orderBy === SearchOrderBy.PRICE_ASC ? { price: 1 } : { price: -1 })
          .exec();

        remainingProductIds = products.map((product) => product._id.toString()).slice(limit);
        break;
      }
      case SearchOrderBy.RELEVANCE: {
        const orderByRelevanceResult = await getProductsByIdList(productIds, limit, additionalFilter);
        products = orderByRelevanceResult.products;
        remainingProductIds = orderByRelevanceResult.remainingProductIds;
        break;
      }
    }

    // Convert productEntity to Product gRPC message
    for (const productEntity of products.splice(0, limit)) {
      const product = new Product();
      product.setId(productEntity._id.toString());
      product.setTitle(productEntity.title);
      product.setPrice(productEntity.price);
      product.setCategoriesList(productEntity.categories ?? []);
      product.setImagesList(productEntity.images);
      productList.push(product);
    }
    searchResults.setProductsList(productList);
    searchResults.setRemainingproductidsList(remainingProductIds);

    callback(null, searchResults);
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function getProductById(call, callback) {
  if (!isObjectIdOrHexString(call.request.id)) {
    callback({
      message: 'Invalid product id',
      code: grpc.status.INVALID_ARGUMENT,
    });
    return;
  }
  const product = await ProductEntity.findOne({ _id: call.request.id });
  if (product) {
    callback(null, product);
  } else {
    callback({
      message: 'Product not found',
      code: grpc.status.NOT_FOUND,
    });
  }
}

async function getProductsByIdList(idList: string[], limit = -1, additionalFilter: any = {}): Promise<any> {
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

function getProductIdsFromImageUrls(imageUrls: string[]): string[] {
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
