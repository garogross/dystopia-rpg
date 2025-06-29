import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FinsihTutorialResponse } from "../../../models/api/CyberFarm/Tutorial";
import { fetchRequest } from "../../tools/fetchTools";
import {
  CYBERFARM_TUTORIAL_PROGRESS,
  ECyberfarmTutorialActions,
} from "../../../constants/cyberfarm/tutorial";

export interface TutorialState {
  tutorialInProgress: boolean;
  tutorialProgressIndex: number;
}

const initialState: TutorialState = {
  tutorialInProgress: false,
  tutorialProgressIndex: 0,
};

const updateAndSaveTutorialProgressUrl = "/ton_cyber_farm/tutorial_progress/";
export const updateAndSaveTutorialProgress = createAsyncThunk<
  ECyberfarmTutorialActions,
  ECyberfarmTutorialActions
>(
  "tutorial/updateAndSaveTutorialProgress",
  async (payload, { rejectWithValue }) => {
    try {
      await fetchRequest(updateAndSaveTutorialProgressUrl, "POST", {
        action: payload,
      });

      return payload;
    } catch (error: any) {
      console.error("error", error);
      return rejectWithValue(error);
    }
  }
);
const finsihTutorialUrl = "/ton_cyber_farm/finish_tutorial/";
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

export function calculateTutorialProgressIndex(
  tutorialProgressAction: ECyberfarmTutorialActions | null
): number {
  if (!tutorialProgressAction) return 0;

  const curActionIndex = CYBERFARM_TUTORIAL_PROGRESS.findIndex(
    (item) => item.action === tutorialProgressAction
  );

  if (curActionIndex === -1) return 0;
  const nextActionIndex = curActionIndex + 1;

  let updatedTutorialProgressIndex = nextActionIndex;
  const curProgress = CYBERFARM_TUTORIAL_PROGRESS[nextActionIndex];
  const prevProgress = CYBERFARM_TUTORIAL_PROGRESS[curActionIndex];

  if (curProgress.required) {
    const requiredProgressIndex = CYBERFARM_TUTORIAL_PROGRESS.findIndex(
      (item) => item.action === curProgress.required
    );

    if (requiredProgressIndex !== -1) {
      if (CYBERFARM_TUTORIAL_PROGRESS[requiredProgressIndex - 1]?.text) {
        updatedTutorialProgressIndex = requiredProgressIndex - 1;
      } else {
        updatedTutorialProgressIndex = requiredProgressIndex;
      }
    }
  } else if (prevProgress?.text) {
    updatedTutorialProgressIndex = curActionIndex;
  }

  return updatedTutorialProgressIndex;
}

export const tutorialSlice = createSlice({
  name: "tutorialSlice",
  initialState,
  reducers: {
    initTutorial: (state, action) => {
      state.tutorialInProgress = action.payload.tutorialInProgress;

      state.tutorialProgressIndex = calculateTutorialProgressIndex(
        action.payload.tutorialProgressAction
      );
    },
    setTutorialInProgress: (state, action) => {
      state.tutorialInProgress = action.payload;
    },
    updateTutorialProgress: (state) => {
      state.tutorialProgressIndex = state.tutorialProgressIndex + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      updateAndSaveTutorialProgress.fulfilled,
      (state, action) => {
        state.tutorialProgressIndex = state.tutorialProgressIndex + 1;
      }
    );
  },
});

export const { initTutorial, setTutorialInProgress, updateTutorialProgress } =
  tutorialSlice.actions;

export default tutorialSlice.reducer;
