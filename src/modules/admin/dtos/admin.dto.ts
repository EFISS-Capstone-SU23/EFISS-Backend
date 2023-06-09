import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ViewBugReportSortBy } from '../../../loaders/enums';

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
