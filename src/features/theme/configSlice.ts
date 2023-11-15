import { createSlice } from "@reduxjs/toolkit";
import { configApi } from "@/services/config";
import type { RootState } from "@/store/store";

const initialState = {
  style: "",
  theme: null,
  radius: 0,
} as {
  style: string;
  theme: { [key: string]: unknown } | null;
  radius: number;
};

const slice = createSlice({
  name: "config",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        configApi.endpoints.getConfig.matchPending,
        (state, action) => {
          console.log("pending", action);
        }
      )
      .addMatcher(
        configApi.endpoints.getConfig.matchFulfilled,
        (state, action) => {
          console.log("fulfilled", action);
          state.theme = { ...action.payload };
        }
      )
      .addMatcher(
        configApi.endpoints.getConfig.matchRejected,
        (state, action) => {
          console.log("rejected", action);
        }
      );
  },
});

export const { reset } = slice.actions;
export default slice.reducer;

export const selectTheme = (state: RootState) => state.config.theme;
