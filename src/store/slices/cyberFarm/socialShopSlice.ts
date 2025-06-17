import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SocialShopType } from "../../../types/SocialShopType";
import { ExchangeResponse } from "../../../models/api/CyberFarm/SocialShop";
import { fetchRequest } from "../../tools/fetchTools";

export interface SocialShopState {
  socialShop: SocialShopType | null;
  availableIn: null | number;
}

const initialState: SocialShopState = {
  socialShop: null,
  availableIn: null,
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
      state.socialShop = action.payload.socialShop;
      state.availableIn = action.payload.availableIn;
    },
    setAvailableIn: (state, action) => {
      state.availableIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exchange.fulfilled, (state) => {
      state.availableIn = Date.now() + 6 * 60 * 60 * 1000;
    });
  },
});

export const { initSocialShop, setAvailableIn } = socialShopSlice.actions;

export default socialShopSlice.reducer;
