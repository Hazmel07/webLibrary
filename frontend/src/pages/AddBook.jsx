import { Box, Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { pageBackground } from "../styles/theme";

const backButtonStyle = {
  padding: "12px 22px",
  borderRadius: "12px",
  border: "none",
  background: "#1e293b",
  color: "white",
  cursor: "pointer",
};

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
    <Box sx={pageBackground}>
      <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 3 } }}>

        <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={backButtonStyle}
          >
            ← Back
          </button>
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
