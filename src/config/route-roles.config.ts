import { AccountRole } from '../loaders/enums';

export type RouteRoles = {
  route: string;
  roles: AccountRole[];
};
export interface IRouteRolesConfig {
  auth: {
    base: string;
    routes: {
      signIn: RouteRoles;
      signUp: RouteRoles;
      refreshToken: RouteRoles;
      resendVerificationEmail: RouteRoles;
      checkEmailVerificationToken: RouteRoles;
      changePassword: RouteRoles;
      sendResetPasswordEmail: RouteRoles;
      checkResetPasswordToken: RouteRoles;
      resetPassword: RouteRoles;
    };
  };
  admin: {
    base: string;
    routes: {
      viewBugReports: RouteRoles;
      deleteBugReport: RouteRoles;
      viewAccountList: RouteRoles;
      deleteAccount: RouteRoles;
      updateAccount: RouteRoles;
      createAccount: RouteRoles;
      viewAppStatistics: RouteRoles;
    };
  };
  products: {
    base: string;
    routes: {
      getProductById: RouteRoles;
      getProductsByIdList: RouteRoles;
    };
  };
  search: {
    base: string;
    routes: {
      searchByImage: RouteRoles;
    };
  };
  user: {
    base: string;
    routes: {
      addProductToWishlist: RouteRoles;
      removeProductFromWishlist: RouteRoles;
      checkWishlistExistence: RouteRoles;
      viewWishlist: RouteRoles;
      viewAccountInfo: RouteRoles;
      updateAccountInfo: RouteRoles;
      reportBug: RouteRoles;
    };
  };
}

export const routeRolesConfig: IRouteRolesConfig = {
  auth: {
    base: '/auth',
    routes: {
      signIn: {
        route: '/sign-in',
        roles: [AccountRole.GUEST],
      },
      signUp: {
        route: '/sign-up',
        roles: [AccountRole.GUEST],
      },
      refreshToken: {
        route: '/refresh-token',
        roles: [AccountRole.GUEST],
      },
      resendVerificationEmail: {
        route: '/verify-email/resend',
        roles: [AccountRole.USER],
      },
      checkEmailVerificationToken: {
        route: '/verify-email/:token',
        roles: [AccountRole.GUEST],
      },
      changePassword: {
        route: '/change-password',
        roles: [AccountRole.USER],
      },
      sendResetPasswordEmail: {
        route: '/reset-password',
        roles: [AccountRole.GUEST],
      },
      checkResetPasswordToken: {
        route: '/reset-password/:token',
        roles: [AccountRole.GUEST],
      },
      resetPassword: {
        route: '/reset-password:token',
        roles: [AccountRole.GUEST],
      },
    },
  },
  admin: {
    base: '/admin',
    routes: {
      viewBugReports: {
        route: '/bug-report',
        roles: [AccountRole.ADMIN],
      },
      deleteBugReport: {
        route: '/bug-report/:id',
        roles: [AccountRole.ADMIN],
      },
      viewAccountList: {
        route: '/account',
        roles: [AccountRole.ADMIN],
      },
      deleteAccount: {
        route: '/account/:id',
        roles: [AccountRole.ADMIN],
      },
      updateAccount: {
        route: '/account/:id',
        roles: [AccountRole.ADMIN],
      },
      createAccount: {
        route: '/account',
        roles: [AccountRole.ADMIN],
      },
      viewAppStatistics: {
        route: '/statistics',
        roles: [AccountRole.ADMIN],
      },
    },
  },
  products: {
    base: '/product',
    routes: {
      getProductById: {
        route: '/:id',
        roles: [AccountRole.GUEST],
      },
      getProductsByIdList: {
        route: '/list',
        roles: [AccountRole.GUEST],
      },
    },
  },
  search: {
    base: '/search',
    routes: {
      searchByImage: {
        route: '/image',
        roles: [AccountRole.GUEST],
      },
    },
  },
  user: {
    base: '/user',
    routes: {
      addProductToWishlist: {
        route: '/wishlist',
        roles: [AccountRole.USER],
      },
      removeProductFromWishlist: {
        route: '/wishlist',
        roles: [AccountRole.USER],
      },
      checkWishlistExistence: {
        route: '/wishlist/:productId',
        roles: [AccountRole.USER],
      },
      viewWishlist: {
        route: '/wishlist',
        roles: [AccountRole.USER],
      },
      viewAccountInfo: {
        route: '/profile',
        roles: [AccountRole.USER],
      },
      updateAccountInfo: {
        route: '/profile',
        roles: [AccountRole.USER],
      },
      reportBug: {
        route: '/bug-report',
        roles: [AccountRole.USER],
      },
    },
  },
};
