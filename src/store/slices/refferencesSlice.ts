import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRefference } from "../../models/IRefference";
import { fetchRequest } from "../tools/fetchTools";
import {
  ConverReferalsResponse,
  GetReferalsResponse,
} from "../../models/api/tasks/Referals";

export interface RefferencesState {
  refferences: IRefference[];
  refCashPoint: number;
}

const initialState: RefferencesState = {
  refferences: [],
  refCashPoint: 0,
};

const getReferalsUrl = "/referals/";

export const getReferals = createAsyncThunk<GetReferalsResponse, undefined>(
  "profile/getReferals",
  async (payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<GetReferalsResponse>(getReferalsUrl);

      return resData;
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);
const convertReferalsUrl = "/referals/convert/";

export const convertReferals = createAsyncThunk<
  ConverReferalsResponse,
  undefined
>("profile/convertReferals", async (_payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<ConverReferalsResponse>(
      convertReferalsUrl,
      "POST",
      {}
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

export const refferencesSlice = createSlice({
  name: "refferencesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReferals.fulfilled, (state, action) => {
      state.refferences = action.payload.referals;
      state.refCashPoint = action.payload.ref_cash_point || 0;
    });
    builder.addCase(convertReferals.fulfilled, (state, action) => {
      state.refCashPoint = action.payload.ref_cash_point_left;
    });
  },
});

// export const {  } = refferencesSlice.actions;

export default refferencesSlice.reducer;
