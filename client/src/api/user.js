// make sure to encrypt this in future to prevent man in the middle attacks
import { baseFetchOptions, checkStatus } from './utils';

export const requestCheckInfo = (userInfo) => {
  return fetch('/users/check', {
    ...baseFetchOptions,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    body: JSON.stringify(userInfo)
  })
  .then(res => res.json())
  .then(checkStatus);
}