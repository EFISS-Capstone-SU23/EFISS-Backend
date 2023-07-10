/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { AccountRole, Permission } from '../../loaders/enums';
import { BadRequestError, RequestValidator } from '../../common/error-handler';
import { plainToInstance } from 'class-transformer';
import {
  AddProductToCollectionRequest,
  AddProductToWishlistRequest,
  CreateCollectionRequest,
  GetWishlistRequest,
  RemoveProductFromWishlistRequest,
  RenameCollectionRequest,
  ReportBugRequest,
  UpdateAccountInfoRequest,
} from './dtos/user.dto';
// import { wishlistService } from './wishlist.service';
import { bugReportService } from './bug-report.service';
import { productService } from '../product/services/product.service';
import { checkJwt, checkPermission } from '../auth/middlewares/auth.middleware';
import { normalUserService } from './normal-user.service';
import { sendResponse } from '../../common/helpers';
import { collectionService } from './collection.service';

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

    const viewProductsInCollectionResults = await normalUserService.viewProductsInCollection(collectionId, accountId);
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

// Add product to wishlist
// userRouter.post(
//   '/wishlist',
//   checkJwt,
//   checkPermission(Permission.BASIC_NORMAL_USER_OPS),
//   RequestValidator.validate(AddProductToWishlistRequest),
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const addProductToWishlist = plainToInstance(AddProductToWishlistRequest, req.body);
//     // const product = await productService.getProductById(addProductToWishlist.productId);
//     // if (!product) {
//     //   next(new BadRequestError('Product not found'));
//     //   return;
//     // }

//     const accountId = parseInt(res['locals'].accountId);

//     await wishlistService.addProductToWishlist(addProductToWishlist.productId, accountId);

//     res.status(200).send({
//       status: true,
//       message: 'Product added to wishlist successfully',
//     });
//   },
// );

// Remove product from wishlist
// userRouter.delete(
//   '/wishlist',
//   checkJwt,
//   checkPermission(Permission.BASIC_NORMAL_USER_OPS),
//   RequestValidator.validate(RemoveProductFromWishlistRequest),
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const addProductToWishlist = plainToInstance(AddProductToWishlistRequest, req.body);
//     // const product = await productService.getProductById(addProductToWishlist.productId);
//     // if (!product) {
//     //   next(new BadRequestError('Product not found'));
//     //   return;
//     // }

//     const accountId = parseInt(res['locals'].accountId);
//     // const account = await accountService.getAccountByUsername(accountUsername);
//     // if (!account) {
//     //   next(new BadRequestError('Account not found'));
//     //   return;
//     // }

//     await wishlistService.removeProductFromWishlist(addProductToWishlist.productId, accountId);

//     res.status(200).send({
//       status: true,
//       message: 'Product removed from wishlist successfully',
//     });
//   },
// );

// Check wishlist existence
// userRouter.get(
//   '/wishlist/:productId',
//   checkJwt,
//   checkPermission(Permission.BASIC_NORMAL_USER_OPS),
//   async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//     const productId = req.params.productId;
//     if (!productId) {
//       next(new BadRequestError('Product ID is required'));
//       return;
//     }

//     const accountId = parseInt(res['locals'].accountId);
//     // const account = await accountService.getAccountByUsername(accountId);
//     // if (!account) {
//     //   next(new BadRequestError('Account not found'));
//     //   return;
//     // }

//     res.status(200).send({
//       status: true,
//       existed: await wishlistService.checkProductInWishlist(productId, accountId),
//     });
//   },
// );

// Get wishlist
// userRouter.get(
//   '/wishlist',
//   checkJwt,
//   checkPermission(Permission.BASIC_NORMAL_USER_OPS),
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const accountId = res['locals'].accountId;
//     // const account = await accountService.getAccountByUsername(accountUsername);
//     // if (!account) {
//     //   next(new BadRequestError('Account not found'));
//     //   return;
//     // }

//     const getWishlistRequest = plainToInstance(GetWishlistRequest, req.query);

//     const results = await wishlistService.getWishlist({
//       accountId: accountId,
//       pageNumber: getWishlistRequest.pageNumber ?? 1,
//       pageSize: getWishlistRequest.pageSize ?? 10,
//     });

//     res.status(200).send({
//       status: true,
//       products: results.products,
//       pageNumber: results.pageNumber,
//       totalPages: results.totalPages,
//       pageSize: results.pageSize,
//       totalItems: results.totalItems,
//     });
//   },
// );

// Get account info
// userRouter.get(
//   '/profile',
//   checkJwt,
//   checkRole([AccountRole.USER]),
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const accountUsername = res['locals'].username;
//     const account = await accountService.getAccountByUsername(accountUsername);
//     if (!account) {
//       next(new BadRequestError('Account not found'));
//       return;
//     }

//     res.status(200).send({
//       status: true,
//       user: {
//         username: account.username,
//         email: account.email,
//         firstName: account.firstName,
//         lastName: account.lastName,
//         createdAt: account.createdAt,
//         lastLogin: account.lastLogin,
//         isEmailVerified: account.isEmailVerified,
//         status: account.status,
//       },
//     });
//   },
// );

// Update account info
// userRouter.put(
//   '/profile',
//   checkJwt,
//   checkRole([AccountRole.USER]),
//   RequestValidator.validate(UpdateAccountInfoRequest),
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const accountUsername = res['locals'].username;
//     const account = await accountService.getAccountByUsername(accountUsername);
//     if (!account) {
//       next(new BadRequestError('Account not found'));
//       return;
//     }

//     const updateAccountInfo = plainToInstance(UpdateAccountInfoRequest, req.body);

//     for (const key in updateAccountInfo) {
//       account[key] = updateAccountInfo[key];
//     }

//     await accountService.saveAccount(account);

//     res.status(200).send({
//       status: true,
//       message: 'Account info updated successfully',
//     });
//   },
// );

// Add new bug report
userRouter.post(
  '/bug-report',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(ReportBugRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = res['locals'].accountId;
    // const account = await accountService.getAccountByUsername(accountUsername);
    // if (!account) {
    //   next(new BadRequestError('Account not found'));
    //   return;
    // }

    const bugReportRequest = plainToInstance(ReportBugRequest, req.body);

    await bugReportService.addNewBugReport(bugReportRequest.title, bugReportRequest.content, accountId);

    res.status(200).send({
      status: true,
      message: 'Bug report sent successfully',
    });
  },
);
