import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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
  @MinLength(2)
  @MaxLength(256)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(256)
  lastName?: string;
}

export class ReportBugRequestDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
