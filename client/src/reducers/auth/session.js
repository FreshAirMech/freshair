import * as Consts from '../../constants/auth';

const initialState = {
  isFetching: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Consts.SESSION_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Consts.SESSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null
      };
    case Consts.SESSION_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}