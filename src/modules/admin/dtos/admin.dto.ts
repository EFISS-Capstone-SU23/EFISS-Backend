import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ViewAccountListSortBy, ViewBugReportSortBy } from '../../../loaders/enums';

export class ViewBugReportsRequest {
  @IsNumber()
  @IsOptional()
  pageNumber?: number;

  @IsNumber()
  @IsOptional()
  pageSize?: number;

  @IsString()
  @IsOptional()
  @IsEnum(ViewBugReportSortBy)
  sortBy?: ViewBugReportSortBy;
}

export class ViewAccountListRequest {
  @IsNumber()
  @IsOptional()
  pageNumber?: number;

  @IsNumber()
  @IsOptional()
  pageSize?: number;

  @IsString()
  @IsOptional()
  query?: string;

  @IsString()
  @IsOptional()
  @IsEnum(ViewAccountListSortBy)
  sortBy?: ViewAccountListSortBy;
}
