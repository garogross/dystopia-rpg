import { createSlice } from "@reduxjs/toolkit";
import { setLSItem } from "../../../helpers/localStorage";
import { ELSProps } from "../../../constants/ELSProps";

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
      setLSItem(ELSProps.farmMode, payload);
    },
  },
});

export const { initCyberFarm, closeCyberFarm, setCyberfarmMode } =
  cyberfarmSlice.actions;
export default cyberfarmSlice.reducer;
