import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRequest } from "../tools/fetchTools";
import { ClaimTraffyRewardResponse } from "../../models/api/tasks/traffy";
import { ClaimWallgramRewardResponse } from "../../models/api/tasks/wallgram";
import { VerifyGigaHashResponse } from "../../models/api/tasks/giga";
import { IPromoTask } from "../../models/IPromoTask";
import { GetPromoTaskRewardResponse } from "../../models/api/tasks/promoTasks";
import {
  ClaimAdRewardResponse,
  GetAdRewardSettingsResponse,
} from "../../models/api/tasks/tasks";
import { AdRewardSettingsType } from "../../types/tasks/AdRewardSettingsType";
import { MediationType } from "../../types/tasks/MediationsType";
import { AdRewardValidPairsType } from "../../types/tasks/AdRewardValidPairsType";

export interface TasksState {
  promoTasks: IPromoTask[];
  rewardTaddy: number;
  adRewardSettings: AdRewardSettingsType | null;
  mediation: MediationType | null;
}

const initialState: TasksState = {
  promoTasks: [],
  rewardTaddy: 0,
  adRewardSettings: null,
  mediation: null,
};

const getPromoTasksUrl = "/promo_tasks/";
export const getPromoTasks = createAsyncThunk<IPromoTask[], undefined>(
  "tasks/getPromoTasks",
  async (_payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<{ tasks: IPromoTask[] }>(
        getPromoTasksUrl
      );

      return resData?.tasks || [];
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);

const getAdMeditationUrl = "/ad_mediation/";
export const getAdMeditation = createAsyncThunk<MediationType, undefined>(
  "tasks/getAdMeditation",
  async (_payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<MediationType>(getAdMeditationUrl);

      return resData || [];
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);

const getPromoTaskRewardUrl = "/promo_tasks/reward/";
export const getPromoTaskReward = createAsyncThunk<
  GetPromoTaskRewardResponse,
  { id: number | string },
  { rejectValue: { id: number | string } }
>("tasks/getPromoTaskReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<GetPromoTaskRewardResponse>(
      getPromoTaskRewardUrl,
      "POST",
      {
        task_id: payload.id,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue({ id: payload.id });
  }
});

const claimAdRewardUrl = "/reward/ad/";
export const claimAdReward = createAsyncThunk<
  ClaimAdRewardResponse,
  AdRewardValidPairsType & {
    slotId?: string;
    identifier?: string;
    value?: number;
  }
>("tasks/claimAdReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ClaimAdRewardResponse>(
      claimAdRewardUrl,
      "POST",
      {
        provider: payload.provider,
        ad_type: payload.ad_type,
        identifier: payload.identifier,
        value: payload.value,
        slot_id: payload.slotId,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const getAdRewardSettingsUrl = "/reward_ad/settings/";
export const getAdRewardSettings = createAsyncThunk<
  GetAdRewardSettingsResponse,
  undefined
>("tasks/getAdRewardSettings", async (_, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<GetAdRewardSettingsResponse>(
      getAdRewardSettingsUrl
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const claimTraffyRewardUrl = "/reward/traffy/";
export const claimTraffyReward = createAsyncThunk<
  ClaimTraffyRewardResponse,
  { signedToken: string; id: string }
>("tasks/claimTraffyReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ClaimTraffyRewardResponse>(
      claimTraffyRewardUrl,
      "POST",
      {
        signedToken: payload.signedToken,
        id: payload.id,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const claimWallgramRewardUrl = "/reward/wallgram/";
export const claimWallgramReward = createAsyncThunk<
  ClaimWallgramRewardResponse,
  {
    taskId: string;
    value: number;
  }
>("tasks/claimWallgramReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ClaimWallgramRewardResponse>(
      claimWallgramRewardUrl,
      "POST",
      {
        taskId: payload.taskId,
        value: payload.value,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const verifyGigaHashUrl = "/reward/giga/";
export const verifyGigaHash = createAsyncThunk<
  VerifyGigaHashResponse & { amount: number },
  {
    rewardId: string | number;
    userId: string;
    projectId: string | number;
    hash: string;
    amount: number;
    description?: string;
  }
>("tasks/verifyGigaHash", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<VerifyGigaHashResponse>(
      verifyGigaHashUrl,
      "POST",
      {
        rewardId: payload.rewardId,
        userId: payload.userId,
        projectId: payload.projectId,
        amount: payload.amount,
        hash: payload.hash,
        description: payload.description,
      }
    );

    return { ...resData, amount: payload.amount };
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

export const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    setPromoTaskSubscribed: (state, action) => {
      const task = state.promoTasks.find((task) => task.id === action.payload);

      if (task) {
        task.subscription = true;
      }
    },
    getRewardTaddy: (state, { payload }) => {
      state.rewardTaddy = payload;
    },
    removeAdMeditation: (state) => {
      state.mediation = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPromoTasks.fulfilled, (state, action) => {
      state.promoTasks = action.payload;
    });
    builder.addCase(getPromoTaskReward.fulfilled, (state, { payload }) => {
      state.promoTasks = state.promoTasks.filter(
        (item) => item.id !== payload.task_id
      );
    });
    builder.addCase(getAdRewardSettings.fulfilled, (state, { payload }) => {
      state.adRewardSettings = payload.reward_ad;
    });
    builder.addCase(getAdMeditation.fulfilled, (state, { payload }) => {
      state.mediation = payload;
    });
    builder.addCase(getPromoTaskReward.rejected, (state, { payload }) => {
      const task = state.promoTasks.find((task) => task.id === payload?.id);

      if (task) {
        task.subscription = false;
      }
    });
  },
});

export const { setPromoTaskSubscribed, getRewardTaddy, removeAdMeditation } =
  tasksSlice.actions;

export default tasksSlice.reducer;
