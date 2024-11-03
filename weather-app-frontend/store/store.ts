import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../slices/weatherSlice";
import loadingReducer from "../slices/loadingSlice";
import favoriteWeatherReducer from "../slices/favoriteWeatherSlice";
import favoritesReducer from "../slices/favoritesSlice";
import authReducer from "../slices/authSlice";

import { ThunkAction, Action } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    loading: loadingReducer,
    favoriteWeather: favoriteWeatherReducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
