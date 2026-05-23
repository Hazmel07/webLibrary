import { httpClient } from "./httpClient.js";
import { buildBookPayload } from "../utils/bookPayload.js";

export async function listBooks(client = httpClient) {
  const response = await client.get("/books/");
  return response.data;
}

export async function createBook(form, client = httpClient) {
  const response = await client.post("/books/", buildBookPayload(form));
  return response.data;
}

export async function deleteBookById(id, client = httpClient) {
  await client.delete(`/books/${id}/`);
}
