import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchRequest } from "../../tools/fetchTools";
import { ClaimDailyRewardResponse } from "../../../models/api/CyberFarm/Activity";

export interface ActivityState {
  dailyRewardAvailable: boolean;
  dailyRewardAvailableDay: number;
  rewardsByDay: number[];
  lastClaimedDate: null | number;
}

const initialState: ActivityState = {
  dailyRewardAvailable: false,
  dailyRewardAvailableDay: 0,
  rewardsByDay: [],
  lastClaimedDate: null,
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
    initDailyReward: (state, action) => {
      state.dailyRewardAvailable = action.payload.dailyRewardAvailable;
      state.dailyRewardAvailableDay = action.payload.dailyRewardAvailableDay;
      state.rewardsByDay = action.payload.rewardsByDay;
      state.lastClaimedDate = action.payload.lastClaimedDate;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(claimDailyReward.fulfilled, (state) => {
      state.dailyRewardAvailable = false;
      state.dailyRewardAvailableDay += 1;
      state.lastClaimedDate = Date.now();
    });
  },
});

export const { initDailyReward } = activitySlice.actions;

export default activitySlice.reducer;
