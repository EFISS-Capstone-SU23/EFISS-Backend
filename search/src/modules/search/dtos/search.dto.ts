import { ArrayMinSize, IsArray, IsBase64, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { SearchSortBy } from '../../../loaders/enums';

export class SearchImageRequestDto {
  @IsString()
  @IsBase64()
  encodedImage: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
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
