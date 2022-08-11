import { setRandomNumber, onRandomNumber } from "@redux-slice";
import { Action } from "@reduxjs/toolkit";
import { put, takeLatest } from "@typed-redux-saga";

export function* Base() {
  yield* takeLatest(onRandomNumber.type, handleSaga);
}

function* handleSaga(action: Action) {
  if (onRandomNumber.match(action)) {
    yield* put(setRandomNumber([Math.random() * 10]));
  }
}
