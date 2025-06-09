import { createSlice } from "@reduxjs/toolkit";
import { FeedItem } from "taddy-sdk-web";

export interface ClanState {
  taddyTasks: FeedItem[];
}

const initialState: ClanState = {
  taddyTasks: [],
};

export const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
   setTadyTasks: (state, action) => {
     state.taddyTasks = action.payload;
   }
  },
  extraReducers: (builder) => {},
});

export const { setTadyTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
