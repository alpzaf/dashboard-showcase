import { api } from "./api";

interface Config {
  [key: string]: unknown;
}

export const configApi = api.injectEndpoints({
  endpoints: (build) => ({
    getConfig: build.query<Config, void>({
      query: () => ({
        url: "config",
      }),
    }),
  }),
});
