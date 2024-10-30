import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser } from "@/thunks/auth";

interface AuthState {
  isRegistered: boolean;
  registrationError: string | null;
}

const initialState: AuthState = {
  isRegistered: false,
  registrationError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegistered = false;
        state.registrationError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistered = true;
        state.registrationError = null;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.isRegistered = false;
        state.registrationError = action.payload;
      });
  },
});

export default authSlice.reducer;
