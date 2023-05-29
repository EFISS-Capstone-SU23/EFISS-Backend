export enum SearchSortBy {
  RELEVANCE = 'relevance',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
}

export enum ProductCategory {
  ALL = 'all',
  SHIRTS = 'shirts',
  PANTS = 'pants',
  JEANS = 'jeans',
  SKIRTS = 'skirts',
  JACKETS = 'jackets',
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
