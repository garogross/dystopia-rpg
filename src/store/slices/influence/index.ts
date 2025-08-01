import { combineReducers } from "@reduxjs/toolkit";
import mapSlice from "./mapSlice";
import settingsSlice from "./settingsSlice";
import influenceSlice from "./influenceSlice";
import mailSlice from "./mailSlice";

export const influenceReducer = combineReducers({
  influence: influenceSlice,
  map: mapSlice,
  settings: settingsSlice,
  mail: mailSlice,
});

export type InfluenceState = ReturnType<typeof influenceReducer>;
