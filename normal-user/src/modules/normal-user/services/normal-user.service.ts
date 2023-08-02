import { msg200, msg400 } from '../../../common/helpers';
import { IResponse } from '../../../common/response';
import { authServiceGrpcClient } from '../../auth/grpc/auth.grpc-client';
import { productServiceGrpcClient } from '../../product/grpc/product.grpc-client';
import { bugReportService } from './bug-report.service';
import { collectionService } from './collection.service';
import {
  AddProductToCollectionRequestDto,
  CreateCollectionRequestDto,
  ReportBugRequestDto,
  UpdateAccountInfoRequestDto,
} from '../dtos/user.dto';

export class NormalUserService {
  constructor() {}

  async renameCollectionResponse(collectionId: number, newName: string, accountId: number) {
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

  async deleteProductInCollectionResponse(productId: string, collectionId: number, accountId: number) {
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

  async viewProductsInCollectionResponse(opts: {
    collectionId: number;
    pageNumber: number;
    pageSize: number;
    accountId: number;
  }) {
    const { collectionId, pageNumber = 1, pageSize = 10, accountId } = opts;
    if (!(await collectionService.isCollectionExisted(collectionId, accountId))) {
      return msg400('Collection does not exist');
    }
    const products = await collectionService.viewProductsInCollection({
      collectionId: collectionId,
      pageNumber: pageNumber,
      pageSize: pageSize,
    });
    return msg200({
      products: (products as any)?.products,
      totalPages: (products as any)?.totalPages,
      pageSize: (products as any)?.pageSize,
      totalItems: (products as any)?.totalItems,
      pageNumber: (products as any)?.pageNumber,
    });
  }

  async deleteCollectionResponse(collectionId: number, accountId: number) {
    if (!(await collectionService.isCollectionExisted(collectionId, accountId))) {
      return msg400('Collection does not exist');
    }

    collectionService.deleteCollection(collectionId, accountId);

    return msg200({
      message: 'Deleted collection successfully!',
    });
  }

  async viewCollectionListResponse(accountId: number): Promise<IResponse> {
    const collections = await collectionService.viewCollectionList(accountId);
    return msg200({
      collections: collections,
    });
  }

  async createCollectionResponse(
    createCollectionRequest: CreateCollectionRequestDto,
    accountId: number,
  ): Promise<IResponse> {
    // Check for name existence in collection
    if (await collectionService.isCollectionNameAlreadyExisted(createCollectionRequest.collectionName, accountId)) {
      return msg400('Collection name already exists');
    }

    collectionService.createCollection(createCollectionRequest.collectionName, accountId);
    return msg200({
      message: 'Created collection successfully!',
    });
  }

  async addProductToCollectionResponse(
    addProductToCollectionRequest: AddProductToCollectionRequestDto,
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
      product = await productServiceGrpcClient.getProductsByIds([addProductToCollectionRequest.productId]);
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

  async viewAccountProfileResponse(accountId: number): Promise<IResponse> {
    const account = await authServiceGrpcClient.viewAccountInformation(accountId);
    return msg200({
      account: account,
    });
  }

  async updateAccountProfileResponse(
    accountId: number,
    updateAccountProfileRequest: UpdateAccountInfoRequestDto,
  ): Promise<IResponse> {
    const response = await authServiceGrpcClient.updateAccountInformation(
      accountId,
      updateAccountProfileRequest.firstName,
      updateAccountProfileRequest.lastName,
    );
    if ((response as any)?.error) {
      return msg400((response as any)?.error);
    } else {
      return msg200({
        message: (response as any).message,
      });
    }
  }

  async addBugReportResponse(bugReportRequest: ReportBugRequestDto, accountId: number): Promise<IResponse> {
    await bugReportService.addNewBugReport(bugReportRequest.title, bugReportRequest.content, accountId);
    return msg200({
      message: 'Added bug report successfully!',
    });
  }
}

export const normalUserService = new NormalUserService();
