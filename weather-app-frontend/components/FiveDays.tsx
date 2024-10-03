import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// Helper function to convert Kelvin to Celsius
const kelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(1);

// Helper function to get the weekday name from a Unix timestamp
const getWeekdayName = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const Forecast = () => {
  const weatherData = useSelector(
    (state: RootState) => state.weather.weatherData
  );

  if (!weatherData) {
    return (
      <p className=" text-darkText dark:text-lightText">
        No forecast data available
      </p>
    );
  }

  const forecastData = weatherData.list
    .filter(
      (
        item: {
          main: { temp: number };
          weather: { icon: string }[];
          dt: number;
        },
        index: number
      ) => index % 8 === 0
    )
    .slice(0, 5);

  return (
    <div>
      <h2 className="text-lg font-semibold text-darkText dark:text-lightText mb-4">
        5 Day Forecast
      </h2>
      <div className="grid grid-cols-5 gap-4">
        {forecastData.map((day, index) => {
          const temperatureCelsius = kelvinToCelsius(day.main.temp);
          const iconCode = day.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          const weekday = getWeekdayName(day.dt);

          return (
            <div
              key={index}
              className="p-4 dark:bg-darkBody bg-white   rounded-xl flex flex-col items-center justify-center text-center"
            >
              <p className=" text-darkText dark:text-lightText  text-sm">
                {weekday}
                <span className="block h-0.5 w-10 mx-auto mt-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></span>
              </p>
              <img
                src={iconUrl}
                alt="Weather icon"
                className="w-12 h-12 my-2"
              />
              <p className="text-xl text-darkText dark:text-lightText  font-semibold">
                {temperatureCelsius}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
