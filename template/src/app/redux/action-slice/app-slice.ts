import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/all-reducers';

import { myTheme } from '../../common/styles';

type appSliceType = {
  theme: typeof myTheme;
};
const initState: appSliceType = {
  theme: myTheme,
};

export const app = createSlice({
  initialState: initState,
  name: 'app',
  reducers: {
    //Handle loading when call api
    setTheme: (state, action: PayloadAction<typeof myTheme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = app.actions;

export const getAppTheme = (state: RootState) => state.app.theme;

export const appReducer = app.reducer;
