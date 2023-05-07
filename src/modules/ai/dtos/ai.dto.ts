import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class FindRelevantImagesRequestDto {
  @IsNumber()
  top_k: number;

  @IsString()
  encodedImage: string;

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
