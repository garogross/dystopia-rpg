import { createSlice } from "@reduxjs/toolkit";
// import { fetchRequest } from "../tools/fetchTools";
import { AppDispatch } from "../store";
// import {AppDispatch, RootState} from "../store";

// endpoints
// const authUserUrl = "/user-account/";

export interface ProfileState {
  id: string;
  tgId: string;
}

const initialState: ProfileState = {
  id: "",
  tgId: "",
};

export const authUser = (payload: number) => async (dispatch: AppDispatch) => {
  try {
    
    // const resData = await fetchRequest<AuthUserResponse>(authUserUrl, "POST", {
    //   telegram_id: payload,
    // }) as AuthUserResponse;

    // const { id, telegram_id, wallets, nft_alerts } = resData;

    // dispatch(setUser({
    //   id,
    //   tgId: telegram_id,
    // }))
    
  } catch (error) {
    console.error(error);
  }
};

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.id = payload.id;
      state.tgId = payload.tgId;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(authUser.fulfilled, (state, { payload }) => {
    //   if (payload) {
    //     state.id = payload.id;
    //     state.tgId = payload.tgId;
    //     state.alerts = payload.alerts;
    //     state.wallets = payload.wallets;
    //   }
    // });
  },
});

export const { setUser } = profileSlice.actions;

export default profileSlice.reducer;
