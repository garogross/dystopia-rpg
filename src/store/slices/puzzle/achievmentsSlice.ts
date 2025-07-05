import { createSlice } from "@reduxjs/toolkit";

import { PuzzleAchievmentsType } from "../../../types/Achievments/PuzzleAchievmentsType";
import { PuzzleAchievmentSettingsType } from "../../../types/Achievments/PuzzleAchievmentSettingsType";

export interface AchievmentsState {
  achievments: PuzzleAchievmentsType | null;
  achievmentSettings: PuzzleAchievmentSettingsType | null;
}

const initialState: AchievmentsState = {
  achievments: null,
  achievmentSettings: null,
};

export const achievmentsSlice = createSlice({
  name: "achievmentsSlice",
  initialState,
  reducers: {
    initAchievments: (state, action) => {
      state.achievments = action.payload.achievments;
      state.achievmentSettings = action.payload.achievmentSettings;
    },
  },
  extraReducers: (builder) => {},
});

export const { initAchievments } = achievmentsSlice.actions;

export default achievmentsSlice.reducer;
