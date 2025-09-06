import { createSlice } from "@reduxjs/toolkit";
import { EBubbleFrontBalls } from "../../../constants/bubbleFront/EBubbleFrontBalls";
import { EBubbleFrontLevels } from "../../../constants/bubbleFront/EBubbleFrontLevels";

export interface BubbleFrontState {
  nextBalls: [EBubbleFrontBalls, EBubbleFrontBalls] | null;
  curDifficultylevel: EBubbleFrontLevels;
}

const initialState: BubbleFrontState = {
  nextBalls: null,
  curDifficultylevel: EBubbleFrontLevels.Calibration,
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
    setDifficultyLevel(state, action) {
      state.curDifficultylevel = action.payload;
    },
  },
});

export const { setNextBalls, setDifficultyLevel } = bubbleFrontSlice.actions;

export default bubbleFrontSlice.reducer;
