import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMailMessage } from "../../../models/IMailMessage";
import { ReceiveMailRewardResponse } from "../../../models/api/Influence/Mail";
import { fetchRequest } from "../../tools/fetchTools";

export interface MailState {
  mails: IMailMessage[];
}

const initialState: MailState = {
  mails: [],
};

const receiveMailRewardUrl = "/influence/mail/reward/";
export const receiveMailReward = createAsyncThunk<
  ReceiveMailRewardResponse,
  { id: string; action: "read" | "delete" } | { action: "read_all" }
>("mail/receiveMailReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ReceiveMailRewardResponse>(
      receiveMailRewardUrl,
      "POST",
      {
        mail_id: "id" in payload ? payload.id : undefined,
        action: payload?.action,
      }
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

export const mailSlice = createSlice({
  name: "mailSlice",
  initialState,
  reducers: {
    initMail: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(receiveMailReward.fulfilled, (state, { payload }) => {
      if (payload.read_all) {
        state.mails = state.mails.map((item) => ({ ...item, read: true }));
      } else if (payload.deleted) {
        state.mails = state.mails.filter((item) => item.id !== payload.mail_id);
      } else {
        const updatedItemIndex = state.mails.findIndex(
          (item) => item.id === payload.mail_id
        );
        if (updatedItemIndex === -1) return;

        state.mails = state.mails.with(updatedItemIndex, {
          ...state.mails[updatedItemIndex],
          read: true,
        });
      }
    });
  },
});

export const { initMail } = mailSlice.actions;

export default mailSlice.reducer;
