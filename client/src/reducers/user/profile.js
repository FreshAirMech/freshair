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
        email: action.result.email,
        phone: action.result.phone,
        photoURL: action.result.photoURL
      };
    case ConstsUser.CHANGEINFO_REQUEST:
      let returnObjRequest = {...state};
      if (action.userInfo.newPassword) {
        returnObjRequest['isFetchingPassword'] = true;
        returnObjRequest['errorPassword'] = null;
      }
      else if (action.userInfo.newEmail) {
        returnObjRequest['isFetchingEmail'] = true;
        returnObjRequest['errorEmail'] = null;
      }
      else if (action.userInfo.newPhone) {
        returnObjRequest['isFetchingPhone'] = true;
        returnObjRequest['errorPhone'] = null;
      }
      return returnObjRequest;
    case ConstsUser.CHANGEINFO_SUCCESS:
      let returnObjSuccess = {...state};
      if (action.result.newEmail) {
        returnObjSuccess['email'] = action.result.newEmail;
        returnObjSuccess['isFetchingEmail'] = false;
        returnObjSuccess['errorEmail'] = null;
      }
      else if (action.result.newPhone) {
        returnObjSuccess['phone'] = action.result.newPhone;
        returnObjSuccess['isFetchingPhone'] = false;
        returnObjSuccess['errorPhone'] = null;
      }
      else if (action.result.newPassword) {
        returnObjSuccess['isFetchingPassword'] = false;
        returnObjSuccess['errorPassword'] = null;
      }
      else if (action.result.photoURL || action.result.photoURL === '') {
        returnObjSuccess['photoURL'] = action.result.photoURL;
      }
      return returnObjSuccess;
    case ConstsUser.CHANGEINFO_FAILED:
      let returnObjFailed = {...state};
      if (action.error.message.search(/email/i) > 0) {
        returnObjFailed['isFetchingEmail'] = false;
        returnObjFailed['errorEmail'] = action.error;
      }
      else if (action.error.message.search(/password/i) > 0) {
        returnObjFailed['isFetchingPassword'] = false;
        returnObjFailed['errorPassword'] = action.error;
      }
      else if (action.error.message.search(/phone/i) > 0) {
        returnObjFailed['isFetchingPhone'] = false;
        returnObjFailed['errorPhone'] = action.error;
      }
      return returnObjFailed;
    case ConstsAuth.SESSION_FAILED:
    case ConstsAuth.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};