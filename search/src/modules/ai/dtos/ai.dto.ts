import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class FindRelevantImagesRequestDto {
  @IsNumber()
  topk: number;

  @IsString()
  image: string;

  @IsBoolean()
  @IsOptional()
  debug?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(20)
  diversity?: number;
}

export class FindRelevantImagesResponseDto {
  @IsString()
  index_database_version: string;

  @IsString({ each: true })
  relevant: string[];

  @IsString({ each: true })
  @IsOptional()
  distances: string[];

  @IsString()
  @IsOptional()
  croppedImage: string;
}
