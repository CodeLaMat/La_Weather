"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const WeatherDisplay = () => {
  const weatherData = useSelector(
    (state: RootState) => state.weather.weatherData
  );
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

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
