import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchRequest } from "../../tools/fetchTools";
import {
  IFarmUserStructuresRankRating,
  IFarmUserWealthRankRating,
} from "../../../models/CyberFarm/IFarmUserRating";
import { GetRatingsListResponse } from "../../../models/api/CyberFarm/Ratings";

export interface RatingsState {
  structuresRankData: IFarmUserStructuresRankRating[] | null;
  wealthRankData: IFarmUserWealthRankRating[] | null;
}

const initialState: RatingsState = {
  structuresRankData: null,
  wealthRankData: null,
};

const getRatingsListUrl = "/ton_cyber_farm/rankings/";
export const getRatingsList = createAsyncThunk<
  GetRatingsListResponse,
  undefined
>("ratings/getRatingsList", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<GetRatingsListResponse>(
      getRatingsListUrl
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

export const ratingsSlice = createSlice({
  name: "ratingsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRatingsList.fulfilled, (state, { payload }) => {
      state.structuresRankData = payload.structures_rank.items;
      state.wealthRankData = payload.wealth_rank.items;
    });
  },
});

// export const {  } = ratingsSlice.actions;

export default ratingsSlice.reducer;
