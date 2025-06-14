import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import {
  BuySlotResponse,
  HarvestResponse,
  ProduceSlotResponse,
} from "../../../models/api/CyberFarm/Slots";
import { fetchRequest } from "../../tools/fetchTools";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import { IFarmSlot } from "../../../models/CyberFarm/IFarmSlot";
import { FarmSlotCostsType } from "../../../types/FarmSlotCostsType";

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
  BuySlotResponse,
  { id: string; type: EFarmSlotTypes }
>("slots/buySlot", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<BuySlotResponse>(buySlotUrl, "POST", {
      slot_id: payload.id,
      action: payload.type,
    });

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});
const produceSlotUrl = "/ton_cyber_farm/produce/";
export const produceSlot = createAsyncThunk<
  ProduceSlotResponse & { type: EFarmSlotTypes },
  { id: string; product: CyberFarmProductType; type: EFarmSlotTypes }
>("slots/produceSlot", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ProduceSlotResponse>(
      produceSlotUrl,
      "POST",
      {
        slot_id: payload.id,
        product: payload.product,
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
        [payload.slot_id]: { type: payload.type },
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