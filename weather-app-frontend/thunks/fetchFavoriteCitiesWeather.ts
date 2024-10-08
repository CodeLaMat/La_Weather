import axios from "axios";
import { AppThunk } from "../store/store";
import {
  fetchFavoriteWeatherStart,
  fetchFavoriteWeatherSuccess,
  fetchFavoriteWeatherFailure,
} from "../slices/favoriteWeatherSlice";
import { WeatherData } from "@/types/mainTypes";

export const fetchFavoriteCitiesWeather =
  (
    cities: { name: string; coords: { lat: number; lon: number } }[]
  ): AppThunk =>
  async (dispatch) => {
    dispatch(fetchFavoriteWeatherStart());

    try {
      const requests = cities.map(async (city) => {
        const url = `${process.env.NEXT_PUBLIC_OPENWEATHER_LINK}lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`;

        const response = await axios.get<WeatherData>(url);
        console.log(`API response for city ${city.name}:`, response.data);

        if (response.status === 200 && response.data) {
          dispatch(
            fetchFavoriteWeatherSuccess({
              cityName: city.name,
              data: response.data,
            })
          );
        } else {
          dispatch(
            fetchFavoriteWeatherFailure(
              `Failed to fetch weather data for ${city.name}`
            )
          );
        }
      });

      await Promise.all(requests);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        dispatch(fetchFavoriteWeatherFailure(error.message));
      } else {
        console.error("Unknown error:", error);
        dispatch(fetchFavoriteWeatherFailure("An unexpected error occurred"));
      }
    }
  };
