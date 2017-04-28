import * as Consts from 'constants/auth';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case Consts.LOGIN_SUCCESS:
    case Consts.SIGN_UP_SUCCESS:
    case Consts.SESSION_SUCCESS:
      return {
        ...state,
        username: action.result.username,
        id: action.result.id
      };
    case Consts.SESSION_FAILED:
    case Consts.LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
};