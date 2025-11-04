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
  myRank: {
    structures: {
      total: number;
      user_id: number;
      rank: number;
      structures_value: number;
      fields: number;
      farms: number;
      factories: number;
      farm_upgrade_levels: number;
      factory_upgrade_levels: number;
    };
    wealth: {
      total: number;
      user_id: number;
      rank: number;
      total_value: number;
      resources_cost: number;
      production_cost: number;
      unsorted_products_cost: number;
      structures_value: number;
    };
  } | null;
}

const initialState: RatingsState = {
  structuresRankData: null,
  wealthRankData: null,
  myRank: null,
};

const getRatingsListUrl = "/ton_cyber_farm/rankings/";
export const getRatingsList = createAsyncThunk<
  GetRatingsListResponse,
  undefined
>("ratings/getRatingsList", async (_payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<GetRatingsListResponse>(
      getRatingsListUrl + "?limit=300"
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
      state.myRank = payload.my_rank;
    });
  },
});

// export const {  } = ratingsSlice.actions;

export default ratingsSlice.reducer;
