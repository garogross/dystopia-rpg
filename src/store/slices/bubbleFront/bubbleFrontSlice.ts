import { createSlice } from "@reduxjs/toolkit";
import { EBubbleFrontBalls } from "../../../constants/bubbleFront/EBubbleFrontBalls";

export interface BubbleFrontState {
  nextBalls: [EBubbleFrontBalls, EBubbleFrontBalls] | null;
}

const initialState: BubbleFrontState = {
  nextBalls: null,
};

export const bubbleFrontSlice = createSlice({
  name: "bubbleFront",
  initialState,
  reducers: {
    setNextBalls(
      state,
      action: { payload: [EBubbleFrontBalls, EBubbleFrontBalls] }
    ) {
      state.nextBalls = action.payload;
    },
  },
});

export const { setNextBalls } = bubbleFrontSlice.actions;

export default bubbleFrontSlice.reducer;
