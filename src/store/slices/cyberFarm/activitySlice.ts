import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchRequest } from "../../tools/fetchTools";
import { ClaimDailyRewardResponse } from "../../../models/api/CyberFarm/Activity";

export interface ActivityState {
  dailyRewardAvailable: boolean;
}

const initialState: ActivityState = {
  dailyRewardAvailable: false,
};

const claimDailyRewardUrl = "/ton_cyber_farm/claim_daily_login/";
export const claimDailyReward = createAsyncThunk<
  ClaimDailyRewardResponse,
  undefined
>("activity/claimDailyReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ClaimDailyRewardResponse>(
      claimDailyRewardUrl,
      "POST",
      {}
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

export const activitySlice = createSlice({
  name: "activitySlice",
  initialState,
  reducers: {
    setDailyReward: (state, action) => {
      state.dailyRewardAvailable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(claimDailyReward.fulfilled, (state) => {
      state.dailyRewardAvailable = false;
    });
  },
});

export const { setDailyReward } = activitySlice.actions;

export default activitySlice.reducer;
