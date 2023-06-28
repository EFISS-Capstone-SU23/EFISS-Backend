import mongoose, { HydratedDocument, isObjectIdOrHexString } from 'mongoose';
import { IProductEntity, ProductEntity } from '../modules/products/entities/product.entity';
import * as grpc from '@grpc/grpc-js';
import { SearchSortBy } from '../loaders/enums';

export async function getProductsOrderByPrice(call, callback) {
  try {
    const { imageUrls, limit = 10, sortBy = SearchSortBy.PRICE_ASC, categories = undefined } = call.request;
    const productIds: string[] = getProductIdsFromImageUrls(imageUrls);

    // Filter
    const additionalFilter: any = {};
    if (categories && categories.length > 0) {
      additionalFilter.categories = { $in: categories.map((category) => new RegExp(category, 'i')) };
    }

    const products = await ProductEntity.find({ _id: { $in: productIds }, ...additionalFilter })
      .sort(sortBy === SearchSortBy.PRICE_ASC ? { price: 1 } : { price: -1 })
      .exec();
    callback(null, {
      products: products.splice(0, limit),
      remainingProductIds: products.map((product) => product._id.toString()),
    });
  } catch (err) {
    callback({
      message: (err as Error).message,
      code: grpc.status.INTERNAL,
    });
  }
}

export async function getProductsOrderByRelevance(call, callback) {
  try {
    const { imageUrls, limit = 10, categories = undefined } = call.request;
    const productIds: string[] = getProductIdsFromImageUrls(imageUrls);

    // Filter
    const additionalFilter: any = {};
    if (categories && categories.length > 0) {
      additionalFilter.categories = { $in: categories.map((category) => new RegExp(category, 'i')) };
    }

    const { products, remainingProductIds } = await getProductsByIdList(productIds, limit, additionalFilter);

    callback(null, {
      products,
      remainingProductIds,
    });
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
  console.log(products);
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
