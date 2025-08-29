import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import {
  BuySlotResponse,
  HarvestResponse,
  ProduceSlotResponse,
  SpeedUpResponse,
} from "../../../models/api/CyberFarm/Slots";
import { fetchRequest } from "../../tools/fetchTools";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import { IFarmSlot } from "../../../models/CyberFarm/IFarmSlot";
import { FarmSlotCostsType } from "../../../types/FarmSlotCostsType";
import { getSlotCost } from "../../../utils/getSlotCost";

export interface SlotsState {
  slots: Record<string, IFarmSlot> | null;
  slotCosts: FarmSlotCostsType | null;
}

const initialState: SlotsState = {
  slots: null,
  slotCosts: null,
};

const buySlotUrl = "/ton_cyber_farm/buy_slot/";
export const buySlot = createAsyncThunk<
  BuySlotResponse & { cost: ReturnType<typeof getSlotCost> },
  {
    id: string;
    type: EFarmSlotTypes;
    byCp?: boolean;
    tutorial?: boolean;
    cost: ReturnType<typeof getSlotCost>;
  }
>("slots/buySlot", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<BuySlotResponse>(buySlotUrl, "POST", {
      slot_id: payload.id,
      action: payload.type,
      tutorial: payload.tutorial,
      payment_method: payload.byCp ? "cash_point" : "metal",
    });

    return { ...resData, cost: payload.cost };
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});
const produceSlotUrl = "/ton_cyber_farm/produce/";
export const produceSlot = createAsyncThunk<
  ProduceSlotResponse & { type: EFarmSlotTypes },
  {
    id: string;
    product: CyberFarmProductType;
    type: EFarmSlotTypes;
    payment_method: "cash_point" | "metal";
  }
>("slots/produceSlot", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ProduceSlotResponse>(
      produceSlotUrl,
      "POST",
      {
        slot_id: payload.id,
        product: payload.product,
        payment_method: payload.payment_method,
      }
    );

    return { ...resData, type: payload.type };
  } catch (error) {
    return rejectWithValue(error);
  }
});

const harvestUrl = "/ton_cyber_farm/harvest/";
export const harvest = createAsyncThunk<
  HarvestResponse,
  { id: string; clb?: () => Promise<void> }
>("slots/harvest", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<HarvestResponse>(harvestUrl, "POST", {
      slot_id: payload.id,
    });
    await payload.clb?.();

    return resData;
  } catch (error) {
    return rejectWithValue(error);
  }
});
const speedUpUrl = "/ton_cyber_farm/speed_up/";
export const speedUp = createAsyncThunk<
  SpeedUpResponse,
  { id: string; clb?: () => Promise<void>; byAd?: boolean; tutorial?: boolean }
>("slots/speedUp", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<SpeedUpResponse>(speedUpUrl, "POST", {
      slot_id: payload.id,
      tutorial: payload.tutorial,
      payment_method: payload.byAd ? "ad" : "cash_point",
    });
    await payload.clb?.();

    return resData;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const slotsSlice = createSlice({
  name: "slotsSlice",
  initialState,
  reducers: {
    getCyberFarmSlots: (state, action) => {
      state.slots = action.payload.slots;
      state.slotCosts = action.payload.slotCosts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buySlot.fulfilled, (state, { payload }) => {
      state.slots = {
        ...state.slots,
        [payload.slot_id]: { type: payload.type, updated_at: Date.now() },
      };
    });
    builder.addCase(produceSlot.fulfilled, (state, { payload }) => {
      state.slots = {
        ...state.slots,
        [payload.slot_id]: {
          ...(state.slots || {})[payload.slot_id],
          product: payload.product,
          start_time: payload.start_time,
          finish_time: payload.finish_time,
        },
      };
    });
    builder.addCase(harvest.fulfilled, (state, { payload }) => {
      if (state.slots) {
        state.slots = {
          ...state.slots,
          [payload.slot_id]: {
            ...state.slots?.[payload.slot_id],
            product: undefined,
            start_time: undefined,
            finish_time: undefined,
          },
        };
      }
    });
  },
});

export const { getCyberFarmSlots } = slotsSlice.actions;

export default slotsSlice.reducer;
