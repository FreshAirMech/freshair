import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as Api from '../api/user';
import * as Actions from 'actions/user';
import * as Consts from 'constants/user';

function* requestChangeInfo(action) {
  try {
    const result = yield call(Api.requestChangeInfo, action.userInfo);
    yield put(Actions.changeInfoSuccess(result));
  } catch (error) {
    yield put(Actions.changeInfoFailed(error));
  }
}

function* requestSendEmail(action) {
	try {
    const result = yield call(Api.requestSendEmail, action.formInfo);
    yield put(Actions.sendEmailSuccess(result));
  } catch (error) {
    yield put(Actions.sendEmailFailed(error));
  }
}

export default function* watchUser() {
  yield [
    takeLatest(Consts.CHANGEINFO_REQUEST, requestChangeInfo),
    takeLatest(Consts.SENDEMAIL_REQUEST, requestSendEmail)
  ];
}