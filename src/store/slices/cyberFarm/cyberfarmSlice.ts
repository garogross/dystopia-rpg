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
  },
});

export const { initCyberFarm, closeCyberFarm } = cyberfarmSlice.actions;
export default cyberfarmSlice.reducer;
