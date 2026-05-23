import test from "node:test";
import assert from "node:assert/strict";

import { getApiBaseUrl } from "./httpClient.js";

test("getApiBaseUrl falls back to the local Django API", () => {
  assert.equal(getApiBaseUrl({}), "http://localhost:8000/api");
});

test("getApiBaseUrl uses VITE_API_BASE_URL and normalizes trailing slashes", () => {
  assert.equal(
    getApiBaseUrl({ VITE_API_BASE_URL: "https://example.test/api///" }),
    "https://example.test/api",
  );
});
