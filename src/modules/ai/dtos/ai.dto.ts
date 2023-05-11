import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class FindRelevantImagesRequestDto {
  @IsNumber()
  topk: number;

  @IsString()
  image: string;

  @IsBoolean()
  @IsOptional()
  debug?: boolean;
}

export class FindRelevantImagesResponseDto {
  @IsString()
  index_database_version: string;

  @IsString({ each: true })
  relevant: string[];

  @IsString({ each: true })
  @IsOptional()
  distances: string[];
}
