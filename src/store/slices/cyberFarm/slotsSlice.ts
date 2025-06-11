import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import { BuySlotResponse } from "../../../models/api/CyberFarm/Slots";
import { fetchRequest } from "../../tools/fetchTools";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import { IFarmSlot } from "../../../models/CyberFarm/IFarmSlot";
import { FarmSlotCostsType } from "../../../types/FarmSlotCostsType";

export interface SlotsState {
  slots: Record<string, IFarmSlot> | null;
  slotCosts: FarmSlotCostsType | null
}

const initialState: SlotsState = {
  slots: null,
  slotCosts: null
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
  BuySlotResponse,
  { id: string; product: CyberFarmProductType }
>("slots/produceSlot", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<BuySlotResponse>(produceSlotUrl, "POST", {
      slot_id: payload.id,
      product: payload.product,
    });

    return resData;
  } catch (error: any) {
    console.error("error", error);
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
        [payload.slot_id]: { type: payload.type },
      };
    });
  },
});

export const { getCyberFarmSlots } = slotsSlice.actions;

export default slotsSlice.reducer;
