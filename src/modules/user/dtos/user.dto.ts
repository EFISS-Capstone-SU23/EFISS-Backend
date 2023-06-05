import { IsString } from 'class-validator';

export class AddProductToWishlistRequest {
  @IsString()
  productId: string;
}

export class RemoveProductFromWishlistRequest {
  @IsString()
  productId: string;
}
