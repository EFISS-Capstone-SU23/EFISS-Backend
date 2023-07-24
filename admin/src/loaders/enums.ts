export enum DatabaseType {
  MYSQL = 'mysql',
}

export enum ViewAccountListSortBy {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export enum Permission {
  CREATE_ACCOUNT = 'create_account',
  EDIT_ACCOUNT = 'edit_account',
  BASIC_NORMAL_USER_OPS = 'basic_normal_user_ops',
  ADMIN_OPS = 'admin_ops',
}

export enum AccountRole {
  ADMIN = 'admin',
  NORMAL_USER = 'normal_user',
  DATA_MANAGER = 'data_manager',
  ADVERTISER = 'advertiser',
}
