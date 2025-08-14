import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { fetchRequest } from "../../tools/fetchTools";
import { RestoreAPResponse } from "../../../models/api/Influence/Influence";
import { attackHex } from "./mapSlice";
import { EadProviders } from "../../../constants/EadProviders";
import { EAdActionTypes } from "../../../constants/EadActionTypes";

export interface InfluenceState {
  actionPoints: number;
  influencePoints: number;
  lastRestoreActionPointsTs: number;
  restoreModalOpened: boolean;
  restoreModalOpenedType: "restore" | "fill";
}

const initialState: InfluenceState = {
  actionPoints: 0,
  influencePoints: 0,
  lastRestoreActionPointsTs: 0,
  restoreModalOpened: false,
  restoreModalOpenedType: "restore",
};

const restoreAPUrl = "/influence/buy_action_points/";
export const restoreAP = createAsyncThunk<
  RestoreAPResponse,
  {
    method: "buy" | "ad";
    provider?: EadProviders;
    ad_type?: EAdActionTypes;
  }
>("influence/restoreAP", async (payload, { rejectWithValue, getState }) => {
  try {
    const resData = await fetchRequest<RestoreAPResponse>(
      restoreAPUrl,
      "POST",
      {
        method: payload.method,
        provider: payload.provider,
        ad_type: payload.ad_type,
      }
    );
    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

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
    openRestoreModal: (state, { payload }) => {
      state.restoreModalOpened = true;
      state.restoreModalOpenedType = payload;
    },
    closeRestoreModal: (state) => {
      state.restoreModalOpened = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(attackHex.fulfilled, (state, { payload }) => {
      state.actionPoints = payload.action_points_current;
      state.influencePoints = payload.victory_points;
    });
    builder.addCase(restoreAP.fulfilled, (state, { payload }) => {
      state.actionPoints = payload.action_points_current;
    });
  },
});

export const { initInfluence, openRestoreModal, closeRestoreModal } =
  influenceSlice.actions;

export default influenceSlice.reducer;
