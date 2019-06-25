import { LOGOUT } from '../constants';

export default function logout(state = {}, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        [action.payload.name]: action.payload,
        // state: action.payload,
      };
    default:
      return state;
  }
}
