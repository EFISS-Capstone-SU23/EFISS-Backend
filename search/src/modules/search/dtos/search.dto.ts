import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SearchSortBy } from '../../../loaders/enums';

export class SearchImageRequest {
  @IsString()
  encodedImage: string;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsEnum(SearchSortBy)
  sortBy?: SearchSortBy;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  categories?: string[];
}
