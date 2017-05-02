import * as ConstsAuth from 'constants/auth';
import * as ConstsUser from 'constants/user';
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ConstsAuth.LOGIN_SUCCESS:
    case ConstsAuth.SIGN_UP_SUCCESS:
    case ConstsAuth.SESSION_SUCCESS:
      return {
        ...state,
        username: action.result.username,
        id: action.result.id,
        email: action.result.email
      };
    case ConstsUser.CHECKINFO_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case ConstsUser.CHECKINFO_SUCCESS:
      let returnObj = {
        ...state,
        isFetching: false,
        error: null
      };
      if (action.result.email) returnObj['email'] = action.result.email;
      if (action.result.phone) returnObj['phone'] = action.result.phone;
      return returnObj;
    case ConstsUser.CHECKINFO_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case ConstsAuth.SESSION_FAILED:
    case ConstsAuth.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};