import { createSlice } from "@reduxjs/toolkit";
// import { fetchRequest } from "../tools/fetchTools";
import { fetchRequest } from "../tools/fetchTools";
import { AuthUserResponse } from "../../models/api/AuthUserResponse";
import { setLSItem } from "../../helpers/localStorage";
import { lsProps } from "../../utils/lsProps";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import {AppDispatch, RootState} from "../store";

// endpoints
const authUserUrl = "/auth";

export interface ProfileState {
  id: string;
  tgId: string | number;
  token: string;
  username: string;
}

const initUserData =
  process.env.NODE_ENV === "development"
    ? {
        token: process.env.REACT_APP_TEST_TOKEN || "",
        username: process.env.REACT_APP_TEST_USERNAME || "",
        tgId: process.env.REACT_APP_TEST_TG_ID || "",
      }
    : {
        token: "",
        username: "",
        tgId: "",
      };

const initialState: ProfileState = {
  id: "",
  ...initUserData,
};

export const authUser = createAsyncThunk<AuthUserResponse, string>(
  "profile/authUser",
  async (payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<AuthUserResponse>(
        authUserUrl,
        "POST",
        {
          initData: payload,
        }
      );

      if (resData.token) {
        setLSItem(lsProps.token, resData.token);
      }
      console.log({ resData });
      return resData;
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);

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
    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.username = payload.user.username;
      state.tgId = payload.user.id_tgrm;
      state.username = payload.user.username;
    });
  },
});

export const { setUser } = profileSlice.actions;

export default profileSlice.reducer;
