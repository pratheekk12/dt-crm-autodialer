const prefix = process.env.NODE_ENV === 'production' ? '/auth/' : '/';
export const CRUD_ROLES = prefix + 'roles';
export const GET_USERS = prefix + 'users';
export const CRUD_USER = prefix + 'user';
export const USER_ROLE = prefix + 'user-auth';
export const CRUD_QUESTIONS = prefix + 'survey/questions';
