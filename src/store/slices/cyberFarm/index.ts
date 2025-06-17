import { combineReducers } from "@reduxjs/toolkit";
import slotsReducer from "./slotsSlice";
import globalCyberfarmReducer from "./cyberfarmSlice";
import resourcesSlice from "./resourcesSlice";
import activitySlice from "./activitySlice";
import socialShopSlice from "./socialShopSlice";

export const cyberfarmReducer = combineReducers({
  global: globalCyberfarmReducer,
  slots: slotsReducer,
  resources: resourcesSlice,
  activity: activitySlice,
  socialShop: socialShopSlice,
});

export type CyberfarmState = ReturnType<typeof cyberfarmReducer>;
