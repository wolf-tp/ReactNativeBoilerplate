import { api } from '@config';
import { configureStore } from '@reduxjs/toolkit';
import { allReducer } from '@store/all-reducers';
import { rootSaga } from '@store/root-sagas';
import createSagaMiddleware from 'redux-saga';

import { subscribeActionMiddleware } from '../../common/redux/redux-subscribe-action';
/**
 * Use this instead storage of reduxPersist
 * import {persistStore, persistReducer} from 'redux-persist';
 * import {reduxPersistStorage} from '@utils';
 * const persistedReducer = persistReducer(
 *   {key: 'root', storage: reduxPersistStorage},
 *   allReducer,
 * );
 */

const devMode = __DEV__;
const sagaMiddleware = createSagaMiddleware();

const storeConfig = () => {
  const store = configureStore({
    reducer: allReducer,
    devTools: devMode,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(sagaMiddleware)
        .concat(subscribeActionMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
export const store = storeConfig();
/**
 * export const persistore = persistStore(store);
 */
