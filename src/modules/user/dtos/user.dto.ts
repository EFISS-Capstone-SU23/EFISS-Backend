import { IsOptional, IsString } from 'class-validator';

export class AddProductToWishlistRequest {
  @IsString()
  productId: string;
}

export class RemoveProductFromWishlistRequest {
  @IsString()
  productId: string;
}

export class UpdateAccountInfoRequest {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

export class ReportBugRequest {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
