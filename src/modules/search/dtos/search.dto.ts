import {
	IsBoolean,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'
import { ProductCategory, SearchSortBy } from '../../../loaders/enums'

export class ImageSearchRequestDto {
	@IsString()
		encodedImage: string

	@IsNumber()
	@IsOptional()
		limit?: number

	@IsOptional()
	@IsEnum(SearchSortBy)
		sortBy?: SearchSortBy

	@IsOptional()
	@IsEnum(ProductCategory)
		category?: ProductCategory
}
