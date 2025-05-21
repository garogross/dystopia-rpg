import { createSlice } from "@reduxjs/toolkit";
import { ELanguages } from "../../constants/ELanguages";

export interface UIState {
  gameInited: boolean;
  language: ELanguages;
}

const initialState: UIState = {
  gameInited: false,
  language: ELanguages.ru,
};

export const uISlice = createSlice({
  name: "uISlice",
  initialState,
  reducers: {
    setGameInited(state, { payload }) {
      state.gameInited = payload;
    },
    setLanguage(state, { payload }) {
      state.language = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setGameInited, setLanguage } = uISlice.actions;

export default uISlice.reducer;
