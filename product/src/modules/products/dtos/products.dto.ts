import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class GetProductListByIdListRequestDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  idList: string[];
}
