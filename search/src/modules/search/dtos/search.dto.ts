import { ArrayMinSize, IsArray, IsBase64, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { SearchSortBy } from '../../../loaders/enums';
import { IsBiggerThan } from '../../../common/class-validator';

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

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  diversity?: number;

  @IsOptional()
  @IsNumber()
  @IsBiggerThan('minPrice', {
    message: 'maxPrice must be bigger than minPrice',
  })
  @Min(0)
  maxPrice?: number;
}
