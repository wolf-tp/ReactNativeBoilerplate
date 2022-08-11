import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BaseSliceType = {
  randomNumbers: number[];
};
const initState: BaseSliceType = {
  randomNumbers: [],
};

export const Base = createSlice({
  initialState: initState,
  name: "Base",
  reducers: {
    //Handle loading when call api
    onRandomNumber: (state) => {},
    setRandomNumber: (state, action: PayloadAction<number[]>) => {
      state.randomNumbers = action.payload;
    },
  },
});

export const { setRandomNumber, onRandomNumber } = Base.actions;

export const BaseReducer = Base.reducer;
