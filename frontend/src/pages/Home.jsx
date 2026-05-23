import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

export default function Home({ books, deleteBook }) {
  return (
    <Box sx={{ minHeight: "100vh", background: "#0f172a", py: 6 }}>
      <Container maxWidth="md">

        <Typography
          variant="h3"
          sx={{ color: "white", mb: 4, textAlign: "center" }}
        >
          📚 My Library
        </Typography>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            component={Link}
            to="/add"
            variant="contained"
          >
            ➕ Add Book
          </Button>
        </Box>

        <Stack spacing={3}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              deleteBook={deleteBook}
            />
          ))}
        </Stack>

      </Container>
    </Box>
  );
}
