import { createSlice } from "@reduxjs/toolkit";
import { ELanguages } from "../../constants/ELanguages";

export interface UIState {
  gameInited: boolean;
  language: ELanguages;
  freshDateUpdating: boolean;
  freshDate: number;
}

const initialState: UIState = {
  gameInited: false,
  language: ELanguages.ru,
  freshDateUpdating: false,
  freshDate: Date.now(),
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
    setFreshDateUpdating(state, { payload }) {
      state.freshDateUpdating = payload;
    },
    updateFreshDate(state) {
      state.freshDate = Date.now();
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setGameInited,
  setLanguage,
  setFreshDateUpdating,
  updateFreshDate,
} = uISlice.actions;

export default uISlice.reducer;
