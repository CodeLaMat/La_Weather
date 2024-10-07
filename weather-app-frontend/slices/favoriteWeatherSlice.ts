import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "@/types/mainTypes";

interface FavoriteWeatherState {
  loading: boolean;
  weatherData: { [cityName: string]: WeatherData };
  error: string | null;
}

const initialState: FavoriteWeatherState = {
  loading: false,
  weatherData: {},
  error: null,
};

const favoriteWeatherSlice = createSlice({
  name: "favoriteWeather",
  initialState,
  reducers: {
    fetchFavoriteWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFavoriteWeatherSuccess(
      state,
      action: PayloadAction<{ cityName: string; data: WeatherData }>
    ) {
      state.loading = false;
      state.weatherData[action.payload.cityName] = action.payload.data;
    },
    fetchFavoriteWeatherFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearFavoriteWeather(state) {
      state.weatherData = {};
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  fetchFavoriteWeatherStart,
  fetchFavoriteWeatherSuccess,
  fetchFavoriteWeatherFailure,
  clearFavoriteWeather,
} = favoriteWeatherSlice.actions;

export default favoriteWeatherSlice.reducer;
