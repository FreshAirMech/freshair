import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as Api from '../api/user';
import * as Actions from 'actions/user';
import * as Consts from 'constants/user';

function* requestCheckInfo(action) {
  try {
    const result = yield call(Api.requestCheckInfo, action.userInfo);
    yield put(Actions.checkInfoSuccess(result));
  } catch (error) {
    yield put(Actions.checkInfoFailed(error));
  }
}

export default function* watchUser() {
  yield [
    takeLatest(Consts.CHECKINFO_REQUEST, requestCheckInfo)
  ];
}