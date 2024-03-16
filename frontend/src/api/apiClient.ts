import axios from "axios";

import { AppApi } from "../generated-api";

const options = {
  isJsonMime: (mime: string) => mime === "application/json",
  headers: {
    "Content-Type": "application/json",
  },
};

const endpoint = import.meta.env.VITE_API_ENDPOINT;

export const apiClientRaw = axios.create();

export const appApi = new AppApi(options, endpoint, apiClientRaw);
