import { createSlice } from "@reduxjs/toolkit";
import { IClan } from "../../models/IClan";

export interface ClanState {
  clan: IClan | null;
}

const initialState: ClanState = {
  clan: null,
};

export const clanSlice = createSlice({
  name: "clanSlice",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {},
});

// export const {  } = clanSlice.actions;

export default clanSlice.reducer;
