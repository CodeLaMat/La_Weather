import React, { useState } from "react";
import { RootState } from "../store/store";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getIconUrl } from "../lib/utils";

const OtherCities = () => {
  const [showAll, setShowAll] = useState(false);

  const favoriteCities = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const weatherData = useSelector(
    (state: RootState) => state.favoriteWeather.weatherData
  );

  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  const citiesToDisplay = showAll ? favoriteCities : favoriteCities.slice(0, 2);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-darkText dark:text-lightText">
          Favorites
        </h2>
        {favoriteCities.length > 2 && (
          <div
            onClick={handleToggle}
            className="flex items-center cursor-pointer text-sm text-gray-400"
          >
            {showAll ? "Show Less" : "See All"}{" "}
            {showAll ? (
              <FiChevronUp className="ml-1" />
            ) : (
              <FiChevronDown className="ml-1" />
            )}
          </div>
        )}
      </div>

      <div>
        {citiesToDisplay.map((cityData, index) => {
          const data = weatherData[cityData.name];

          if (!data) {
            return null;
          }

          const weatherIconCode = data.list[0]?.weather[0]?.icon;
          const temperature = data?.list[0]?.main?.temp;
          const minTemperature = data?.list[0]?.main?.temp_min;
          const weatherDescription = data?.list[0]?.weather[0]?.description;

          return (
            <div
              key={index}
              className="flex justify-between items-center p-4 mb-4 dark:bg-darkBody bg-white rounded-lg"
            >
              {/* Left side - City Info */}
              <div className="flex flex-col justify-between">
                <p className="text-sm text-gray-400">{cityData.country}</p>
                <h3 className="text-xl font-semibold text-darkText dark:text-lightText">
                  {cityData.name}
                </h3>
                <p className="text-darkText dark:text-lightText">
                  {weatherDescription}
                </p>
              </div>

              {/* Middle - Weather Icon */}
              <div className="flex items-center justify-center">
                <img
                  src={getIconUrl(weatherIconCode)}
                  alt={weatherDescription}
                  className="w-12 h-12"
                />
              </div>

              {/* Right side - Temperature Info */}
              <div className="text-right">
                <p className="text-2xl font-semibold text-darkText dark:text-lightText">
                  {temperature !== undefined ? `${temperature}°C` : "N/A"}
                  <span className="text-gray-400 text-sm">
                    /
                    {minTemperature !== undefined
                      ? `${minTemperature}°C`
                      : "N/A"}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OtherCities;
