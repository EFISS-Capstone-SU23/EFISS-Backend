import { AccountRole } from '../loaders/enums';

type RouteRoles = {
  route: string;
  roles: AccountRole[];
};

export interface IAuthConfig {
  normalUser: RouteRoles;
}

export const authConfig: IAuthConfig = {
  normalUser: {
    route: '/api/v1/sign-in',
    roles: [AccountRole.USER],
  },
};
