import { SET_ROLES } from './constants';

export const setRolesAction = roles => ({
  type: SET_ROLES,
  payload: roles
});
