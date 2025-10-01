import { combineReducers } from "@reduxjs/toolkit";
import slotsReducer from "./slotsSlice";
import globalCyberfarmReducer from "./cyberfarmSlice";
import resourcesSlice from "./resourcesSlice";
import activitySlice from "./activitySlice";
import achievmentsSlice from "./achievmentsSlice";
import tutorialSlice from "./tutorialSlice";
import ratingsSlice from "./ratingsSlice";

export const cyberfarmReducer = combineReducers({
  global: globalCyberfarmReducer,
  slots: slotsReducer,
  resources: resourcesSlice,
  activity: activitySlice,
  achievments: achievmentsSlice,
  tutorial: tutorialSlice,
  ratings: ratingsSlice,
});

export type CyberfarmState = ReturnType<typeof cyberfarmReducer>;
