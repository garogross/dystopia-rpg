import { combineReducers } from "@reduxjs/toolkit";
import globalBubbleFrontReducer from "./bubbleFrontSlice";

export const bubbleFrontReducer = combineReducers({
  global: globalBubbleFrontReducer,
});

export type BubbleFrontState = ReturnType<typeof bubbleFrontReducer>;
