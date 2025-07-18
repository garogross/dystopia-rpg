import { combineReducers } from "@reduxjs/toolkit";
import mapSlice from "./mapSlice";
import settingsSlice from "./settingsSlice";
import influenceSlice from "./influenceSlice";

export const influenceReducer = combineReducers({
  influence: influenceSlice,
  map: mapSlice,
  settings: settingsSlice,
});

export type InfluenceState = ReturnType<typeof influenceReducer>;
