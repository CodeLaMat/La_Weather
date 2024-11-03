import axios from "axios";
import { AppThunk } from "../store/store";
import {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  addFavoriteStart,
  addFavoriteSuccess,
  addFavoriteFailure,
  removeFavoriteStart,
  removeFavoriteSuccess,
  removeFavoriteFailure,
} from "../slices/favoritesSlice";
import { FavoriteCity } from "../types/mainTypes";
import { backendApiRoutes } from "../lib/apiRoutes";

type FavoritesAction = "fetch" | "add" | "remove";
type AddPayload = { userId: string; city: FavoriteCity };
type FetchPayload = { userId: string };
type RemovePayload = { userId: string; cityId: string };
type FavoritesPayload = FetchPayload | AddPayload | RemovePayload | undefined;

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return "An unknown error occurred";
};

export const favoritesThunk =
  (
    actionType: FavoritesAction,
    token: string | undefined,
    payload?: FavoritesPayload
  ): AppThunk =>
  async (dispatch) => {
    if (!token) {
      console.error("No access token available");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      switch (actionType) {
        case "fetch":
          dispatch(fetchFavoritesStart());
          try {
            const { userId } = payload as FetchPayload;
            const response = await axios.post<{
              favoriteCities: FavoriteCity[];
            }>(backendApiRoutes.FAVORITES, { userId }, { headers });
            dispatch(fetchFavoritesSuccess(response.data.favoriteCities));
          } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            dispatch(fetchFavoritesFailure(errorMessage));
          }
          break;

        case "add":
          dispatch(addFavoriteStart());
          try {
            const { userId, city } = payload as AddPayload;
            const response = await axios.post<{ city: FavoriteCity }>(
              backendApiRoutes.ADD_FAVORITE,
              { userId, city },
              { headers }
            );
            dispatch(addFavoriteSuccess(response.data.city));
          } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            dispatch(addFavoriteFailure(errorMessage));
          }
          break;

        case "remove":
          dispatch(removeFavoriteStart());
          try {
            const { userId, cityId } = payload as RemovePayload;
            await axios.post(
              backendApiRoutes.REMOVE_FAVORITE,
              { userId, cityId },
              { headers }
            );
            dispatch(removeFavoriteSuccess(cityId));
          } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            dispatch(removeFavoriteFailure(errorMessage));
          }
          break;

        default:
          throw new Error("Invalid action type");
      }
    } catch (error) {
      console.error("Unexpected error in favoritesThunk:", error);
    }
  };
