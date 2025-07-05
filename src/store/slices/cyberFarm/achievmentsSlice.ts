import { createSlice } from "@reduxjs/toolkit";

import { FarmAchievmentsType } from "../../../types/Achievments/FarmAchievmentsType";
import { FarmAchievmentSettingsType } from "../../../types/Achievments/FarmAchievmentSettingsType";

export interface AchievmentsState {
  achievments: FarmAchievmentsType | null;
  achievmentSettings: FarmAchievmentSettingsType | null;
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
