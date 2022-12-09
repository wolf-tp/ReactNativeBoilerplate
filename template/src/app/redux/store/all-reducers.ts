import { api } from '@config';
import * as slices from '@redux-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  /* LIST ALL REDUCER. */
  auth: slices.authReducer,
  app: slices.appReducer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof allReducer>;
