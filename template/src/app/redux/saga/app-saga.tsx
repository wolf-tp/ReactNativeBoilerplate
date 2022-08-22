import { myTheme } from '@common';
import { setTheme } from '@redux-slice';
import { Action } from '@reduxjs/toolkit';
import { put, takeLatest } from '@typed-redux-saga';

export function* appSaga() {
  yield takeLatest(setTheme.type, handleSaga);
}

function* handleSaga(action: Action) {
  if (setTheme.match(action)) {
    yield put(setTheme(myTheme));
  }
}
