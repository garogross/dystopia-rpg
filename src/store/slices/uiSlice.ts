import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
  gameInited: boolean;
}

const initialState: UIState = {
  gameInited: true,
};

export const uISlice = createSlice({
  name: "uISlice",
  initialState,
  reducers: {
    setGameInited(state, { payload }) {
      state.gameInited = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setGameInited } = uISlice.actions;

export default uISlice.reducer;
