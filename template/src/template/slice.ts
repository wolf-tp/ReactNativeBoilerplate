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
    //Handle loading when call api
    onRandomNumber: (state) => {},
    setRandomNumber: (state, action: PayloadAction<number[]>) => {
      state.randomNumbers = action.payload;
    },
  },
});

export const { setRandomNumber, onRandomNumber } = BaseSlice.actions;

export const BaseReducer = BaseSlice.reducer;
