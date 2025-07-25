import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRequest } from "../../tools/fetchTools";
import { products } from "../../../constants/cyberfarm/products";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import {
  BuyProductResponse,
  GetStorageResponse,
  SellProductResponse,
  BuyResourceDeflictResponse,
  GetResourcesDeflictResponse,
} from "../../../models/api/CyberFarm/Resources";
import { FarmProductionChainsType } from "../../../types/FarmProductionChainsType";
import { buySlot, harvest, produceSlot } from "./slotsSlice";
import { exchange } from "./socialShopSlice";
import { FarmResourceDeficitType } from "../../../types/FarmResourceDeficitType";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";

export interface ResourcesState {
  resources: Record<CyberFarmProductType, number>;
  productCosts: Record<CyberFarmProductType, number>;
  productionChains: FarmProductionChainsType | null;
  resourceDeficit: FarmResourceDeficitType | null;
  resourceTonValue: Partial<Record<CyberFarmProductType, number>>;
  totalEstimatedCostInTon: number;
  totalEstimatedCostInCp: number;
}

const initialResources = Object.keys(products).reduce((acc, cur) => {
  acc[cur as CyberFarmProductType] = 0;
  return acc;
}, {} as ResourcesState["resources"]);

const initialState: ResourcesState = {
  resources: initialResources,
  productCosts: initialResources,
  productionChains: null,
  resourceDeficit: null,
  resourceTonValue: {},
  totalEstimatedCostInTon: 0,
  totalEstimatedCostInCp: 0,
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

const sellProductUrl = "/ton_cyber_farm/exchange_ton/";
export const sellProduct = createAsyncThunk<
  SellProductResponse,
  { amount: number; product: CyberFarmProductType }
>("resources/sellProduct", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<SellProductResponse>(
      sellProductUrl,
      "POST",
      {
        resource: payload.product,
        amount: payload.amount,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});
const buyResourceDeflictUrl = "/ton_cyber_farm/buy_resource_deficit/";
export const buyResourceDeflict = createAsyncThunk<
  BuyResourceDeflictResponse,
  {
    slot_type: EFarmSlotTypes;
    product: CyberFarmProductType;
    tutorial?: boolean;
  }
>("resources/buyResourceDeflict", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<BuyResourceDeflictResponse>(
      buyResourceDeflictUrl,
      "POST",
      {
        product: payload.product,
        slot_type: payload.slot_type,
        tutorial: payload.tutorial,
      }
    );

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

export const resourcesSlice = createSlice({
  name: "resourcesSlice",
  initialState,
  reducers: {
    getCyberFarmResources: (
      state,
      {
        payload: {
          resources,
          productCosts,
          productionChains,
          resourceTonValue,
          resourceDeficit,
        },
      }
    ) => {
      state.resources = { ...state.resources, ...resources };
      state.productCosts = { ...state.resources, ...productCosts };
      if (productionChains) state.productionChains = productionChains;
      if (resourceTonValue) state.resourceTonValue = resourceTonValue;
      if (resourceDeficit) state.resourceDeficit = resourceDeficit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buyProduct.fulfilled, (state, { payload }) => {
      state.resources = {
        ...state.resources,
        [payload.product]: state.resources[payload.product] + payload.amount,
      };
    });
    builder.addCase(sellProduct.fulfilled, (state, { payload }) => {
      state.resources = {
        ...state.resources,
        [payload.resource]:
          state.resources[payload.resource] - payload.amount_exchanged,
      };
    });
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
      state.resourceTonValue = payload.resource_ton_value;
      state.resources = { ...state.resources, ...payload.resources };
      state.totalEstimatedCostInTon = payload.estimated_cost.total_in_ton;
      state.totalEstimatedCostInCp = payload.estimated_cost.total;
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
    builder.addCase(produceSlot.fulfilled, (state, { payload }) => {
      if (state.productionChains) {
        const curProductproductionChains =
          state.productionChains[payload.type]?.[payload.product].input;

        if (curProductproductionChains) {
          const updatedResources = Object.entries(
            curProductproductionChains
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
      const updatedRes: Partial<typeof state.resources> = {};

      for (let k in payload.reward) {
        const key = k as keyof typeof payload.reward;
        if (key === "cash_point") continue;

        updatedRes[key] = state.resources[key] + payload.reward[key];
      }

      state.resources = {
        ...state.resources,
        metal_cactus: payload.cactus_left,
        ...updatedRes,
      };
    });
  },
});

export const { getCyberFarmResources } = resourcesSlice.actions;

export default resourcesSlice.reducer;
