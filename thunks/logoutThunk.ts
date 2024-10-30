import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "../slices/loadingSlice";
import { signOut } from "next-auth/react";

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    dispatch(startLoading("isLoggingOut"));
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      dispatch(stopLoading("isLoggingOut"));
    }
  }
);
