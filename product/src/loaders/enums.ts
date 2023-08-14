export enum SearchSortBy {
  RELEVANCE = 0,
  PRICE_ASC = 1,
  PRICE_DESC = 2,
}

export enum DatabaseType {
  MYSQL = 'mysql',
}

export enum AccountRole {
  ADMIN = 'admin',
  USER = 'user',
  DATA_MANAGER = 'data_manager',
  ADVERTISER = 'advertiser',
}

export enum TokenType {
  RESET_PASSWORD = 'reset_password',
  VERIFY_EMAIL = 'verify_email',
}

export enum EmailType {
  VERIFY_EMAIL = 'verify_email',
  PASSWORD_RESET = 'password_reset',
}

export enum ViewBugReportSortBy {
  OLDEST = 'oldest',
  NEWEST = 'newest',
}

export enum ViewAccountListSortBy {
  OLDEST = 'oldest',
  NEWEST = 'newest',
}

export enum Permission {
  CREATE_ACCOUNT = 'create_account',
  EDIT_ACCOUNT = 'edit_account',
  BASIC_NORMAL_USER_OPS = 'basic_normal_user_ops',
  ADMIN_OPS = 'admin_ops',
  MANAGE_PRODUCTS = 'manage_products',
}
