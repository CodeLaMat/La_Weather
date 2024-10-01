import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchWeather } from "../thunks/fetchWeather";

const WeatherDisplay = () => {
  const dispatch: AppDispatch = useDispatch();
  const weatherData = useSelector(
    (state: RootState) => state.weather.weatherData
  );
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  // Fetch weather based on latitude and longitude, or city name
  useEffect(() => {
    dispatch(fetchWeather(44.34, 10.99, ""));
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && (
        <div>
          <h1>Weather Forecast for {weatherData.city.name}</h1>
          <p>Date: {weatherData.list[0].dt_txt}</p>
          <p>Weather: {weatherData.list[0].weather[0].description}</p>
          <p>
            Temperature: {Math.round(weatherData.list[0].main.temp - 273.15)}°C
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
