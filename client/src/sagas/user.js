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

export default function* watchUser() {
  yield [
    takeLatest(Consts.CHANGEINFO_REQUEST, requestChangeInfo)
  ];
}