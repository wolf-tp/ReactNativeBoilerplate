import { homeSlice } from "@redux-slice";
import { combineReducers } from "@reduxjs/toolkit";

export const allReducer = combineReducers({
  home: homeSlice.reducer,
});

export type RootState = ReturnType<typeof allReducer>;
