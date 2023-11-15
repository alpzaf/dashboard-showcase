import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { state } from "./entity";

export const mockServer = () => {
  const server = setupServer(...handlers);

  return { server, state };
};
