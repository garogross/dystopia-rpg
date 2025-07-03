import { combineReducers } from "@reduxjs/toolkit";
import achievmentsSlice from "./achievmentsSlice";

export const hackterminalReducer = combineReducers({
  achievments: achievmentsSlice,
});

export type HackterminalState = ReturnType<typeof hackterminalReducer>;
