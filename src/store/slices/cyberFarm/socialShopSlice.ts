import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SocialShopType } from "../../../types/SocialShopType";
import {
  ExchangeResponse,
  UpdateTimersResponse,
} from "../../../models/api/CyberFarm/SocialShop";
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
        {
          product: "organic_meat", // название продукта
          amount: 10,
        }
      );

      return resData;
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);
const updateTimersUrl = "/ton_cyber_farm/timers/";
export const updateTimers = createAsyncThunk<UpdateTimersResponse, undefined>(
  "socialShop/updateTimers",
  async (_payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<UpdateTimersResponse>(updateTimersUrl);

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
    builder.addCase(updateTimers.fulfilled, (state, { payload }) => {
      state.availableIn = payload.timers.social_shop.cooldown_until_ts;
    });
  },
});

export const { initSocialShop, setAvailableIn } = socialShopSlice.actions;

export default socialShopSlice.reducer;
