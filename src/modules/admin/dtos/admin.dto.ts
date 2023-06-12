import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AccountRole, ViewAccountListSortBy, ViewBugReportSortBy } from '../../../loaders/enums';

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

export class UpdateAccountRequest {
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsEnum(AccountRole, { each: true })
  @IsOptional()
  @IsArray()
  roles?: AccountRole[];
}
