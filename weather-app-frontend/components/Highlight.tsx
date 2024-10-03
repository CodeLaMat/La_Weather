import React from "react";
import { FiWind, FiSunrise, FiSunset, FiDroplet } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Highlights = () => {
  const weatherData = useSelector(
    (state: RootState) => state.weather.weatherData
  );

  if (!weatherData) {
    return (
      <p className=" text-darkText dark:text-lightText">No data available</p>
    );
  }

  const currentWeather = weatherData.list[0];
  const windSpeed = currentWeather.wind.speed;
  const windDirection = currentWeather.wind.deg;
  const humidity = currentWeather.main.humidity;
  const visibility = currentWeather.visibility / 1000;
  const sunrise = new Date(weatherData.city.sunrise * 1000).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  );
  const sunset = new Date(weatherData.city.sunset * 1000).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  );

  return (
    <div className="">
      <h2 className="text-lg font-semibold text-darkText dark:text-lightText mb-4">
        Today&apos;s Highlight
      </h2>

      {/* Highlight Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-darkText dark:text-lightText">
        {/* Wind Status */}
        <div className="p-3 dark:bg-darkBody bg-white rounded-xl flex flex-col items-center justify-between text-center">
          <div className="flex gap-2 align-middle justify-center">
            <FiWind className="text-2xl text-darkText dark:text-lightText mb-2" />
            <p className="text-darkText dark:text-lightText text-sm">
              Wind Status
            </p>
          </div>
          <div className="flex flex-col align-bottom gap-2 text-right">
            <p className="text-xl text-darkText dark:text-lightText font-semibold">
              {windSpeed} km/h
            </p>
            <p className="text-sm text-gray-400">
              Wind direction: {windDirection}°
            </p>
          </div>
        </div>

        {/* Humidity */}
        <div className="p-3 dark:bg-darkBody bg-white rounded-xl flex flex-col items-center justify-between text-center">
          <div className="flex gap-2 align-middle justify-center">
            <FiDroplet className="text-2xl text-darkText dark:text-lightText mb-2" />
            <p className="text-darkText dark:text-lightText text-sm">
              Humidity
            </p>
          </div>
          <p className="text-2xl text-darkText dark:text-lightText font-semibold">
            {humidity}%
          </p>
          <p className="text-sm text-gray-400">
            {humidity > 80 ? "Humidity is high" : "Humidity is good"}
          </p>
        </div>

        {/* UV Index (static for now) */}
        <div className="p-3 dark:bg-darkBody bg-white rounded-xl flex flex-col items-center justify-between text-center">
          <div className="flex gap-2 align-middle justify-center">
            <MdWbSunny className="text-2xl text-darkText dark:text-lightText mb-2" />
            <p className="text-darkText dark:text-lightText text-sm">
              UV Index
            </p>
          </div>
          <p className="text-2xl text-darkText dark:text-lightText font-semibold">
            4 UV
          </p>
          <p className="text-sm text-gray-400">Moderate UV</p>
        </div>

        {/* Visibility */}
        <div className="p-3 dark:bg-darkBody bg-white rounded-xl flex flex-col items-center justify-between text-center">
          <div className="flex gap-2 align-middle justify-center">
            <FaEye className="text-2xl text-darkText dark:text-lightText mb-2" />
            <p className="text-darkText dark:text-lightText text-sm">
              Visibility
            </p>
          </div>
          <p className="text-xl text-darkText dark:text-lightText font-semibold">
            {visibility} km
          </p>
        </div>

        {/* Sunrise */}
        <div className="p-3 dark:bg-darkBody bg-white rounded-xl flex flex-col items-center justify-between text-center col-span-1">
          <div className="flex gap-2 align-middle justify-center">
            <FiSunrise className="text-2xl text-yellow-500 mb-2" />
            <p className="text-darkText dark:text-lightText text-sm">Sunrise</p>
          </div>
          <p className="text-xl text-darkText dark:text-lightText font-semibold">
            {sunrise}
          </p>
        </div>

        {/* Sunset */}
        <div className="p-3 dark:bg-darkBody bg-white rounded-xl flex flex-col items-center justify-between text-center col-span-1">
          <div className="flex gap-2 align-middle justify-center">
            <FiSunset className="text-2xl text-yellow-500 mb-2" />
            <p className="text-darkText dark:text-lightText text-sm">Sunset</p>
          </div>
          <p className="text-xl text-darkText dark:text-lightText font-semibold">
            {sunset}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
