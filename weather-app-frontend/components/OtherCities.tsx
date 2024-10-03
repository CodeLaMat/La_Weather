import React from "react";
import { FiChevronDown } from "react-icons/fi";

// Mock Data for favorite cities
const favoriteCities = [
  {
    country: "Australia",
    city: "Canberra",
    weatherDescription: "Sunny",
    temp: 32,
    minTemp: 24,
    icon: "01d",
  },
  {
    country: "Japan",
    city: "Tokyo",
    weatherDescription: "Mostly Sunny",
    temp: 30,
    minTemp: 19,
    icon: "02d",
  },
];

// Helper function to get the weather icon URL
const getIconUrl = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

const OtherCities = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-darkText dark:text-lightText">
          Favorites
        </h2>
        <div className="flex items-center cursor-pointer text-sm text-gray-400">
          See All <FiChevronDown className="ml-1" />
        </div>
      </div>

      {favoriteCities.map((cityData, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 mb-4 dark:bg-darkBody bg-white  rounded-lg"
        >
          {/* Left side - City Info */}
          <div className="flex flex-col justify-between">
            <p className="text-sm text-gray-400">{cityData.country}</p>
            <h3 className="text-xl font-semibold text-darkText dark:text-lightText">
              {cityData.city}
            </h3>
            <p className="text-darkText dark:text-lightText">
              {cityData.weatherDescription}
            </p>
          </div>

          {/* Middle - Weather Icon */}
          <div className="flex items-center justify-center">
            <img
              src={getIconUrl(cityData.icon)}
              alt={cityData.weatherDescription}
              className="w-12 h-12"
            />
          </div>

          {/* Right side - Temperature Info */}
          <div className="text-right">
            <p className="text-2xl font-semibold text-darkText dark:text-lightText">
              {cityData.temp}°C
              <span className="text-gray-400 text-sm">
                /{cityData.minTemp}°C
              </span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default OtherCities;
