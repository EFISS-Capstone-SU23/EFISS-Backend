import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
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

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    return propertyValue < args.object[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be before "${args.constraints[0]}"`;
  }
}

export class ViewAppStatisticsRequest {
  @Validate(IsBeforeConstraint, ['toDate'])
  @IsDate()
  fromDate: Date;

  @IsOptional()
  @IsDate()
  toDate: Date;
}

export class AppOverallStatistics {
  onlineUsers: number;
  totalUsers: number;
  totalSearched: number;
  todayNewUsers: number;
  todaySearched: number;
}
