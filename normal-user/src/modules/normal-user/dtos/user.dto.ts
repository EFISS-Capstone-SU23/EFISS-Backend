import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddProductToWishlistRequest {
  @IsString()
  productId: string;
}

export class RenameCollectionRequest {
  @IsString()
  name: string;
}

export class CreateCollectionRequest {
  @IsString()
  collectionName: string;
}

export class AddProductToCollectionRequest {
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

export class GetWishlistRequest {
  @IsString()
  @IsOptional()
  pageNumber?: number;

  @IsString()
  @IsOptional()
  pageSize?: number;
}
