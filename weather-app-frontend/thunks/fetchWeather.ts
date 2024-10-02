// thunks/fetchWeather.ts
import axios from "axios";
import { AppDispatch } from "../../store/store";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../slices/weatherSlice";

export const fetchWeather =
  (lat: number = 0, lon: number = 0, city?: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchWeatherStart());

      let url = "";

      if (city) {
        url = `${process.env.NEXT_PUBLIC_OPENWEATHER_LINK}q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`;
      } else {
        url = `${process.env.NEXT_PUBLIC_OPENWEATHER_LINK}lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`;
      }

      const response = await axios.get(url);

      dispatch(fetchWeatherSuccess(response.data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(fetchWeatherFailure(error.message));
      } else {
        dispatch(fetchWeatherFailure("An unexpected error occurred"));
      }
    }
  };
