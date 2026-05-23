import axios from "axios";

const DEFAULT_API_BASE_URL = "http://localhost:8000/api";

export function getApiBaseUrl(env = import.meta.env) {
  const configuredUrl = env?.VITE_API_BASE_URL?.trim();
  const baseUrl = configuredUrl || DEFAULT_API_BASE_URL;

  return baseUrl.replace(/\/+$/, "");
}

export const httpClient = axios.create({
  baseURL: getApiBaseUrl(),
});
