import { combineReducers } from "@reduxjs/toolkit";
import achievmentsSlice from "./achievmentsSlice";

export const puzzleReducer = combineReducers({
  achievments: achievmentsSlice,
});

export type PuzzleState = ReturnType<typeof puzzleReducer>;
