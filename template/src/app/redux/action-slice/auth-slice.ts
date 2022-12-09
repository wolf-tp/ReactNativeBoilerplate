import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type authSliceType = {
  token: string;
};
const initState: authSliceType = {
  token: '',
};

export const auth = createSlice({
  initialState: initState,
  name: 'auth',
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = auth.actions;


export const authReducer = auth.reducer;
