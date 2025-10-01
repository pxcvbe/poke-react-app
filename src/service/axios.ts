import Axios from "axios";

// Base URL
const BASE_URL = import.meta.env.VITE_POKEAPI_BASE_URL

if (!BASE_URL) {
  console.warn("POKEAPI_BASE_URL belum di-set di .env");
}

export const api = Axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// Simple in-memory cache for GETs (persession)
const cache = new Map<string, any>();

api.interceptors.request.use((config) => {
  if (config.method === "get") {
    const params = config.params
      ? new URLSearchParams(config.params as any).toString()
      : "";
    const key = `${config.baseURL}${config.url}${params ? "?" + params : ""}`;
    (config as any)._cacheKey = key;
    if (cache.has(key)) {
      // @ts-ignore
      config.adapter = async () => ({
        data: cache.get(key),
        status: 200,
        statusText: "OK(CACHED)",
        headers: {},
        config,
        request: {},
      });
    }
  }
  return config;
});

api.interceptors.response.use((resp) => {
  const key = (resp.config as any)._cacheKey;
  if (key && !cache.has(key)) cache.set(key, resp.data);
  return resp;
});
