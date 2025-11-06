import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EFarmSlotTypes } from "../../../constants/cyberfarm/EFarmSlotTypes";
import {
  AddModuleToSlotResponse,
  BuySlotResponse,
  HarvestResponse,
  ProduceSlotResponse,
  SpeedUpResponse,
} from "../../../models/api/CyberFarm/Slots";
import { fetchRequest } from "../../tools/fetchTools";
import { CyberFarmProductType } from "../../../types/CyberFarmProductType";
import { IFarmSlot } from "../../../models/CyberFarm/IFarmSlot";
import { FarmSlotCostsType } from "../../../types/FarmSlotCostsType";
import { getFarmSlotCost } from "../../../utils/getFarmSlotCost";
import { claimAdReward } from "../tasksSlice";
import { getProductionEstimate } from "./resourcesSlice";
import { FarmSlotsUpgradeLevelType } from "../../../types/FarmSlotsUpgradeLevelType";
import { WorkshopSlotCostsType } from "../../../types/WorkshopSlotCostsType";
import { IWorkshopSlot } from "../../../models/CyberFarm/IWorkshopSlot";
import { EModuleProducts } from "../../../constants/cyberfarm/EModuleProducts";
import { EFarmSlotModules } from "../../../constants/cyberfarm/EFarmSlotModules";

export interface SlotsState {
  slots: Record<string, IFarmSlot> | null;
  workshopSlots: Record<string, IWorkshopSlot> | null;
  slotCosts: FarmSlotCostsType | null;
  workshopSlotCosts: WorkshopSlotCostsType | null;
  upgradeLevels: FarmSlotsUpgradeLevelType | null;
  moduleLimits: Record<EModuleProducts, Record<EFarmSlotTypes, number>>;
}

const initialState: SlotsState = {
  slots: null,
  workshopSlots: null,
  slotCosts: null,
  workshopSlotCosts: null,
  upgradeLevels: null,
  moduleLimits: {
    [EModuleProducts.Production]: {
      [EFarmSlotTypes.FACTORY]: 0,
      [EFarmSlotTypes.FARM]: 0,
      [EFarmSlotTypes.FIELDS]: 0,
      [EFarmSlotTypes.WORKSHOP]: 0,
    },
    [EModuleProducts.Autonomy]: {
      // this is static
      [EFarmSlotTypes.FACTORY]: 1,
      [EFarmSlotTypes.FARM]: 1,
      [EFarmSlotTypes.FIELDS]: 1,
      [EFarmSlotTypes.WORKSHOP]: 1,
    },
    [EModuleProducts.Acceleration]: {
      [EFarmSlotTypes.FACTORY]: 0,
      [EFarmSlotTypes.FARM]: 0,
      [EFarmSlotTypes.FIELDS]: 0,
      [EFarmSlotTypes.WORKSHOP]: 0,
    },
  },
};

const buySlotUrl = "/ton_cyber_farm/buy_slot/";
export const buySlot = createAsyncThunk<
  BuySlotResponse & { cost: ReturnType<typeof getFarmSlotCost> },
  {
    id: string;
    type: EFarmSlotTypes;
    byCp?: boolean;
    isUpgrade?: boolean;
    cost?: ReturnType<typeof getFarmSlotCost>;
  }
>("slots/buySlot", async (payload, { rejectWithValue }) => {
  try {
    let action: EFarmSlotTypes | "upgrade" | "destroy" = payload.type;
    if (payload.isUpgrade) action = "upgrade";
    const resData = await fetchRequest<BuySlotResponse>(buySlotUrl, "POST", {
      slot_id: payload.id,
      action: action,
      payment_method: payload.byCp ? "cash_point" : "metal",
    });

    return { ...resData, cost: payload.cost };
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const addModuleToSlotUrl = "/ton_cyber_farm/modules/";
export const addModuleToSlot = createAsyncThunk<
  AddModuleToSlotResponse,
  {
    slot_id: string;
    slot_type: EFarmSlotTypes;
    module_type: EFarmSlotModules;
    action: "install" | "remove";
    amount?: number;
  }
>("slots/addModuleToSlot", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<AddModuleToSlotResponse>(
      addModuleToSlotUrl,
      "POST",
      {
        slot_id: payload.slot_id,
        slot_type: payload.slot_type,
        module_type: payload.module_type,
        action: payload.action,
        amount: payload.amount,
      }
    );

    return resData;
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
  { id: string; clb?: () => Promise<void>; byAd?: boolean }
>("slots/speedUp", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<SpeedUpResponse>(speedUpUrl, "POST", {
      slot_id: payload.id,
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
      state.workshopSlots = action.payload.workshopSlots;
      state.workshopSlotCosts = action.payload.workshopSlotCosts;
      state.moduleLimits = {
        ...state.moduleLimits,
        ...action.payload.moduleLimits,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buySlot.fulfilled, (state, { payload }) => {
      if (
        payload.type === EFarmSlotTypes.WORKSHOP &&
        payload.workshop_slot_id
      ) {
        state.workshopSlots = {
          ...state.workshopSlots,
          [payload.workshop_slot_id]: {
            type: payload.type,
            updated_at: Date.now(),
            level: payload.level || 1,
          },
        };
      } else {
        if (payload.slot_id) {
          state.slots = {
            ...state.slots,
            [payload.slot_id]: {
              type: payload.type,
              updated_at: Date.now(),
              level: payload.level || 1,
            },
          };
        }
      }
    });
    builder.addCase(produceSlot.fulfilled, (state, { payload }) => {
      // Fix: Ensure only valid workshop products are handled in workshopSlots
      if (
        payload.product === "chips" ||
        payload.product === EModuleProducts.Acceleration ||
        payload.product === EModuleProducts.Autonomy ||
        payload.product === EModuleProducts.Production
      ) {
        state.workshopSlots = {
          ...state.workshopSlots,
          [payload.slot_id]: {
            ...(state.workshopSlots?.[payload.slot_id] || {}),
            type: EFarmSlotTypes.WORKSHOP,
            updated_at: Date.now(),
            level: state.workshopSlots?.[payload.slot_id]?.level ?? 1,
            product: payload.product,
            start_time: payload.start_time,
            finish_time: payload.finish_time,
            final_production: payload.final_production,
          },
        };
      } else {
        state.slots = {
          ...state.slots,
          [payload.slot_id]: {
            ...(state.slots || {})[payload.slot_id],
            product: payload.product,
            start_time: payload.start_time,
            finish_time: payload.finish_time,
            final_production: payload.final_production,
          },
        };
      }
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
            ad_production_bonus_received: false,
          },
        };
      }
    });
    builder.addCase(claimAdReward.fulfilled, (state, { payload }) => {
      const slotId = payload.bonus_distribution?.farm_slot;

      // update bonus statuses
      if (state.slots) {
        if (slotId && payload.game_action) {
          state.slots = {
            ...state.slots,
            [slotId]: {
              ...state.slots?.[slotId],
              ad_production_bonus_received: true,
              final_production: payload?.final_production || 0,
            },
          };
        }

        if (payload.collect_info) {
          const updatedSots = payload.collect_info.collected_slots.reduce(
            (acc, cur) => {
              if (state.slots && state.slots[cur]) {
                acc[cur] = {
                  ...state.slots[cur],
                  product: undefined,
                  start_time: undefined,
                  finish_time: undefined,
                  ad_production_bonus_received: false,
                };
              }
              return acc;
            },
            {} as Record<string, IFarmSlot>
          );
          const updatedWorkshopSots =
            payload.collect_info.collected_slots.reduce((acc, cur) => {
              if (state.workshopSlots && state.workshopSlots[cur]) {
                acc[cur] = {
                  ...state.workshopSlots[cur],
                  product: undefined,
                  start_time: undefined,
                  finish_time: undefined,
                  ad_production_bonus_received: false,
                };
              }
              return acc;
            }, {} as Record<string, IWorkshopSlot>);

          state.slots = { ...state.slots, ...updatedSots };
          state.workshopSlots = {
            ...state.workshopSlots,
            ...updatedWorkshopSots,
          };
        }
      }
    });
    builder.addCase(addModuleToSlot.fulfilled, (state, { payload }) => {
      if (payload.slot_type === EFarmSlotTypes.WORKSHOP) {
        const updatedSlot = state.workshopSlots?.[payload.slot_id];
        if (updatedSlot)
          state.workshopSlots = {
            ...state.workshopSlots,
            [payload.slot_id]: {
              ...updatedSlot,
              modules: payload.modules,
            },
          };
      }
      {
        const updatedSlot = state.slots?.[payload.slot_id];
        if (updatedSlot)
          state.slots = {
            ...state.slots,
            [payload.slot_id]: {
              ...updatedSlot,
              modules: payload.modules,
            },
          };
      }
    });
    builder.addCase(getProductionEstimate.fulfilled, (state, { payload }) => {
      state.upgradeLevels = payload.final_production_per_upgrade_level.algae; // data is same for all products
    });
  },
});

export const { getCyberFarmSlots } = slotsSlice.actions;

export default slotsSlice.reducer;
