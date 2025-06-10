import { createSlice } from "@reduxjs/toolkit";

export interface SlotsState {
  slots: Record<string,{type: "fields" |  "farm" | "factory"}> | null;
}

const initialState: SlotsState = {
  slots: null,
};

export const slotsSlice = createSlice({
  name: "slotsSlice",
  initialState,
  reducers: {
   getCyberFarmSlots: (state, action) => {
     state.slots = action.payload;
   }
  },
  extraReducers: (builder) => {},
});

export const { getCyberFarmSlots } = slotsSlice.actions;

export default slotsSlice.reducer;
