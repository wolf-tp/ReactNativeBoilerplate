import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BaseSliceType = {
  randomNumbers: number[];
};
const initState: BaseSliceType = {
  randomNumbers: [],
};

export const BaseSlice = createSlice({
  initialState: initState,
  name: "BaseSlice",
  reducers: {
    setRandomNumber: (state, action: PayloadAction<number[]>) => {
      state.randomNumbers = action.payload;
    },
  },
});

export const { setRandomNumber } = BaseSlice.actions;
