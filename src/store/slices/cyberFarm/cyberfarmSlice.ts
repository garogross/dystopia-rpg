import { createSlice } from "@reduxjs/toolkit";

export interface CyberfarmState {
  dataReceived: boolean,
}

const initialState: CyberfarmState = {
  dataReceived: false,
};

export const cyberfarmSlice = createSlice({
  name: "cyberfarm",
  initialState,
  reducers: {
    initCyberFarm: (state) => {
      state.dataReceived = true;
    },
   
  },
});

export const { initCyberFarm } =
  cyberfarmSlice.actions;
export default cyberfarmSlice.reducer;
