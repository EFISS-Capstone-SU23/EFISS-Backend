export enum SearchSortBy {
  RELEVANCE = 'relevance',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
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
