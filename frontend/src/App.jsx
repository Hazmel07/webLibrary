import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import SearchBar from "./components/SearchBar";
import BookForm from "./components/BookForm";
import BookCard from "./components/BookCard";

import { pageBackground } from "./styles/theme";

/* =========================
   HOME PAGE
========================= */
function Home({
  books,
  deleteBook,
  query,
  setQuery,
  suggestions,
  setSuggestions,
  setForm,
  searchBooks,
  setPage,
}) {
  return (
    <Box sx={pageBackground}>
      <Container maxWidth="md">

        {/* HEADER */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            📚 Book Library
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              mt: 1,
            }}
          >
            Your personal reading universe
          </Typography>

          {/* ADD BUTTON */}
          <Box mt={4}>
            <button
              onClick={() => setPage("add")}
              style={{
                padding: "14px 28px",
                borderRadius: "14px",
                border: "none",
                background: "#3b82f6",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ➕ Add Book
            </button>
          </Box>
        </Box>

        {/* SEARCH */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          setForm={setForm}
          searchBooks={searchBooks}
        />

        {/* BOOKS */}
        <Stack spacing={3} mt={5}>
          {books.length === 0 ? (
            <Typography
              sx={{
                color: "#94a3b8",
                textAlign: "center",
                mt: 5,
              }}
            >
              No books yet — add your first one 📚
            </Typography>
          ) : (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                deleteBook={deleteBook}
              />
            ))
          )}
        </Stack>

      </Container>
    </Box>
  );
}

/* =========================
   APP ROOT
========================= */
export default function App() {
  const API_URL = "http://localhost:8000/api/books/";

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [books, setBooks] = useState([]);

  /* PAGE STATE */
  const [page, setPage] = useState("home");

  /* FORM */
  const [form, setForm] = useState({
    title: "",
    authors: "",
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

  /* =========================
     SEARCH
  ========================= */
 const searchBooks = async (text) => {
  setQuery(text);
  setSuggestions([]);
  };

  /* =========================
     FETCH
  ========================= */
  const fetchBooks = async () => {
    const res = await axios.get(API_URL);
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* =========================
     ADD
  ========================= */
  const addBook = async () => {
    await axios.post(API_URL, {
      ...form,
      authors: form.authors
        .split(",")
        .map((a) => a.trim()),
    });

    setForm({
      title: "",
      authors: "",
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

    setQuery("");
    setSuggestions([]);

    fetchBooks();

    /* GO BACK HOME */
    setPage("home");
  };

  /* =========================
     DELETE
  ========================= */
  const deleteBook = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    fetchBooks();
  };

  /* =========================
     UI
  ========================= */
  return (
    <>
      {page === "home" ? (
        <Home
          books={books}
          deleteBook={deleteBook}
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          setForm={setForm}
          searchBooks={searchBooks}
          setPage={setPage}
        />
      ) : (
        <Box sx={pageBackground}>
          <Container maxWidth="sm">

            {/* BACK BUTTON */}
            <Box mb={4}>
              <button
                onClick={() => setPage("home")}
                style={{
                  padding: "12px 22px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#1e293b",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            </Box>

            {/* FORM */}
            <BookForm
              form={form}
              setForm={setForm}
              addBook={addBook}
            />

          </Container>
        </Box>
      )}
    </>
  );
}