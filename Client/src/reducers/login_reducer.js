import { LOGIN } from '../constants';

export default function login(state = {}, action) {
  console.log('state from reducer ', state, 'action : ', action);
  switch (action.type) {
    case LOGIN:
      return {
        // ...state,
        UserCredentials: action.payload.credentials,
      };
    default:
      return state;
  }
}
