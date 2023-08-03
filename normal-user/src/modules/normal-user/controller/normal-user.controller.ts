import { Router, type Request, type Response, NextFunction } from 'express';
import { Permission } from '../../../loaders/enums';
import { RequestValidator } from '../../../common/error-handler';
import { plainToInstance } from 'class-transformer';
import {
  AddProductToCollectionRequestDto,
  CreateCollectionRequestDto,
  RenameCollectionRequestDto,
  ReportBugRequestDto,
  UpdateAccountInfoRequestDto,
} from '../dtos/user.dto';
import { checkJwt, checkPermission } from '../../auth/middlewares/auth.middleware';
import { normalUserService } from '../services/normal-user.service';
import { sendResponse } from '../../../common/helpers';

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

    const deleteProductInCollectionResults = await normalUserService.deleteProductInCollectionResponse(
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
  RequestValidator.validate(RenameCollectionRequestDto),
  async (req: Request, res: Response, next: NextFunction) => {
    const accountId = parseInt(res['locals'].accountId);
    const collectionId = parseInt(req.params.collectionId);
    const renameCollectionRequest = plainToInstance(RenameCollectionRequestDto, req.body);

    const renameCollectionResults = await normalUserService.renameCollectionResponse(
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

    const viewProductsInCollectionResults = await normalUserService.viewProductsInCollectionResponse({
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
    const viewCollectionListResult = await normalUserService.viewCollectionListResponse(accountId);

    sendResponse(viewCollectionListResult, res, next);
  },
);

// Add collection
userRouter.post(
  '/collections',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(CreateCollectionRequestDto),
  async (req: Request, res: Response, next: NextFunction) => {
    const createCollectionRequest = plainToInstance(CreateCollectionRequestDto, req.body);
    const accountId = parseInt(res['locals'].accountId);

    const createCollectionResults = await normalUserService.createCollectionResponse(
      createCollectionRequest,
      accountId,
    );

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

    const deleteCollectionResults = await normalUserService.deleteCollectionResponse(collectionId, accountId);

    sendResponse(deleteCollectionResults, res, next);
  },
);

// Add product to collection
userRouter.post(
  '/collections/:collectionId/products',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(AddProductToCollectionRequestDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const addProductToCollectionRequest = plainToInstance(AddProductToCollectionRequestDto, req.body);
    const collectionId = parseInt(req.params.collectionId);

    const accountId = parseInt(res['locals'].accountId);

    const addProductToCollectionResult = await normalUserService.addProductToCollectionResponse(
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
    const accountResult = await normalUserService.viewAccountProfileResponse(accountId);

    sendResponse(accountResult, res, next);
  },
);

// Update account info
userRouter.put(
  '/profile',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(UpdateAccountInfoRequestDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = parseInt(res['locals'].accountId);
    const updateAccountInfoRequest = plainToInstance(UpdateAccountInfoRequestDto, req.body);
    const updateAccountInfoResult = await normalUserService.updateAccountProfileResponse(
      accountId,
      updateAccountInfoRequest,
    );

    sendResponse(updateAccountInfoResult, res, next);
  },
);

// Add new bug report
userRouter.post(
  '/bug-report',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(ReportBugRequestDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = parseInt(res['locals'].accountId);
    const bugReportRequest = plainToInstance(ReportBugRequestDto, req.body);

    const bugReportResult = await normalUserService.addBugReportResponse(bugReportRequest, accountId);

    sendResponse(bugReportResult, res, next);
  },
);
