import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "@/services/user";
import type { User } from "@/services/user";
import type { RootState } from "../../store/store";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
} as { user: null | User; token: string | null; isAuthenticated: boolean };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchPending, (state, action) => {
        console.log("pending", action);
      })
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log("fulfilled", action);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addMatcher(userApi.endpoints.login.matchRejected, (state, action) => {
        console.log("rejected", action);
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
