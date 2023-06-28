/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { AccountRole, Permission } from '../../loaders/enums';
import { BadRequestError, RequestValidator } from '../../common/error-handler';
import { plainToInstance } from 'class-transformer';
import {
  AddProductToWishlistRequest,
  GetWishlistRequest,
  RemoveProductFromWishlistRequest,
  ReportBugRequest,
  UpdateAccountInfoRequest,
} from './dtos/user.dto';
import { wishlistService } from './wishlist.service';
import { bugReportService } from './bug-report.service';
import { productService } from '../product/services/product.service';
import { checkJwt, checkPermission } from '../auth/middlewares/auth.middleware';

export const userRouter = Router();

// Add product to wishlist
userRouter.post(
  '/wishlist',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(AddProductToWishlistRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const addProductToWishlist = plainToInstance(AddProductToWishlistRequest, req.body);
    // const product = await productService.getProductById(addProductToWishlist.productId);
    // if (!product) {
    //   next(new BadRequestError('Product not found'));
    //   return;
    // }

    const accountId = parseInt(res['locals'].accountId);

    await wishlistService.addProductToWishlist(addProductToWishlist.productId, accountId);

    res.status(200).send({
      status: true,
      message: 'Product added to wishlist successfully',
    });
  },
);

// Remove product from wishlist
userRouter.delete(
  '/wishlist',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  RequestValidator.validate(RemoveProductFromWishlistRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const addProductToWishlist = plainToInstance(AddProductToWishlistRequest, req.body);
    // const product = await productService.getProductById(addProductToWishlist.productId);
    // if (!product) {
    //   next(new BadRequestError('Product not found'));
    //   return;
    // }

    const accountId = parseInt(res['locals'].accountId);
    // const account = await accountService.getAccountByUsername(accountUsername);
    // if (!account) {
    //   next(new BadRequestError('Account not found'));
    //   return;
    // }

    await wishlistService.removeProductFromWishlist(addProductToWishlist.productId, accountId);

    res.status(200).send({
      status: true,
      message: 'Product removed from wishlist successfully',
    });
  },
);

// Check wishlist existence
userRouter.get(
  '/wishlist/:productId',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const productId = req.params.productId;
    if (!productId) {
      next(new BadRequestError('Product ID is required'));
      return;
    }

    const accountId = parseInt(res['locals'].accountId);
    // const account = await accountService.getAccountByUsername(accountId);
    // if (!account) {
    //   next(new BadRequestError('Account not found'));
    //   return;
    // }

    res.status(200).send({
      status: true,
      existed: await wishlistService.checkProductInWishlist(productId, accountId),
    });
  },
);

// Get wishlist
userRouter.get(
  '/wishlist',
  checkJwt,
  checkPermission(Permission.BASIC_NORMAL_USER_OPS),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = res['locals'].accountId;
    // const account = await accountService.getAccountByUsername(accountUsername);
    // if (!account) {
    //   next(new BadRequestError('Account not found'));
    //   return;
    // }

    const getWishlistRequest = plainToInstance(GetWishlistRequest, req.query);

    const results = await wishlistService.getWishlist({
      accountId: accountId,
      pageNumber: getWishlistRequest.pageNumber ?? 1,
      pageSize: getWishlistRequest.pageSize ?? 10,
    });

    res.status(200).send({
      status: true,
      products: results.products,
      pageNumber: results.pageNumber,
      totalPages: results.totalPages,
      pageSize: results.pageSize,
      totalItems: results.totalItems,
    });
  },
);

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
