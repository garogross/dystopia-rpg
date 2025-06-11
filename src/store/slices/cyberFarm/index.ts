import { combineReducers } from "@reduxjs/toolkit";
import slotsReducer from "./slotsSlice";
import globalCyberfarmReducer from "./cyberfarmSlice";
import resourcesSlice from "./resourcesSlice";

export const cyberfarmReducer = combineReducers({
  global: globalCyberfarmReducer,
  slots: slotsReducer,
  resources: resourcesSlice,
});

export type CyberfarmState = ReturnType<typeof cyberfarmReducer>;
