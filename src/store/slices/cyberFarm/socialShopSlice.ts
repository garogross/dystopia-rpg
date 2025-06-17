import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SocialShopType } from "../../../types/SocialShopType";
import { ExchangeResponse } from "../../../models/api/CyberFarm/SocialShop";
import { fetchRequest } from "../../tools/fetchTools";

export interface SocialShopState {
  socialShop: SocialShopType | null;
}

const initialState: SocialShopState = {
  socialShop: null,
};

const exchangeUrl = "/ton_cyber_farm/social_shop/";
export const exchange = createAsyncThunk<ExchangeResponse, string>(
  "socialShop/exchange",
  async (payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<ExchangeResponse>(
        exchangeUrl,
        "POST",
        { operation_id: payload }
      );

      return resData;
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);

export const socialShopSlice = createSlice({
  name: "socialShopSlice",
  initialState,
  reducers: {
    initSocialShop: (state, action) => {
      state.socialShop = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { initSocialShop } = socialShopSlice.actions;

export default socialShopSlice.reducer;
