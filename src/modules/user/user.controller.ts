/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { productService } from '../products/product.service';
import { AccountRole } from '../../loaders/enums';
import { BadRequestError, RequestValidator } from '../../common/error-handler';
import { plainToInstance } from 'class-transformer';
import {
  AddProductToWishlistRequest,
  GetWishlistRequest,
  RemoveProductFromWishlistRequest,
  ReportBugRequest,
  UpdateAccountInfoRequest,
} from './dtos/user.dto';
import { checkJwt, checkRole } from '../auth/auth.service';
import { accountService } from '../auth/account.service';
import { wishlistService } from './wishlist.service';
import { bugReportService } from './bug-report.service';
import { routeRolesConfig } from '../../config/route-roles.config';

export const userRouter = Router();

// Add product to wishlist
userRouter.post(
  routeRolesConfig.user.routes.addProductToWishlist.route,
  checkJwt,
  checkRole(routeRolesConfig.user.routes.addProductToWishlist.roles),
  RequestValidator.validate(AddProductToWishlistRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const addProductToWishlist = plainToInstance(AddProductToWishlistRequest, req.body);
    const product = await productService.getProductById(addProductToWishlist.productId);
    if (!product) {
      next(new BadRequestError('Product not found'));
      return;
    }

    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    await wishlistService.addProductToWishlist(addProductToWishlist.productId, account);

    res.status(200).send({
      status: true,
      message: 'Product added to wishlist successfully',
    });
  },
);

// Remove product from wishlist
userRouter.delete(
  routeRolesConfig.user.routes.removeProductFromWishlist.route,
  checkJwt,
  checkRole(routeRolesConfig.user.routes.removeProductFromWishlist.roles),
  RequestValidator.validate(RemoveProductFromWishlistRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const addProductToWishlist = plainToInstance(AddProductToWishlistRequest, req.body);
    const product = await productService.getProductById(addProductToWishlist.productId);
    if (!product) {
      next(new BadRequestError('Product not found'));
      return;
    }

    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    await wishlistService.removeProductFromWishlist(addProductToWishlist.productId, account);

    res.status(200).send({
      status: true,
      message: 'Product removed from wishlist successfully',
    });
  },
);

// Check wishlist existence
userRouter.get(
  routeRolesConfig.user.routes.checkWishlistExistence.route,
  checkJwt,
  checkRole(routeRolesConfig.user.routes.checkWishlistExistence.roles),
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const productId = req.params.productId;
    if (!productId) {
      next(new BadRequestError('Product ID is required'));
      return;
    }

    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    res.status(200).send({
      status: true,
      existed: await wishlistService.checkProductInWishlist(productId, account),
    });
  },
);

// Get wishlist
userRouter.get(
  routeRolesConfig.user.routes.viewWishlist.route,
  checkJwt,
  checkRole(routeRolesConfig.user.routes.viewWishlist.roles),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    const getWishlistRequest = plainToInstance(GetWishlistRequest, req.query);

    const results = await wishlistService.getWishlist({
      account: account,
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
userRouter.get(
  routeRolesConfig.user.routes.viewAccountInfo.route,
  checkJwt,
  checkRole(routeRolesConfig.user.routes.viewAccountInfo.roles),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    res.status(200).send({
      status: true,
      user: {
        username: account.username,
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
        createdAt: account.createdAt,
        lastLogin: account.lastLogin,
        isEmailVerified: account.isEmailVerified,
        status: account.status,
      },
    });
  },
);

// Update account info
userRouter.put(
  routeRolesConfig.user.routes.updateAccountInfo.route,
  checkJwt,
  checkRole(routeRolesConfig.user.routes.updateAccountInfo.roles),
  RequestValidator.validate(UpdateAccountInfoRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    const updateAccountInfo = plainToInstance(UpdateAccountInfoRequest, req.body);

    for (const key in updateAccountInfo) {
      account[key] = updateAccountInfo[key];
    }

    await accountService.saveAccount(account);

    res.status(200).send({
      status: true,
      message: 'Account info updated successfully',
    });
  },
);

// Add new bug report
userRouter.post(
  routeRolesConfig.user.routes.reportBug.route,
  checkJwt,
  checkRole(routeRolesConfig.user.routes.reportBug.roles),
  RequestValidator.validate(ReportBugRequest),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    const bugReportRequest = plainToInstance(ReportBugRequest, req.body);

    await bugReportService.addNewBugReport(bugReportRequest.title, bugReportRequest.content, account);

    res.status(200).send({
      status: true,
      message: 'Bug report sent successfully',
    });
  },
);
