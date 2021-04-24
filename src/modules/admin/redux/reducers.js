import { SET_ROLES } from './constants';

export const setRoles = (state = null, action) => {
  switch (action.type) {
    case SET_ROLES:
      return action.payload;
    default:
      return state;
  }
};
