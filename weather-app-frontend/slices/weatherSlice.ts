import { WeatherData } from "@/types/mainTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  loading: boolean;
  weatherData: WeatherData | null;
  error: string | null;
}

const initialState: WeatherState = {
  loading: false,
  weatherData: null,
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
      state.loading = false;
      state.weatherData = action.payload;
    },
    fetchWeatherFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherSlice.actions;

export default weatherSlice.reducer;
