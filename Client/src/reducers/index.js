import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import user from './user';
import runtime from './runtime';
import login from './login_reducer';

export default combineReducers({
  user,
  runtime,
  login,
  toastr: toastrReducer,
});
