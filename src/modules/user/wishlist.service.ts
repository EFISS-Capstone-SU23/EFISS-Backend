import { Repository } from 'typeorm';
import { BEDataSource } from '../../database/datasource';
import { WishlistEntity } from './entities/wishlist.entity';
import { AccountEntity } from '../auth/entities/account.entity';
import { IProductEntity } from '../products/entities/product.entity';
import { ProductEntity } from '../products/entities/product.entity';

export class WishlistService {
  static wishlistService: WishlistService;
  private constructor(private readonly wishlistRepository: Repository<WishlistEntity>) {}

  static getInstance(): WishlistService {
    if (!WishlistService.wishlistService) {
      const tokenRepository = BEDataSource.getRepository(WishlistEntity);
      WishlistService.wishlistService = new WishlistService(tokenRepository);
    }
    return WishlistService.wishlistService;
  }

  async addProductToWishlist(productId: string, account: AccountEntity): Promise<void> {
    const existedWishlist = await this.wishlistRepository
      .createQueryBuilder('wishlists')
      .where('productId = :productId', { productId: productId })
      .andWhere('accountId = :accountId', { accountId: account.id })
      .getOne();
    if (existedWishlist) return;
    const wishlist = new WishlistEntity();
    wishlist.productId = productId;
    wishlist.account = account;
    await this.wishlistRepository.save(wishlist);
  }

  async removeProductFromWishlist(productId: string, account: AccountEntity): Promise<void> {
    await this.wishlistRepository
      .createQueryBuilder('wishlists')
      .delete()
      .from(WishlistEntity)
      .where('productId = :productId', { productId: productId })
      .andWhere('accountId = :accountId', { accountId: account.id })
      .execute();
  }

  async getWishlist(account: AccountEntity): Promise<IProductEntity[]> {
    const products: IProductEntity[] = [];
    for (const item of account.wishlist) {
      const product = await ProductEntity.findOne({ _id: item.productId });
      if (product) {
        products.push(product);
      }
    }
    return products;
  }
}

export const wishlistService = WishlistService.getInstance();
