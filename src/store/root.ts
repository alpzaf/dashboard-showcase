import { combineReducers } from "@reduxjs/toolkit";
import { api } from "@/services/api";
import authSlice from "@/features/auth/authSlice";
import configSlice from "@/features/theme/configSlice";

export const rootReducer = combineReducers({
  config: configSlice,
  auth: authSlice,
  [api.reducerPath]: api.reducer,
});
