import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class ImageSearchRequestDto {
  @IsString()
  encodedImage: string;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsBoolean()
  @IsOptional()
  debug?: boolean;
}
