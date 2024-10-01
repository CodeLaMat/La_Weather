// slices/weatherSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "../types/mainTypes";

interface WeatherState {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weatherData: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess(state, action: PayloadAction<WeatherData>) {
      state.weatherData = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchWeatherFailure(state, action: PayloadAction<string>) {
      state.weatherData = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherSlice.actions;

export default weatherSlice.reducer;
