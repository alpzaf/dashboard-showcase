import { retry } from "@reduxjs/toolkit/query/react";
import { api } from "./api";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface Credentials {
  email: string;
  password: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string; user: User }, Credentials>({
      query: (credentials: Credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
          retry.fail({ fake: "error" });
        },
      },
    }),
  }),
});
