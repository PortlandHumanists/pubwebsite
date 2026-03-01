import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'f377d7c6a0aea94bb5cc62da8dccbcca27b88ae6', queries,  });
export default client;
  