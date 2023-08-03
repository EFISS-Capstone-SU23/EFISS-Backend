import { IsOptional, IsString } from 'class-validator';

export class RenameCollectionRequestDto {
  @IsString()
  name: string;
}

export class CreateCollectionRequestDto {
  @IsString()
  collectionName: string;
}

export class AddProductToCollectionRequestDto {
  @IsString()
  productId: string;
}

export class UpdateAccountInfoRequestDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

export class ReportBugRequestDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
