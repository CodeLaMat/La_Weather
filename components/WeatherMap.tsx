"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { renderToString } from "react-dom/server";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteCitiesWeather } from "@/thunks/fetchFavoriteCitiesWeather";
import { RootState, AppDispatch } from "@/store/store";
import L from "leaflet";
import { FavoriteCity } from "@/types/mainTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const WeatherMap: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const favoriteCities: FavoriteCity[] = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const weatherData = useSelector(
    (state: RootState) => state.favoriteWeather.weatherData
  );

  console.log("WEATHERDATA", weatherData);

  const [position, setPosition] = useState<{
    name: string;
    coords: {
      lat: number;
      lon: number;
    };
  } | null>(null);

  const mapMarkerIconSvg = renderToString(
    <FontAwesomeIcon icon={faMapMarkerAlt} color="red" size="3x" />
  );

  const customMarkerIcon = L.divIcon({
    className: "custom-marker-icon",
    html: mapMarkerIconSvg,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({
          name: "Current Location",
          coords: { lat: latitude, lon: longitude },
        });
      },
      () => {
        setPosition({
          name: "Default Location",
          coords: { lat: 51.505, lon: -0.09 },
        });
      }
    );

    if (favoriteCities.length > 0) {
      dispatch(fetchFavoriteCitiesWeather(favoriteCities));
    }
  }, [dispatch, favoriteCities]);

  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={
          position
            ? [position.coords.lat, position.coords.lon]
            : [51.505, -0.09]
        }
        zoom={2}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {position && (
          <Marker
            position={[position.coords.lat, position.coords.lon]}
            icon={customMarkerIcon}
          >
            <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
              <span>{position.name}!</span>
            </Tooltip>
          </Marker>
        )}

        {favoriteCities.map((city) => {
          const data = weatherData[city.name];

          if (!data) {
            return null;
          }

          const cityCoords: [number, number] = [
            city.coords.lat,
            city.coords.lon,
          ];
          const temperature = data?.list[0]?.main?.temp;

          const weatherIconCode = data.list[0]?.weather[0]?.icon;
          const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

          const customMarkerHtml = renderToString(
            <div style={{ textAlign: "center" }}>
              <img src={weatherIconUrl} alt="Weather Icon" />
              <div>
                {temperature !== undefined ? `${temperature}°C` : "N/A"}
              </div>
            </div>
          );

          const customIcon = L.divIcon({
            html: customMarkerHtml,
            className: "custom-weather-icon",
            iconSize: [80, 80],
            iconAnchor: [40, 80],
          });

          return (
            <Marker key={city.id} position={cityCoords} icon={customIcon}>
              <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                <span>
                  {temperature !== undefined ? `${temperature}°C` : "N/A"}
                </span>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
