import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { AccountRole, Permission } from '../../../loaders/enums';

export class CreateAccountDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsBoolean()
  @IsOptional()
  isEmailVerified?: boolean;

  @IsString()
  @IsOptional()
  password?: string;
}

export class AddPermissionToRoleDto {
  @IsString()
  @IsEnum(Permission)
  permission: Permission;

  @IsString()
  @IsEnum(AccountRole)
  role: AccountRole;
}

export class DeletePermissionFromRoleDto {
  @IsString()
  @IsEnum(Permission)
  permission: Permission;

  @IsString()
  @IsEnum(AccountRole)
  role: AccountRole;
}

export class AddRoleToAccountDto {
  @IsString()
  @IsEnum(AccountRole)
  role: AccountRole;
}

export class DeleteRoleFromAccountDto {
  @IsString()
  @IsEnum(AccountRole)
  role: AccountRole;
}
