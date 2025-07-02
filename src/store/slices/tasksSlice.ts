import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRequest } from "../tools/fetchTools";
import { ClaimBarzhaRewardResponse } from "../../models/api/tasks/barzha";
import { BquestCallbackDataType } from "../../types/BquestCallbackDataType";
import { ClaimTraffyRewardResponse } from "../../models/api/tasks/traffy";
import { ClaimTaddyRewardResponse } from "../../models/api/tasks/taddy";
import { ClaimWallgramRewardResponse } from "../../models/api/tasks/wallgram";
import { ClaimAdsgramRewardResponse } from "../../models/api/tasks/adsgram";
import { ClaimVideoRewardResponse } from "../../models/api/tasks/video";
import { ClaimTadsRewardResponse } from "../../models/api/tasks/tads";
import { VerifyGigaHashResponse } from "../../models/api/tasks/giga";

export interface TasksState {}

const initialState: TasksState = {};

const claimBarzhaRewardUrl = "/reward/barzha/";
export const claimBarzhaReward = createAsyncThunk<
  ClaimBarzhaRewardResponse,
  BquestCallbackDataType
>("tasks/claimBarzhaReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ClaimBarzhaRewardResponse>(
      claimBarzhaRewardUrl,
      "POST",
      {
        notification_uuid: payload.notification_uuid,
        reward: payload.reward,
        task_type: payload.task_type,
      }
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
const claimTaddyRewardUrl = "/reward/taddy/";
export const claimTaddyReward = createAsyncThunk<
  ClaimTaddyRewardResponse,
  { id: string }
>("tasks/claimTaddyReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ClaimTaddyRewardResponse>(
      claimTaddyRewardUrl,
      "POST",
      {
        identifier: payload.id,
        task_type: "exchange",
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

const claimAdsgramRewardUrl = "/reward/adsgram/";
export const claimAdsgramReward = createAsyncThunk<
  ClaimAdsgramRewardResponse,
  {
    taskId: string;
  }
>("tasks/claimAdsgramReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ClaimAdsgramRewardResponse>(
      claimAdsgramRewardUrl,
      "POST",
      {
        identifier: payload.taskId,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const claimVideoRewardUrl = "/reward/rewarded_video/";
export const claimVideoReward = createAsyncThunk<
  ClaimVideoRewardResponse,
  {
    id: string;
  }
>("tasks/claimVideoReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ClaimVideoRewardResponse>(
      claimVideoRewardUrl,
      "POST",
      {
        identifier: payload.id,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

const claimTadsRewardUrl = "/reward/tads/";
export const claimTadsReward = createAsyncThunk<
  ClaimTadsRewardResponse,
  {
    id: string;
  }
>("tasks/claimTadsReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ClaimTadsRewardResponse>(
      claimTadsRewardUrl,
      "POST",
      {
        task_id: payload.id.toString(),
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
  reducers: {},
  extraReducers: (builder) => {},
});

// export const {  } = tasksSlice.actions;

export default tasksSlice.reducer;
