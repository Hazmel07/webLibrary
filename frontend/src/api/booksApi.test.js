import test from "node:test";
import assert from "node:assert/strict";

import { createBook, deleteBookById, listBooks } from "./booksApi.js";

test("listBooks returns data from the books endpoint", async () => {
  const client = {
    async get(url) {
      assert.equal(url, "/books/");
      return { data: [{ id: 1, title: "Dune" }] };
    },
  };

  assert.deepEqual(await listBooks(client), [{ id: 1, title: "Dune" }]);
});

test("createBook posts normalized form data to the books endpoint", async () => {
  let postedPayload;
  const client = {
    async post(url, payload) {
      assert.equal(url, "/books/");
      postedPayload = payload;
      return { data: { id: 1, ...payload } };
    },
  };

  const created = await createBook(
    {
      title: "Dune",
      authors: "Frank Herbert",
      rating: 0,
      page_count: "",
      started_at: "",
      finished_at: "",
    },
    client,
  );

  assert.equal(created.id, 1);
  assert.deepEqual(postedPayload.authors, ["Frank Herbert"]);
  assert.equal(postedPayload.rating, null);
  assert.equal(postedPayload.page_count, null);
});

test("deleteBookById deletes a single book resource", async () => {
  const client = {
    async delete(url) {
      assert.equal(url, "/books/42/");
      return { data: null };
    },
  };

  await deleteBookById(42, client);
});
