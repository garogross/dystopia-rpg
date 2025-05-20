import { createSlice } from "@reduxjs/toolkit";
// import { fetchRequest } from "../tools/fetchTools";
import { AppDispatch } from "../store";
import { fetchRequest } from "../tools/fetchTools";
// import {AppDispatch, RootState} from "../store";

// endpoints
const authUserUrl = "/auth";

export interface ProfileState {
  id: string;
  tgId: string;
  token: string;
}

const initialState: ProfileState = {
  id: "",
  tgId: "",
  token: "",
};

export const authUser = (payload: string) => async (dispatch: AppDispatch) => {
  try {
    const resData = await fetchRequest(authUserUrl, "POST", {
      initData: payload,
    });

    console.log({ resData });
  } catch (error) {
    console.error("error",error);
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
