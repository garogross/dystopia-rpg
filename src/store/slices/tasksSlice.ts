import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRequest } from "../tools/fetchTools";
import { ClaimBarzhaRewardResponse } from "../../models/api/tasks/barzha";
import { BquestCallbackDataType } from "../../types/BquestCallbackDataType";
import { ClaimTraffyRewardResponse } from "../../models/api/tasks/traffy";
import { ClaimTaddyRewardResponse } from "../../models/api/tasks/taddy";
import { ClaimWallgramRewardResponse } from "../../models/api/tasks/wallgram";

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

export const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const {  } = tasksSlice.actions;

export default tasksSlice.reducer;
