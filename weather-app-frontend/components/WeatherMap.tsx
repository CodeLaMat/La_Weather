import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { renderToString } from "react-dom/server";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteCitiesWeather } from "@/thunks/fetchFavoriteCitiesWeather";
import { RootState, AppDispatch } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";

const WeatherMap: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weatherData = useSelector(
    (state: RootState) => state.favoriteWeather.weatherData
  );
  const [position, setPosition] = useState<[number, number] | null>(null);

  const favoriteCities: { name: string; coords: [number, number] }[] = [
    { name: "London", coords: [51.5074, -0.1278] },
    { name: "New York", coords: [40.7128, -74.006] },
    { name: "Tokyo", coords: [35.6895, 139.6917] },
  ];

  const MapMarkerIcon = () => (
    <FontAwesomeIcon icon={faMapMarkerAlt} color="red" size="2x" />
  );
  const mapMarkerIconSvg = renderToString(<MapMarkerIcon />);
  const customMarkerIcon = L.divIcon({
    className: "custom-marker-icon",
    html: mapMarkerIconSvg,
    iconSize: [20, 32],
    iconAnchor: [10, 32],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      () => {
        setPosition([51.505, -0.09]);
      }
    );

    dispatch(fetchFavoriteCitiesWeather(favoriteCities));
  }, [dispatch]);

  // Inside your component, before the return statement
  console.log("weatherData:", weatherData);

  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={position || [51.505, -0.09]}
        zoom={2}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {position && (
          <Marker position={position} icon={customMarkerIcon}>
            <Popup>You are here!</Popup>
          </Marker>
        )}

        {favoriteCities.map((city) => {
          const data = weatherData[city.name];

          const cityCoords: [number, number] = city.coords;

          const temperature = data?.main?.temp;
          console.log("CITY DATA", data);
          const cityName = data?.name || city.name;

          return (
            <Marker
              key={city.name}
              position={cityCoords}
              icon={customMarkerIcon}
            >
              <Popup>
                City: {cityName}
                <br />
                Temperature:{" "}
                {temperature !== undefined ? `${temperature}°C` : "N/A"}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
