import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./slices/profileSlice";

const rootReducer = combineReducers({
  profile: ProfileReducer,
});

export const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
