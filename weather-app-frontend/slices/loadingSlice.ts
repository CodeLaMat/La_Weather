import { LoadingState } from "../types/mainTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: LoadingState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isFetchingWeather: false,
  isRequestingPasswordReset: false,
  isResettingPassword: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading(state, action: PayloadAction<keyof LoadingState>) {
      const key = action.payload;
      state[key] = true;
    },
    stopLoading(state, action: PayloadAction<keyof LoadingState>) {
      const key = action.payload;
      state[key] = false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
