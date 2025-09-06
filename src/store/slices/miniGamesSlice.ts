import { createSlice } from "@reduxjs/toolkit";

export interface MiniGamesState {
  lastAdViewDate: number; // Date
}

const initialState: MiniGamesState = {
  lastAdViewDate: Date.now(),
};

export const miniGamesSlice = createSlice({
  name: "miniGamesSlice",
  initialState,
  reducers: {
    updateLastAdViewDate(state) {
      state.lastAdViewDate = Date.now();
    },
  },
  extraReducers: (builder) => {},
});

export const { updateLastAdViewDate } = miniGamesSlice.actions;

export default miniGamesSlice.reducer;
