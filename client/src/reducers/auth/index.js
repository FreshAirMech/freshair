import { combineReducers } from 'redux';

import login from './login';
import signUp from './signUp';
import session from './session';
import * as Consts from '../../constants/auth';

export default combineReducers({
  login,
  signUp,
  session
});



