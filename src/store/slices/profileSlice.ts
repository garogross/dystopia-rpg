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
  tgId: string;
  token: string;
}

const initialState: ProfileState = {
  id: "",
  tgId: "",
  token:
    process.env.NODE_ENV === "development"
      ? (process.env.REACT_APP_TEST_TOKEN as string)
      : "",
};

export const authUser = createAsyncThunk<AuthUserResponse, string>(
  "profile/authUser",
  async (payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<AuthUserResponse>(authUserUrl, "POST", {
        initData: payload,
      });

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
     state.token = payload.token
    });
  },
});

export const { setUser } = profileSlice.actions;

export default profileSlice.reducer;
