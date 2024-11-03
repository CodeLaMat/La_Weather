import axios from "axios";
import { AppThunk } from "../store/store";
import {
  fetchFavoriteWeatherStart,
  fetchFavoriteWeatherSuccess,
  fetchFavoriteWeatherFailure,
} from "../slices/favoriteWeatherSlice";
import { WeatherData } from "../types/mainTypes";

export const fetchFavoriteCitiesWeather =
  (
    cities: { name: string; coords: { lat: number; lon: number } }[]
  ): AppThunk =>
  async (dispatch) => {
    dispatch(fetchFavoriteWeatherStart());

    try {
      const weatherDataPromises = cities.map((city) => {
        const url = `${process.env.NEXT_PUBLIC_OPENWEATHER_LINK}lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`;
        return axios.get<WeatherData>(url).then((response) => ({
          cityName: city.name,
          data: response.data,
          success: response.status === 200,
        }));
      });

      const weatherDataResults = await Promise.all(weatherDataPromises);

      const successfulResults = weatherDataResults.filter(
        (result) => result.success
      );
      const failedResults = weatherDataResults.filter(
        (result) => !result.success
      );

      if (successfulResults.length > 0) {
        successfulResults.forEach((result) => {
          dispatch(
            fetchFavoriteWeatherSuccess({
              cityName: result.cityName,
              data: result.data,
            })
          );
        });
      }

      if (failedResults.length > 0) {
        failedResults.forEach((result) =>
          dispatch(
            fetchFavoriteWeatherFailure(
              `Failed to fetch data for ${result.cityName}`
            )
          )
        );
      }
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
