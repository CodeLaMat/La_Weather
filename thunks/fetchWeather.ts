import axios from "axios";
import { AppDispatch } from "../store/store";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../slices/weatherSlice";

export const fetchWeather =
  (lat: number, lon: number, city?: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchWeatherStart());

      const response = await axios.get(
        city
          ? `${process.env.NEXT_PUBLIC_OPENWEATHER_LINK}q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
          : `${process.env.NEXT_PUBLIC_OPENWEATHER_LINK}lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );

      dispatch(fetchWeatherSuccess(response.data));
    } catch (error) {
      dispatch(fetchWeatherFailure(error.message));
    }
  };
