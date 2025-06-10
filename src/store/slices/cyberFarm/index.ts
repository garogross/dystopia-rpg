import { combineReducers } from "@reduxjs/toolkit";
import slotsReducer from "./slotsSlice";
import globalCyberfarmReducer from "./cyberfarmSlice";

export const cyberfarmReducer = combineReducers({
  global: globalCyberfarmReducer,
  slots: slotsReducer,
});

export type CyberfarmState = ReturnType<typeof cyberfarmReducer>;
