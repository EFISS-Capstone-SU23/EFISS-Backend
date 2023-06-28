import { Repository } from 'typeorm';
import { WishlistEntity } from './entities/wishlist.entity';
import { dataSource } from '../../database/data-source';
import { productService } from '../product/services/product.service';

export class WishlistService {
  private wishlistRepository: Repository<WishlistEntity>;
  constructor() {
    this.wishlistRepository = dataSource.getRepository(WishlistEntity);
  }

  async addProductToWishlist(productId: string, accountId: number): Promise<void> {
    const existedWishlist = await this.wishlistRepository
      .createQueryBuilder('wishlists')
      .where('productId = :productId', { productId: productId })
      .andWhere('accountId = :accountId', { accountId: accountId })
      .getOne();
    if (existedWishlist) return;
    const wishlist = new WishlistEntity();
    wishlist.productId = productId;
    wishlist.accountId = accountId;
    await this.wishlistRepository.save(wishlist);
  }

  async removeProductFromWishlist(productId: string, accountId: number): Promise<void> {
    await this.wishlistRepository
      .createQueryBuilder('wishlists')
      .delete()
      .from(WishlistEntity)
      .where('productId = :productId', { productId: productId })
      .andWhere('accountId = :accountId', { accountId: accountId })
      .execute();
  }

  async checkProductInWishlist(productId: string, accountId: number): Promise<boolean> {
    const wishlist = await this.wishlistRepository
      .createQueryBuilder('wishlists')
      .where('productId = :productId', { productId: productId })
      .andWhere('accountId = :accountId', { accountId: accountId })
      .getOne();
    if (wishlist) return true;
    return false;
  }

  async getWishlist(opts: { accountId: number; pageNumber: number; pageSize: number }): Promise<any> {
    const { accountId, pageNumber = 1, pageSize = 10 } = opts;
    const wishlist = await this.wishlistRepository
      .createQueryBuilder('wishlists')
      .where('accountId = :accountId', { accountId: accountId })
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getMany();
    const totalItems = await this.wishlistRepository
      .createQueryBuilder('wishlists')
      .where('accountId = :accountId', { accountId: accountId })
      .getCount();
    const totalPages = Math.ceil(totalItems / pageSize);

    const productIds: string[] = [];
    for (const item of wishlist) {
      productIds.push(item.productId);
    }

    const products = ((await productService.getProductsByIds(productIds)) as any).productsList;

    // Return page number, total pages, total items, items per page, items
    return {
      pageNumber: pageNumber,
      totalPages: totalPages,
      pageSize: pageSize,
      totalItems: totalItems,
      products: products,
    };
  }
}

export const wishlistService = new WishlistService();
