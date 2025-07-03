import { createSlice } from "@reduxjs/toolkit";

import { HackTerminalAchievmentsType } from "../../../types/Achievments/HackTerminalAchievmentsType";
import { HackTerminalAchievmentSettingsType } from "../../../types/Achievments/HackTerminalAchievmentSettingsType";

export interface AchievmentsState {
  achievments: HackTerminalAchievmentsType | null;
  achievmentSettings: HackTerminalAchievmentSettingsType | null;
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
