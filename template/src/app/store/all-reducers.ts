import * as slices from "@redux-slice";
import { combineReducers } from "@reduxjs/toolkit";

export const allReducer = combineReducers({
  // List all reducer. Do not Remove this comment
});

export type RootState = ReturnType<typeof allReducer>;
