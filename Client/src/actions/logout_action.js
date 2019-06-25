/* eslint-disable import/prefer-default-export */

import { LOGOUT } from '../constants';

export function logoutAction(state) {
  return {
    type: LOGOUT,
    field: 'login',
  };
}
