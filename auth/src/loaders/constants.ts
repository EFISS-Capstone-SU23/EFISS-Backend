export const SECONDS_PER_UNIT = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  w: 604800,
  M: 2592000,
  y: 31536000,
};

export const DELAY_BETWEEN_EMAILS_IN_MS = 5 * 60 * 1000;

export const VERIFY_EMAIL_TOKEN_EXPIRES_IN_MS = 86400000;

export const RESET_PASSWORD_TOKEN_EXPIRES_IN_MS = 900000;

// export const JWT_ACCESS_EXPIRES_IN = '15m';
export const JWT_ACCESS_EXPIRES_IN = '7d';

export const JWT_REFRESH_EXPIRES_IN = '30d';

export const CLIENT_URL = 'http://localhost:3000/';
