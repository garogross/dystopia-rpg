import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRequest } from "../../tools/fetchTools";
import { products } from "../../../constants/cyberfarm/products";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import { BuyProductResponse } from "../../../models/api/CyberFarm/Resources";

export interface ResourcesState {
  resources: Record<keyof typeof products, number>;
  productCosts: Record<keyof typeof products, number>;
}

const initialResources = Object.keys(products).reduce((acc, cur) => {
  acc[cur as CyberFarmProductType] = 0;
  return acc;
}, {} as ResourcesState["resources"]);

const initialState: ResourcesState = {
  resources: initialResources,
  productCosts: initialResources,
};

const buyProductUrl = "/ton_cyber_farm/buy_product/";
export const buyProduct = createAsyncThunk<
  BuyProductResponse,
  { amount: number; product: CyberFarmProductType }
>("resources/buyProduct", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<BuyProductResponse>(
      buyProductUrl,
      "POST",
      {
        product: payload.product,
        amount: payload.amount,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

export const resourcesSlice = createSlice({
  name: "resourcesSlice",
  initialState,
  reducers: {
    getCyberFarmResources: (state, { payload: { resources, productCosts } }) => {
      state.resources = { ...state.resources, ...resources };
      state.productCosts = { ...state.resources, ...productCosts };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buyProduct.fulfilled, (state, { payload }) => {
      state.resources = {
        ...state.resources,
        [payload.product]: state.resources[payload.product] + payload.amount,
      };
    });
  },
});

export const { getCyberFarmResources } = resourcesSlice.actions;

export default resourcesSlice.reducer;
