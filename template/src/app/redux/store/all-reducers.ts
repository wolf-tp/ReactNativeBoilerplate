import * as slices from "@redux-slice";
import { combineReducers } from "@reduxjs/toolkit";

export const allReducer = combineReducers({
  /* LIST ALL REDUCER. */
});

export type RootState = ReturnType<typeof allReducer>;
