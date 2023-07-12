import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class GetProductListByIdListRequest {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  idList: string[];
}

export class GetProductListByImageUrls {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  imageUrls: string[];
}
