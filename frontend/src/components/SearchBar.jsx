import {
  Box,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function SearchBar({
  query,
  setQuery,
  suggestions,
  setSuggestions,
  setForm,
  searchBooks,
}) {
  return (
    <Box sx={{ position: "relative", mb: 4 }}>
      <TextField
        fullWidth
        label="Smart search books..."
        value={query}
        onChange={(e) => searchBooks(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            background: "rgba(255,255,255,0.08)",
            borderRadius: "18px",
            color: "white",
          },

          "& .MuiInputLabel-root": {
            color: "#cbd5e1",
          },
        }}
      />

      {suggestions.length > 0 && (
        <Paper
          elevation={10}
          sx={{
            position: "absolute",
            width: "100%",
            mt: 1,
            borderRadius: "18px",
            overflow: "hidden",
            background: "rgba(15,23,42,0.96)",
            maxHeight: 320,
            overflowY: "auto",
            zIndex: 20,
          }}
        >
          {suggestions.map((item) => {
            const info = item.volumeInfo;

            return (
              <Box
                key={item.id}
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    title: info.title || "",
                    authors: (info.authors || []).join(", "),
                    description:
                      info.description || "",
                    cover_url:
                      info.imageLinks?.thumbnail || "",
                    language: info.language || "",
                    page_count: info.pageCount || "",
                  }));

                  setQuery(info.title || "");
                  setSuggestions([]);
                }}
                sx={{
                  p: 2,
                  cursor: "pointer",

                  "&:hover": {
                    background:
                      "rgba(255,255,255,0.06)",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {info.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                  }}
                >
                  {(info.authors || []).join(", ")}
                </Typography>
              </Box>
            );
          })}
        </Paper>
      )}
    </Box>
  );
}