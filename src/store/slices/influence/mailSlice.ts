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
  { id: string }
>("mail/receiveMailReward", async (payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ReceiveMailRewardResponse>(
      receiveMailRewardUrl,
      "POST",
      {
        mail_id: payload.id,
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
      const updatedItemIndex = state.mails.findIndex(
        (item) => item.id === payload.mail_id
      );
      if (updatedItemIndex === -1) return;
      state.mails = state.mails.with(updatedItemIndex, {
        ...state.mails[updatedItemIndex],
        read: true,
      });
    });
  },
});

export const { initMail } = mailSlice.actions;

export default mailSlice.reducer;
