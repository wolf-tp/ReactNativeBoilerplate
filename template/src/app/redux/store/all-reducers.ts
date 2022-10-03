import * as slices from '@redux-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  /* LIST ALL REDUCER. */
  app: slices.appReducer,
});

export type RootState = ReturnType<typeof allReducer>;
