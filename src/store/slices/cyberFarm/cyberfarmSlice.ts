import { createSlice } from "@reduxjs/toolkit";

export interface CyberfarmState {
  dataReceived: boolean;
  appMode: "classic" | "evo";
}

const initialState: CyberfarmState = {
  dataReceived: false,
  appMode: "evo",
};

export const cyberfarmSlice = createSlice({
  name: "cyberfarm",
  initialState,
  reducers: {
    initCyberFarm: (state) => {
      state.dataReceived = true;
    },
    closeCyberFarm: (state) => {
      state.dataReceived = false;
    },
    setCyberfarmMode: (state, { payload }) => {
      state.appMode = payload;
    },
  },
});

export const { initCyberFarm, closeCyberFarm, setCyberfarmMode } =
  cyberfarmSlice.actions;
export default cyberfarmSlice.reducer;
