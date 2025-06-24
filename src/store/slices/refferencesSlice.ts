import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRefference } from "../../models/IRefference";
import { fetchRequest } from "../tools/fetchTools";

export interface RefferencesState {
  refferences: IRefference[];
}

const initialState: RefferencesState = {
  refferences: [],
};

const getReferalsUrl = "/referals/";

export const getReferals = createAsyncThunk<IRefference[], undefined>(
  "profile/getReferals",
  async (payload, { rejectWithValue }) => {
    try {
      const resData = await fetchRequest<{ referals: IRefference[] }>(
        getReferalsUrl
      );

      return resData.referals;
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);

export const refferencesSlice = createSlice({
  name: "refferencesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReferals.fulfilled, (state, action) => {
      state.refferences = action.payload;
    });
  },
});

// export const {  } = refferencesSlice.actions;

export default refferencesSlice.reducer;
