"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FiMapPin } from "react-icons/fi";

// Function to convert Kelvin to Celsius
const kelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(1);

const WeatherDisplay = () => {
  const [isCelsius, setIsCelsius] = useState(true);

  const weatherData = useSelector(
    (state: RootState) => state.weather.weatherData
  );
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weatherData) return <p>No weather data available</p>;

  const weather = weatherData.list[0];
  const temperatureCelsius = kelvinToCelsius(weather.main.temp);
  const feelsLikeCelsius = kelvinToCelsius(weather.main.feels_like);
  const weatherDescription = weather.weather[0].description;
  const weatherMain = weather.weather[0].main;
  const windSpeed = weather.wind.speed;
  const date = new Date(weather.dt_txt);
  const temperatureFahrenheit = (
    ((weather.main.temp - 273.15) * 9) / 5 +
    32
  ).toFixed(1);

  const iconCode = weather.weather[0].icon; // e.g., "10d"
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="p-6 flex flex-col sm:flex-row justify-between items-center w-full max-w-4xl mx-auto">
      {/* Left Section (Location and Date) */}
      <div className="flex flex-col gap-3 items-center sm:items-start mb-4 sm:mb-0">
        <div className="flex items-center gap-2">
          <FiMapPin className="text-xl" />
          <span className="bg-gray-700 rounded-full px-3 py-1">
            {weatherData.city.name}, {weatherData.city.country}
          </span>
        </div>
        <div>
          <h1 className="text-2xl sm:text-4xl text-darkText dark:text-lightText font-light-bold">
            {date.toLocaleString("en-US", { weekday: "long" })}
          </h1>
          <p className="text-gray-400">{date.toLocaleDateString()}</p>
        </div>
      </div>

      {/* Middle Section (Weather Icon) */}
      <div className="flex items-center justify-center flex-col  text-darkText dark:text-lightText translate-y-10">
        <img src={iconUrl} alt="Weather icon" className="w-24 h-24" />
        <p className="mt-2 text-lg capitalize">{weatherMain}</p>
      </div>

      {/* Right Section (Temperature and Condition) */}
      <div className="flex flex-col items-center sm:items-end">
        <div className="flex items-center gap-2">
          <span className="text-2xl sm:text-4xl font-bold  text-darkText dark:text-lightText">
            {isCelsius
              ? `${temperatureCelsius}°C`
              : `${temperatureFahrenheit}°F`}
          </span>
          <button
            onClick={toggleTemperature}
            className="bg-gray-700 px-2 py-1 rounded-full text-gray-300 text-sm"
          >
            {isCelsius ? "°C" : "°F"}
          </button>
        </div>
        <span className="text-gray-400">
          Feels like{" "}
          {isCelsius
            ? `${feelsLikeCelsius}°C`
            : `${((Number(feelsLikeCelsius) * 9) / 5 + 32).toFixed(1)}°F`}
        </span>
        <div>
          <p className="mt-2 font-semibold capitalize  text-darkText dark:text-secondary">
            {weatherDescription}
          </p>
          <p className="text-gray-400 text-sm">Wind: {windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
