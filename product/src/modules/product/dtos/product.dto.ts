import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import 'reflect-metadata';

export class GetProductListByIdListRequestDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  idList: string[];
}

export class SearchHistoryDto {
  @IsString()
  productId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categories?: string[];

  @IsString()
  group: string;
}

export class GetRecommendedProductsBySearchHistoryDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => SearchHistoryDto)
  searchHistories: SearchHistoryDto[];

  @IsNumber()
  @IsOptional()
  pageNumber?: number;

  @IsNumber()
  @IsOptional()
  pageSize?: number;
}

export class GetProductListByImageUrlsDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  imageUrls: string[];

  @IsOptional()
  @IsNumber()
  limit?: number;
}
