import test from "node:test";
import assert from "node:assert/strict";

import { buildBookPayload } from "./bookPayload.js";

test("buildBookPayload converts form-only empty values into API nulls", () => {
  const payload = buildBookPayload({
    title: "The Left Hand of Darkness",
    authors: "Ursula K. Le Guin, ",
    description: "",
    cover_url: "",
    rating: 0,
    status: "want_to_read",
    personal_notes: "",
    language: "",
    page_count: "",
    started_at: "",
    finished_at: "",
  });

  assert.deepEqual(payload, {
    title: "The Left Hand of Darkness",
    authors: ["Ursula K. Le Guin"],
    description: "",
    cover_url: "",
    rating: null,
    status: "want_to_read",
    personal_notes: "",
    language: "",
    page_count: null,
    started_at: null,
    finished_at: null,
  });
});

test("buildBookPayload keeps provided numeric and date values API-ready", () => {
  const payload = buildBookPayload({
    title: "Dune",
    authors: "Frank Herbert",
    rating: 5,
    page_count: "412",
    started_at: "2026-05-01",
    finished_at: "2026-05-10",
  });

  assert.equal(payload.rating, 5);
  assert.equal(payload.page_count, 412);
  assert.equal(payload.started_at, "2026-05-01");
  assert.equal(payload.finished_at, "2026-05-10");
});
