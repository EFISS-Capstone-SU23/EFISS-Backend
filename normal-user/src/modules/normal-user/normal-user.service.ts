import { msg200, msg400 } from '../../common/helpers';
import { IResponse } from '../../common/response';
import { productService } from '../product/services/product.service';
import { collectionService } from './collection.service';
import { AddProductToCollectionRequest, CreateCollectionRequest } from './dtos/user.dto';

export class NormalUserService {
  constructor() {}

  async renameCollection(collectionId: number, newName: string, accountId: number) {
    if (!(await collectionService.isCollectionExisted(collectionId, accountId))) {
      return msg400('Collection does not exist');
    }

    if (await collectionService.isCollectionNameAlreadyExisted(newName, accountId)) {
      return msg400('Collection name already exists');
    }

    collectionService.renameCollection(collectionId, newName);

    return msg200({
      message: 'Renamed collection successfully!',
    });
  }

  async deleteProductInCollection(productId: string, collectionId: number, accountId: number) {
    if (!(await collectionService.isCollectionExisted(collectionId, accountId))) {
      return msg400('Collection does not exist');
    }

    if (!(await collectionService.isProductAlreadyInCollection(productId, collectionId))) {
      return msg400('Product does not exist in collection');
    }

    collectionService.deleteProductInCollection(productId, collectionId);

    return msg200({
      message: 'Deleted product in collection successfully!',
    });
  }

  async viewProductsInCollection(collectionId: number, accountId: number) {
    if (!(await collectionService.isCollectionExisted(collectionId, accountId))) {
      return msg400('Collection does not exist');
    }
    const products = await collectionService.viewProductsInCollection(collectionId);
    return msg200({
      products: (products as any)?.productsList,
    });
  }

  async deleteCollection(collectionId: number, accountId: number) {
    if (!(await collectionService.isCollectionExisted(collectionId, accountId))) {
      return msg400('Collection does not exist');
    }

    collectionService.deleteCollection(collectionId, accountId);

    return msg200({
      message: 'Deleted collection successfully!',
    });
  }

  async viewCollectionList(accountId: number): Promise<IResponse> {
    const collections = await collectionService.viewCollectionList(accountId);
    return msg200({
      collections: collections,
    });
  }

  async createCollection(createCollectionRequest: CreateCollectionRequest, accountId: number): Promise<IResponse> {
    // Check for name existence in collection
    if (await collectionService.isCollectionNameAlreadyExisted(createCollectionRequest.collectionName, accountId)) {
      return msg400('Collection name already exists');
    }

    collectionService.createCollection(createCollectionRequest.collectionName, accountId);
    return msg200({
      message: 'Created collection successfully!',
    });
  }

  async addProductToCollection(
    addProductToCollectionRequest: AddProductToCollectionRequest,
    accountId: number,
    collectionId: number,
  ): Promise<IResponse> {
    const collection = await collectionService.getCollectionById(collectionId);
    if (!collection) {
      return msg400('Collection not found');
    }

    if (collection.accountId !== accountId) {
      return msg400('You do not have permission to add product to this collection');
    }

    // Check for product existence
    let product: any;
    try {
      product = await productService.getProductsByIds([addProductToCollectionRequest.productId]);
    } catch {}
    if (!product || product?.length == 0) {
      return msg400('Product not found');
    }

    // Check for product existence in collection
    if (await collectionService.isProductAlreadyInCollection(addProductToCollectionRequest.productId, collectionId)) {
      return msg400('Product already in collection');
    }

    // Add product to collection
    collectionService.addProductToCollection(addProductToCollectionRequest.productId, collectionId, accountId);

    return msg200({
      message: 'Product added to collection successfully',
    });
  }
}

export const normalUserService = new NormalUserService();
