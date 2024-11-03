import { WeatherData } from "../types/mainTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logoutUser } from "../thunks/auth";

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
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.weatherData = null;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(logoutUser.rejected, (state) => {
      state.weatherData = null;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherSlice.actions;

export default weatherSlice.reducer;
