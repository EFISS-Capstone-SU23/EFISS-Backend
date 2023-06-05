/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { productService } from '../products/product.service';
import { AccountRole } from '../../loaders/enums';
import { BadRequestError, RequestValidator } from '../../common/error-handler';
import { plainToInstance } from 'class-transformer';
import { AddProductToWishlistRequest, RemoveProductFromWishlistRequest } from './dtos/user.dto';
import { checkJwt, checkRole } from '../auth/auth.service';
import { accountService } from '../auth/account.service';
import { wishlistService } from './wishlist.service';

export const userRouter = Router();

// Add product to wishlist
userRouter.post(
  '/wishlist',
  checkJwt,
  checkRole([AccountRole.USER]),
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
  '/wishlist',
  checkJwt,
  checkRole([AccountRole.USER]),
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

// Get wishlist
userRouter.get(
  '/wishlist',
  checkJwt,
  checkRole([AccountRole.USER]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountUsername = res['locals'].username;
    const account = await accountService.getAccountByUsername(accountUsername);
    if (!account) {
      next(new BadRequestError('Account not found'));
      return;
    }

    const products = await wishlistService.getWishlist(account);

    res.status(200).send({
      status: true,
      products: products,
    });
  },
);
