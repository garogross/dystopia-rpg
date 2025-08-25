import { createSlice } from "@reduxjs/toolkit";

export interface BubbleFrontState {
  gunSettings: {
    x: number;
    y: number;
    rotate: number;
  };
}

const initialState: BubbleFrontState = {
  gunSettings: {
    x: 0,
    y: 0,
    rotate: 0,
  },
};

export const bubbleFrontSlice = createSlice({
  name: "bubbleFront",
  initialState,
  reducers: {
    setGameSettings: (state, { payload }) => {
      state.gunSettings = payload;
    },
  },
});

export const { setGameSettings } = bubbleFrontSlice.actions;
export default bubbleFrontSlice.reducer;
