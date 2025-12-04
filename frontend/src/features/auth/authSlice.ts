import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginCredentials, User } from "./types";
import { api } from "../../services/api";
import type { AxiosError } from "axios";

interface LoginResponse {
  token: string;
  user: User;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    const message =
      error.response?.data?.message ||
      "Erro ao fazer login. Verifique as credenciais.";

    return rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreSession(state) {
      const token = localStorage.getItem("auth_token");
      const userJson = localStorage.getItem("auth_user");
      if (token && userJson) {
        state.token = token;
        state.user = JSON.parse(userJson) as User;
      }
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.error = null;

          localStorage.setItem("auth_token", action.payload.token);
          localStorage.setItem(
            "auth_user",
            JSON.stringify(action.payload.user)
          );
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro ao fazer login.";
      });
  },
});

export const { restoreSession, logout } = authSlice.actions;
export default authSlice.reducer;
