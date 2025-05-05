import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./slices/profileSlice";
import uIReducer from "./slices/uiSlice";
import chalangesReducer from "./slices/chalangesSlice";
import duelsReducer from "./slices/duelsSlice";
import refferencesReducer from "./slices/refferencesSlice";
import clanReducer from "./slices/clanSlice";

const rootReducer = combineReducers({
  profile: ProfileReducer,
  ui: uIReducer,
  chalanges: chalangesReducer,
  duels: duelsReducer,
  refferences: refferencesReducer,
  clan: clanReducer,
});

export const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
