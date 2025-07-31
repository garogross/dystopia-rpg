import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
  actionPointRestore: {
    amount: number;
    intervalMinutes: number;
  };
  attackNeutralHex: {
    actionPointsCost: number;
    influencePointsReward: number;
  };
  attackEnemyHexWithoutBuilding: {
    actionPointsCost: number;
    influencePointsReward: number;
  };
  actionPointMax: number;
  actionPointMaxPerTurn: number;
  monoColorSchemeEnabled: boolean;
}

const initialState: SettingsState = {
  actionPointRestore: {
    amount: 0,
    intervalMinutes: 0,
  },
  attackNeutralHex: {
    actionPointsCost: 0,
    influencePointsReward: 0,
  },
  attackEnemyHexWithoutBuilding: {
    actionPointsCost: 0,
    influencePointsReward: 0,
  },
  actionPointMax: 0,
  actionPointMaxPerTurn: 0,
  monoColorSchemeEnabled: false,
};

export const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    initSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
    setMonoColorSchemeEnabled: (state, action) => {
      state.monoColorSchemeEnabled = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { initSettings, setMonoColorSchemeEnabled } =
  settingsSlice.actions;

export default settingsSlice.reducer;
