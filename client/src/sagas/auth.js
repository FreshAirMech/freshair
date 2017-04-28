import { takeLatest, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as Api from '../api/auth';
import * as Actions from 'actions/auth';
import * as Consts from 'constants/auth';
import { locationChange } from 'actions/router';

function* requestLogin(action) {
  try {
    const result = yield call(Api.requestLogin, action.loginInfo);
    yield put(Actions.loginSuccess(result));
    yield put(locationChange('/'));
  } catch (error) {
    yield call(delay, 2500);
    yield put(Actions.loginFailed(error));
  }
}

function* requestSignUp(action) {
  try {
    const result = yield call(Api.requestSignUp, action.signUpInfo);
    yield put(Actions.signUpSuccess(result));
    yield put(locationChange('/'));
  } catch (error) {
    yield call(delay, 2500);
    yield put(Actions.signUpFailed(error));
  }
}

function* requestSession(action) {
  try {
    const result = yield call(Api.requestSession);
    yield put(Actions.sessionSuccess(result));
  } catch (error) {
    yield put(Actions.sessionFailed(error));
    yield put(locationChange('/'));
  }
}

function* requestLogout(action) {
  try {
    const result = yield call(Api.requestLogout);
    yield put(Actions.logoutSuccess(result));
    yield put(locationChange('/'));
  } catch (error) {
    yield put(Actions.logoutFailed(result));
  }
}

export default function* watchAuth() {
  yield [
    takeLatest(Consts.LOGIN_REQUEST, requestLogin),
    takeLatest(Consts.SIGN_UP_REQUEST, requestSignUp),
    takeLatest(Consts.SESSION_REQUEST, requestSession),
    takeLatest(Consts.LOGOUT_REQUEST, requestLogout)
  ];
}