import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { attackHex } from "./mapSlice";

export interface InfluenceState {
  actionPoints: number;
  influencePoints: number;
  lastRestoreActionPointsTs: number;
}

const initialState: InfluenceState = {
  actionPoints: 0,
  influencePoints: 0,
  lastRestoreActionPointsTs: 0,
};

export const restoreActionPoints =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const currentActionPoints = state.influence.influence.actionPoints;
    const actionPointMax = state.influence.settings.actionPointMax;
    const amount = state.influence.settings.actionPointRestore.amount;

    const newActionPoints = Math.min(
      currentActionPoints + amount,
      actionPointMax
    );

    dispatch(influenceSlice.actions.setActionPoints(newActionPoints));
  };

export const influenceSlice = createSlice({
  name: "influenceSlice",
  initialState,
  reducers: {
    initInfluence: (state, action) => {
      return { ...state, ...action.payload };
    },
    setActionPoints: (state, { payload }) => {
      state.actionPoints = payload;
      state.lastRestoreActionPointsTs = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(attackHex.fulfilled, (state, { payload }) => {
      state.actionPoints = payload.action_points_current;
      state.influencePoints = payload.victory_points;
    });
  },
});

export const { initInfluence } = influenceSlice.actions;

export default influenceSlice.reducer;
