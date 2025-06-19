import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FeedItem } from "taddy-sdk-web";
import { fetchRequest } from "../tools/fetchTools";
import { ClaimBarzhaRewardResponse } from "../../models/api/tasks/barzha";
import { BquestCallbackDataType } from "../../types/BquestCallbackDataType";

export interface TasksState {
  taddyTasks: FeedItem[];
}

const initialState: TasksState = {
  taddyTasks: [],
};

const claimBarzhaRewardUrl = "/barzha/reward/";
export const claimBarzhaReward = createAsyncThunk<
  ClaimBarzhaRewardResponse,
  BquestCallbackDataType
>("activity/claimBarzhaReward", async (payload, { rejectWithValue }) => {
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

export const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    setTadyTasks: (state, action) => {
      state.taddyTasks = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setTadyTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
