// make sure to encrypt this in future to prevent man in the middle attacks
import { checkStatus, baseFetchOptions } from './utils';

export const requestLogin = (loginInfo) => {
  return fetch('/auth/login', {
    ...baseFetchOptions,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(loginInfo)
  })
  .then(res => res.json())
  .then(checkStatus);
}

export const requestSignUp = (signUpInfo) => {
  return fetch('/auth/signup', {
    ...baseFetchOptions,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(signUpInfo)
  })
  .then(res => res.json())
  .then(checkStatus);
}

export const requestSession = () => {
  return fetch('/auth/session', baseFetchOptions)
  .then(res => res.json())
  .then(checkStatus);
}

export const requestLogout = () => {
  return fetch('/auth/logout', baseFetchOptions)
  .then(res => res.json())
  .then(checkStatus);
}