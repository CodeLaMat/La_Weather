"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FiMapPin } from "react-icons/fi";

const kelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(1);
const celsiusToFahrenheit = (celsius: number) =>
  ((celsius * 9) / 5 + 32).toFixed(1);

const WeatherDisplay = () => {
  const [isCelsius, setIsCelsius] = useState(true);

  const weatherData = useSelector(
    (state: RootState) => state.weather.weatherData
  );
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  const toggleTemperature = () => setIsCelsius(!isCelsius);

  if (loading) {
    return <p className="text-darkText dark:text-lightText">Loading...</p>;
  }
  if (error) {
    return <p className="text-darkText dark:text-lightText">Error: {error}</p>;
  }
  if (!weatherData) {
    return (
      <p className="text-darkText dark:text-lightText">Location not selected</p>
    );
  }

  const weather = weatherData.list[0];
  const temperatureCelsius = kelvinToCelsius(weather.main.temp);
  const feelsLikeCelsius = kelvinToCelsius(weather.main.feels_like);
  const temperatureMinCelsius = kelvinToCelsius(weather.main.temp_min);
  const weatherDescription = weather.weather[0].description;
  const date = new Date(weather.dt_txt);

  const temperature = isCelsius
    ? `${temperatureCelsius}°C`
    : `${celsiusToFahrenheit(parseFloat(temperatureCelsius))}°F`;

  const feelsLike = isCelsius
    ? `${feelsLikeCelsius}°C`
    : `${celsiusToFahrenheit(parseFloat(feelsLikeCelsius))}°F`;

  const temperatureMin = isCelsius
    ? `${temperatureMinCelsius}°C`
    : `${celsiusToFahrenheit(parseFloat(temperatureMinCelsius))}°F`;

  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="p-2 max-w-md mx-auto relative text-darkText dark:text-lightText">
      <div className="flex justify-between items-center mb-4 text-darkText dark:text-lightText">
        <div className="flex items-center space-x-2 text-darkText dark:text-lightText">
          <span className="dark:bg-darkBody rounded-full py-2 px-4 text-sm flex gap-2">
            <FiMapPin className="text-xl" />
            {weatherData.city.name}, {weatherData.city.country}
          </span>
        </div>
        <button
          onClick={toggleTemperature}
          className="dark:bg-darkBody px-3 py-1 rounded-full text-sm"
        >
          {isCelsius ? "°C" : "°F"}
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl 2xl:text-4xl font-semibold text-darkText dark:text-lightText">
            {date.toLocaleString("en-US", { weekday: "long" })}
          </h1>
          <p className="text-gray-400 text-sm">{date.toLocaleDateString()}</p>
        </div>

        <div className="text-right">
          <p className="text-4xl font-semibold text-darkText dark:text-lightText">
            {temperature}
          </p>
          <p className="text-gray-400">/ {temperatureMin}</p>
        </div>
      </div>

      <div className="flex justify-center items-center my-2">
        <img src={iconUrl} alt="Weather icon" className="w-28 h-28" />
      </div>

      <div className="absolute bottom-2 right-2 text-right text-darkText dark:text-lightText">
        <p className="text-lg font-medium capitalize">{weatherDescription}</p>
        <p className="text-gray-400 text-sm">Feels like {feelsLike}</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
