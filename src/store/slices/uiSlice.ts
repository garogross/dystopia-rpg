import { createSlice } from "@reduxjs/toolkit";
import { ELanguages } from "../../constants/ELanguages";

export interface UIState {
  gameInited: boolean;
  language: ELanguages;
  freshDateSessions: string[];
  freshDate: number;
}

const initialState: UIState = {
  gameInited: false,
  language: ELanguages.ru,
  freshDateSessions: [],
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
    addFreshDateSession(state, { payload }) {
      state.freshDateSessions = [...state.freshDateSessions, payload];
    },
    removeFreshDateSession(state, { payload }) {
      state.freshDateSessions = state.freshDateSessions.filter(
        (sesion) => sesion !== payload
      );
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
  addFreshDateSession,
  removeFreshDateSession,
  updateFreshDate,
} = uISlice.actions;

export default uISlice.reducer;
