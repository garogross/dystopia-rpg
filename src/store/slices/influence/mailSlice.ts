import { createSlice } from "@reduxjs/toolkit";
import { IMailMessage } from "../../../models/IMailMessage";

export interface MailState {
  mails: IMailMessage[];
}

const initialState: MailState = {
  mails: [],
};

export const mailSlice = createSlice({
  name: "mailSlice",
  initialState,
  reducers: {
    initMail: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {},
});

export const { initMail } = mailSlice.actions;

export default mailSlice.reducer;
