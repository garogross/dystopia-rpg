import { createSlice } from "@reduxjs/toolkit";
import { IDuel } from "../../models/IDuel";
import {
  dailyTournaments5vs5Image,
  dailyTurnaments5vs5Image,
  weeklyTournaments5vs5Image,
  weeklyTournaments3vs3Image,
  duel5vs5Image,
  duel3vs3Image,
} from "../../assets/imageMaps";

export interface DuelsState {
  duels: IDuel[];
}

const initialState: DuelsState = {
  duels: [
    {
      id: 1,
      title: "поединки",
      image5vs5: duel5vs5Image,
      image3vs3: duel3vs3Image,
    },
    {
      id: 2,
      title: "ежедневные турниры",
      image5vs5: dailyTournaments5vs5Image,
      image3vs3: dailyTurnaments5vs5Image,
    },
    {
      id: 3,
      title: "еженедельные турниры",
      image5vs5: weeklyTournaments5vs5Image,
      image3vs3: weeklyTournaments3vs3Image,
    },
  ],
};

export const duelsSlice = createSlice({
  name: "duelsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const {  } = duelsSlice.actions;

export default duelsSlice.reducer;
