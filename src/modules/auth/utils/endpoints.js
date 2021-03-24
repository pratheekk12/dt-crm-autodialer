const prefix = process.env.NODE_ENV === 'production' ? '/auth/' : '/'; // fix for development build used in production
export const CRUD_LOGIN = prefix + 'user/login';
export const LOGOUT_URL = prefix + 'user/logout';
