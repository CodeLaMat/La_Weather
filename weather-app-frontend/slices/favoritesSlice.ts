import { FavoriteCity } from "../types/mainTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  loading: boolean;
  favorites: FavoriteCity[];
  error: string | null;
}

const initialState: FavoritesState = {
  loading: false,
  favorites: [],
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    fetchFavoritesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFavoritesSuccess(state, action: PayloadAction<FavoriteCity[]>) {
      state.loading = false;
      state.favorites = action.payload;
    },
    fetchFavoritesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addFavoriteStart(state) {
      state.loading = true;
      state.error = null;
    },
    addFavoriteSuccess(state, action: PayloadAction<FavoriteCity>) {
      state.loading = false;
      state.favorites.push(action.payload);
    },
    addFavoriteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    removeFavoriteStart(state) {
      state.loading = true;
      state.error = null;
    },
    removeFavoriteSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.favorites = state.favorites.filter(
        (city) => city.id !== action.payload
      );
    },
    removeFavoriteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  addFavoriteStart,
  addFavoriteSuccess,
  addFavoriteFailure,
  removeFavoriteStart,
  removeFavoriteSuccess,
  removeFavoriteFailure,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
