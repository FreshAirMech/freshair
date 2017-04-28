import { push } from 'react-router-redux';

export const locationChange = path => {
  return (dispatch) => {
    dispatch(push(path));
  }
};