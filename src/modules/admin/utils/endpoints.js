const prefix = process.env.NODE_ENV === 'production' ? '/' : '/';
export const CRUD_ROLES = prefix + 'roles';
export const CRUD_RESTAURANTS = prefix + 'restaurants';
export const GET_USERS = prefix + 'users';
export const CRUD_USER = prefix + 'user';
export const USER_ROLE = prefix + 'user-auth';
export const CRUD_QUESTIONS = prefix + 'survey/questions';
