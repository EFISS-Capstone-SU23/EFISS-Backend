import { IsEmail, IsString, Matches, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { Match } from '../../../common/class-validator';

export class SignInRequest {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class SignUpRequest {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('password')
  confirmPassword: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  lastName: string;
}

export class ChangePasswordRequest {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  oldPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  newPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('newPassword')
  confirmNewPassword: string;
}

export class SendResetPasswordEmailRequest {
  @ValidateIf((dto) => !dto.email || dto.username)
  @IsString()
  username?: string;

  @ValidateIf((dto) => !dto.username || dto.email)
  @IsEmail()
  email?: string;
}

export class ResetPasswordByToken {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  newPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('newPassword')
  confirmNewPassword: string;
}

export class RefreshTokenRequest {
  @IsString()
  refreshToken: string;
}
