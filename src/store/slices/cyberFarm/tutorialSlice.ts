import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FinsihTutorialResponse } from "../../../models/api/CyberFarm/Tutorial";
import { fetchRequest } from "../../tools/fetchTools";

export interface TutorialState {
  tutorialInProgress: boolean;
  tutorialProgressIndex: number;
}

const initialState: TutorialState = {
  tutorialInProgress: false,
  tutorialProgressIndex: 0,
};

const finsihTutorialUrl = "/ton_cyber_farm/tutorial/";
export const finsihTutorial = createAsyncThunk<
  FinsihTutorialResponse,
  undefined
>("tutorial/finsihTutorial", async (_payload, { rejectWithValue }) => {
  try {
    const resData = await fetchRequest<FinsihTutorialResponse>(
      finsihTutorialUrl,
      "POST",
      {}
    );

    return resData;
  } catch (error: any) {
    console.error("error", error);
    return rejectWithValue(error);
  }
});

export const tutorialSlice = createSlice({
  name: "tutorialSlice",
  initialState,
  reducers: {
    initTutorial: (state, action) => {
      state.tutorialInProgress = action.payload.tutorialInProgress;
    },
    setTutorialInProgress: (state, action) => {
      state.tutorialInProgress = action.payload;
    },
    updateTutorialProgress: (state) => {
      state.tutorialProgressIndex = state.tutorialProgressIndex + 1;
    },
  },
  extraReducers: (builder) => {},
});

export const { initTutorial, setTutorialInProgress, updateTutorialProgress } =
  tutorialSlice.actions;

export default tutorialSlice.reducer;
