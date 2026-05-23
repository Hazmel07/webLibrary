import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import SearchBar from "./components/SearchBar";
import BookForm from "./components/BookForm";
import BookCard from "./components/BookCard";

import { createBook, deleteBookById, listBooks } from "./api/booksApi";
import { pageBackground } from "./styles/theme";

const addButtonStyle = {
  padding: "14px 28px",
  borderRadius: "14px",
  border: "none",
  background: "#3b82f6",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};

const backButtonStyle = {
  padding: "12px 22px",
  borderRadius: "12px",
  border: "none",
  background: "#1e293b",
  color: "white",
  cursor: "pointer",
};

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
      <Container maxWidth="md" sx={{ px: { xs: 0, sm: 3 } }}>

        {/* HEADER */}
        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 5 } }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color: "white",
              letterSpacing: 0,
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
          <Box sx={{ mt: { xs: 2.5, md: 3 } }}>
            <button
              type="button"
              onClick={() => setPage("add")}
              style={addButtonStyle}
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
        <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ mt: { xs: 3, md: 4 } }}>
          {books.length === 0 ? (
            <Typography
              sx={{
                color: "#94a3b8",
                textAlign: "center",
                mt: { xs: 3, md: 4 },
              }}
            >
              No books yet, add your first one 📚
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
    setBooks(await listBooks());
  };

  useEffect(() => {
    let ignore = false;

    async function loadBooks() {
      const data = await listBooks();
      if (!ignore) {
        setBooks(data);
      }
    }

    loadBooks();

    return () => {
      ignore = true;
    };
  }, []);

  /* =========================
     ADD
  ========================= */
  const addBook = async () => {
    await createBook(form);

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
    await deleteBookById(id);
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
          <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 3 } }}>

            {/* BACK BUTTON */}
            <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
              <button
                type="button"
                onClick={() => setPage("home")}
                style={backButtonStyle}
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
