export enum DatabaseType {
  MYSQL = 'mysql',
}

export enum AccountRole {
  ADMIN = 'admin',
  NORMAL_USER = 'normal_user',
  DATA_MANAGER = 'data_manager',
  ADVERTISER = 'advertiser',
}

export enum Permission {
  CREATE_ACCOUNT = 'create_account',
  EDIT_ACCOUNT = 'edit_account',
  BASIC_NORMAL_USER_OPS = 'basic_normal_user_ops',
  ADMIN_OPS = 'admin_ops',
}

export enum TokenType {
  RESET_PASSWORD = 'reset_password',
  VERIFY_EMAIL = 'verify_email',
  REFRESH_TOKEN = 'refresh_token',
}

export enum EmailType {
  VERIFY_EMAIL = 'verify_email',
  PASSWORD_RESET = 'password_reset',
}

export enum ViewAccountListSortBy {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}
