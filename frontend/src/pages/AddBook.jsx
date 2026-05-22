import { Box, Container, Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";

export default function AddBook({ addBook }) {
  const navigate = useNavigate();

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

  const handleAdd = async () => {
    await addBook(form);
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#0f172a", py: 6 }}>
      <Container maxWidth="sm">

        <Box mb={3}>
          <Button component={Link} to="/" variant="outlined">
            ← Back
          </Button>
        </Box>

        <BookForm
          form={form}
          setForm={setForm}
          addBook={handleAdd}
        />

      </Container>
    </Box>
  );
}