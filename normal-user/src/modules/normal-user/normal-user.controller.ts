/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { Permission } from '../../loaders/enums';
import { RequestValidator } from '../../common/error-handler';
import { plainToInstance } from 'class-transformer';
import {
  AddProductToCollectionRequest,
  CreateCollectionRequest,
  RenameCollectionRequest,
  ReportBugRequest,
  UpdateAccountInfoRequest,
} from './dtos/user.dto';
import { checkJwt, checkPermission } from '../auth/middlewares/auth.middleware';
import { normalUserService } from './normal-user.service';
import { sendResponse } from '../../common/helpers';

export const userRouter = Router();

// Delete a product of a collection
userRouter.delete(
  '/collections/:collectionId/products/:productId',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  async (req: Request, res: Response, next: NextFunction) => {
    const accountId = parseInt(res['locals'].accountId);
    const collectionId = parseInt(req.params.collectionId);
    const productId = req.params.productId;

    const deleteProductInCollectionResults = await normalUserService.deleteProductInCollection(
      productId,
      collectionId,
      accountId,
    );

    sendResponse(deleteProductInCollectionResults, res, next);
  },
);

// Rename a collection
userRouter.put(
  '/collections/:collectionId',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(RenameCollectionRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    const accountId = parseInt(res['locals'].accountId);
    const collectionId = parseInt(req.params.collectionId);
    const renameCollectionRequest = plainToInstance(RenameCollectionRequest, req.body);

    const renameCollectionResults = await normalUserService.renameCollection(
      collectionId,
      renameCollectionRequest.name,
      accountId,
    );

    sendResponse(renameCollectionResults, res, next);
  },
);

// View product in collection
userRouter.get(
  '/collections/:collectionId/products',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  async (req: Request, res: Response, next: NextFunction) => {
    const accountId = parseInt(res['locals'].accountId);
    const collectionId = parseInt(req.params.collectionId);
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const pageNumber = parseInt(req.query.pageNumber as string) || 1;
    console.log(accountId);
    console.log(collectionId);
    console.log(pageSize);
    console.log(pageNumber);

    const viewProductsInCollectionResults = await normalUserService.viewProductsInCollection({
      collectionId: collectionId,
      pageNumber: pageNumber,
      pageSize: pageSize,
      accountId: accountId,
    });
    sendResponse(viewProductsInCollectionResults, res, next);
  },
);

// Get collection list
userRouter.get(
  '/collections',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  async (req: Request, res: Response, next: NextFunction) => {
    const accountId = parseInt(res['locals'].accountId);
    const viewCollectionListResult = await normalUserService.viewCollectionList(accountId);

    sendResponse(viewCollectionListResult, res, next);
  },
);

// Add collection
userRouter.post(
  '/collections',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(CreateCollectionRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    const createCollectionRequest = plainToInstance(CreateCollectionRequest, req.body);
    const accountId = parseInt(res['locals'].accountId);

    const createCollectionResults = await normalUserService.createCollection(createCollectionRequest, accountId);

    sendResponse(createCollectionResults, res, next);
  },
);

// Delete collection
userRouter.delete(
  '/collections/:collectionId',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  async (req: Request, res: Response, next: NextFunction) => {
    const accountId = parseInt(res['locals'].accountId);
    const collectionId = parseInt(req.params.collectionId);

    const deleteCollectionResults = await normalUserService.deleteCollection(collectionId, accountId);

    sendResponse(deleteCollectionResults, res, next);
  },
);

// Add product to collection
userRouter.post(
  '/collections/:collectionId/products',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(AddProductToCollectionRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const addProductToCollectionRequest = plainToInstance(AddProductToCollectionRequest, req.body);
    const collectionId = parseInt(req.params.collectionId);

    const accountId = parseInt(res['locals'].accountId);

    const addProductToCollectionResult = await normalUserService.addProductToCollection(
      addProductToCollectionRequest,
      accountId,
      collectionId,
    );

    sendResponse(addProductToCollectionResult, res, next);
  },
);

// Get account profile
userRouter.get(
  '/profile',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = parseInt(res['locals'].accountId);
    const accountResult = await normalUserService.viewAccountProfile(accountId);

    sendResponse(accountResult, res, next);
  },
);

// Update account info
userRouter.put(
  '/profile',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(UpdateAccountInfoRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = parseInt(res['locals'].accountId);
    const updateAccountInfoRequest = plainToInstance(UpdateAccountInfoRequest, req.body);
    const updateAccountInfoResult = await normalUserService.updateAccountProfile(accountId, updateAccountInfoRequest);

    sendResponse(updateAccountInfoResult, res, next);
  },
);

// Add new bug report
userRouter.post(
  '/bug-report',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(ReportBugRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = parseInt(res['locals'].accountId);
    const bugReportRequest = plainToInstance(ReportBugRequest, req.body);

    const bugReportResult = await normalUserService.addBugReport(bugReportRequest, accountId);

    sendResponse(bugReportResult, res, next);
  },
);
