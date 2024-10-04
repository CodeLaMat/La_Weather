import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../slices/weatherSlice";
import loadingReducer from "../slices/loadingSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
