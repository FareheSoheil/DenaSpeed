/* eslint-disable import/prefer-default-export */

import { LOGIN } from '../constants';

export function loginAction(credentials) {
  return {
    type: LOGIN,
    payload: {
      credentials,
    },
  };
}
