import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRequest } from "../../tools/fetchTools";
import { products } from "../../../constants/cyberfarm/products";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import {
  GetStorageResponse,
  BuyResourceDeflictResponse,
  GetResourcesDeflictResponse,
  GetProductPricesResponse,
  GetProductionEstimateResponse,
} from "../../../models/api/CyberFarm/Resources";
import { buySlot, harvest, produceSlot } from "./slotsSlice";
import { FarmResourceDeficitType } from "../../../types/FarmResourceDeficitType";
import { FarmProductionEstimateType } from "../../../types/FarmProductionEstimateType";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { ExchangeResponse } from "../../../models/api/CyberFarm/Resources";
import { FarmProductsSettingsType } from "../../../types/FarmProductsSettingsType";
import { claimAdReward } from "../tasksSlice";

export interface ResourcesState {
  resources: Record<CyberFarmProductType, number>;
  productPrices: Record<
    CyberFarmProductType,
    {
      price_buy: number;
      price_sell: number;
    }
  >;
  productionEstimate: FarmProductionEstimateType | null;
  resourceDeficit: FarmResourceDeficitType | null;
  productsSettings: FarmProductsSettingsType | null;
}

const initialResources = Object.keys(products).reduce((acc, cur) => {
  acc[cur as CyberFarmProductType] = 0;
  return acc;
}, {} as ResourcesState["resources"]);

const initialProductPrices = Object.keys(products).reduce((acc, cur) => {
  acc[cur as CyberFarmProductType] = {
    price_buy: 0,
    price_sell: 0,
  };
  return acc;
}, {} as ResourcesState["productPrices"]);

const initialState: ResourcesState = {
  resources: initialResources,
  productPrices: initialProductPrices,
  resourceDeficit: null,
  productionEstimate: null,
  productsSettings: null,
};

const buyResourceDeflictUrl = "/ton_cyber_farm/buy_resource_deficit/";
export const buyResourceDeflict = createAsyncThunk<
  BuyResourceDeflictResponse,
  {
    slot_type: EFarmSlotTypes;
    product: CyberFarmProductType;
  }
>("resources/buyResourceDeflict", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<BuyResourceDeflictResponse>(
      buyResourceDeflictUrl,
      "POST",
      {
        product: payload.product,
        slot_type: payload.slot_type,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const exchangeUrl = "/ton_cyber_farm/shop/";
export const exchange = createAsyncThunk<
  ExchangeResponse,
  { product: CyberFarmProductType; amount: number; operation: "buy" | "sell" }
>("resources/exchange", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ExchangeResponse>(exchangeUrl, "POST", {
      product: payload.product,
      amount: payload.amount,
      operation: payload.operation,
    });

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const getStorageUrl = "/ton_cyber_farm/storage/";
export const getStorage = createAsyncThunk<GetStorageResponse, undefined>(
  "resources/getStorage",
  async (_payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<GetStorageResponse>(getStorageUrl);

      return resData;
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);
const getProductPricesUrl = "/ton_cyber_farm/shop/prices/";
export const getProductPrices = createAsyncThunk<
  GetProductPricesResponse,
  undefined
>("resources/getProductPrices", async (_payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<GetProductPricesResponse>(
      getProductPricesUrl
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const getResourcesDeflictUrl = "/ton_cyber_farm/resource_deficit/";
export const getResourcesDeflict = createAsyncThunk<
  GetResourcesDeflictResponse,
  undefined
>("resources/getResourcesDeflict", async (_payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<GetResourcesDeflictResponse>(
      getResourcesDeflictUrl
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const getProductionEstimateUrl = "/ton_cyber_farm/production_estimate/";
export const getProductionEstimate = createAsyncThunk<
  GetProductionEstimateResponse,
  undefined
>("resources/getProductionEstimate", async (_payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<GetProductionEstimateResponse>(
      getProductionEstimateUrl
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
    getCyberFarmResources: (
      state,
      { payload: { resources, resourceDeficit, productsSettings } }
    ) => {
      state.resources = { ...state.resources, ...resources };
      if (resourceDeficit) state.resourceDeficit = resourceDeficit;
      if (productsSettings) state.productsSettings = productsSettings;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buyResourceDeflict.fulfilled, (state, { payload }) => {
      const updatedResources: Partial<Record<CyberFarmProductType, number>> =
        {};

      for (const k in payload.bought) {
        const key = k as CyberFarmProductType;
        updatedResources[key] = state.resources[key] + payload.bought[key];
      }

      state.resources = {
        ...state.resources,
        ...updatedResources,
      };
    });
    builder.addCase(getStorage.fulfilled, (state, { payload }) => {
      state.resources = { ...state.resources, ...payload.resources };
    });
    builder.addCase(getProductPrices.fulfilled, (state, { payload }) => {
      state.productPrices = payload.prices;
    });
    builder.addCase(getResourcesDeflict.fulfilled, (state, { payload }) => {
      state.resourceDeficit = payload.resource_deficit;
    });
    builder.addCase(buySlot.fulfilled, (state, { payload }) => {
      if (payload.cost && "cash_point" in payload.cost) {
        const { cash_point, ...resources } = payload.cost;
        state.resources = {
          ...state.resources,
          ...resources,
        };
      } else {
        state.resources = {
          ...state.resources,
          ...payload.cost,
        };
      }
    });
    builder.addCase(harvest.fulfilled, (state, { payload }) => {
      state.resources = {
        ...state.resources,
        ...payload.resources,
      };
    });
    builder.addCase(getProductionEstimate.fulfilled, (state, { payload }) => {
      state.productionEstimate = payload.production_estimate;
    });
    builder.addCase(produceSlot.fulfilled, (state, { payload }) => {
      if (state.productsSettings) {
        const curProductproductionSettings =
          state.productsSettings?.[payload.product]?.production?.[payload.type]
            ?.requirements;

        if (curProductproductionSettings) {
          const updatedResources = Object.entries(
            curProductproductionSettings
          ).reduce((acc, [k, value]) => {
            const key = k as CyberFarmProductType;
            acc[key] = state.resources[key] - value;
            return acc;
          }, {} as Partial<typeof state.resources>);

          state.resources = {
            ...state.resources,
            ...updatedResources,
          };
        }
      }
    });

    builder.addCase(exchange.fulfilled, (state, { payload }) => {
      if (
        payload &&
        payload.product &&
        state.resources[payload.product] !== undefined
      ) {
        const amount = payload.amount_sold || payload.amount || 0;
        state.resources = {
          ...state.resources,
          [payload.product]: Math.max(
            0,
            (state.resources[payload.product] ?? 0) +
              (payload.operation === "sell" ? -amount : amount)
          ),
        };
      }
    });
    builder.addCase(claimAdReward.fulfilled, (state, { payload }) => {
      if (payload.collect_info) {
        state.resources = {
          ...state.resources,
          ...payload.collect_info.collected_by_product,
        };
      }
    });
  },
});

export const { getCyberFarmResources } = resourcesSlice.actions;

export default resourcesSlice.reducer;
