import * as Consts from '../../constants/auth';

const initialState = {
  isFetching: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Consts.SIGN_UP_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Consts.SIGN_UP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null
      };
    case Consts.SIGN_UP_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}