import * as saga from '@saga';
import { all } from '@typed-redux-saga';

const listSaga = Object.values(saga).map(saga => saga());

export const rootSaga = function* rootSaga() {
  yield* all(listSaga);
};
