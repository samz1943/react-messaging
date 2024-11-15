import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/authActions";

interface AuthState {
  username: string | null;
  token: string | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  username: null,
  token: null,
  loading: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.username = action.payload.username;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to login';
      });
  }
});

export default authSlice.reducer;