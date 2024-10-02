"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FiMapPin } from "react-icons/fi";
import { BsCloudRain, BsSun } from "react-icons/bs";
import { AiOutlineCloud } from "react-icons/ai";

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

  return (
    <div className="  text-white rounded-3xl  p-2 flex justify-around ">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FiMapPin className="text-xl" />
          <span className="bg-gray-700 rounded-full px-3 py-1">
            {weatherData.city.name}, {weatherData.city.country}
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-bold">
            {date.toLocaleString("en-US", { weekday: "long" })}
          </h1>
          <p className="text-gray-400">{date.toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {weatherMain === "Rain" ? (
          <BsCloudRain className="text-6xl text-blue-400" />
        ) : weatherMain === "Clouds" ? (
          <AiOutlineCloud className="text-6xl text-gray-400" />
        ) : (
          <BsSun className="text-6xl text-yellow-400" />
        )}
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold">
            {isCelsius ? `${temperatureCelsius}` : `${temperatureFahrenheit}`}
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
          <p className="mt-2 font-semibold capitalize">{weatherDescription}</p>
          <p className="text-gray-400 text-sm">Wind: {windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
