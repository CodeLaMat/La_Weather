import { backendApiRoutes } from "@/lib/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "@/slices/loadingSlice";
import { LoginUserArgs, LoginUserResponse } from "@/types/mainTypes";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      surname,
      email,
      password,
    }: { name: string; surname: string; email: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    dispatch(startLoading("isLoggingIn"));
    try {
      const response = await fetch(`${backendApiRoutes.REGISTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, surname }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.message || "Registration failed");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    } finally {
      dispatch(stopLoading("isLoggingIn"));
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async ({ email }: { email: string }, { dispatch, rejectWithValue }) => {
    dispatch(startLoading("isRequestingPasswordReset"));
    try {
      const response = await fetch(
        `${backendApiRoutes.REQUEST_PASSWORD_RESET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset request failed");
      }

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    } finally {
      dispatch(stopLoading("isRequestingPasswordReset"));
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { token, password }: { token: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(startLoading("isResettingPassword"));
    try {
      const response = await fetch(`${backendApiRoutes.RESET_PASSWORD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    } finally {
      dispatch(stopLoading("isResettingPassword"));
    }
  }
);

export const loginUser = createAsyncThunk<
  LoginUserResponse,
  LoginUserArgs,
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue, dispatch }) => {
  dispatch(startLoading("isLoggingIn"));
  try {
    const response = await fetch(`${backendApiRoutes.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      throw new Error(data.message || "Login failed");
    }

    const data: LoginUserResponse = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  } finally {
    dispatch(stopLoading("isLoggingIn"));
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendApiRoutes.LOGOUT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);

        throw new Error(data.message || "Logout failed");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
