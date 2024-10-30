import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const FavoritesList = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  return (
    <div>
      <h2>My Favorite Cities</h2>
      <ul>
        {favorites.map((city) => (
          <li key={city.id}>
            {city.name}, {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
