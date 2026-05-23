import {
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";

import { glassCard } from "../styles/theme";

export default function BookCard({
  book,
  deleteBook,
}) {
  return (
    <Card
      sx={{
        ...glassCard,
        transition: "0.25s",

        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          gap: { xs: 2, sm: 2.5 },
          p: { xs: 2, sm: 2.5 },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {book.cover_url && (
          <Box
            component="img"
            src={book.cover_url}
            alt={book.title}
            sx={{
              width: { xs: "100%", sm: 100 },
              maxWidth: { xs: 180, sm: 100 },
              height: { xs: 220, sm: 150 },
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        )}

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "white" }}
          >
            {book.title}
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              mb: 0.75,
            }}
          >
            {book.authors?.join(", ")}
          </Typography>

          <Rating
            value={book.rating || 0}
            readOnly
          />

          <Typography
            sx={{
              color: "#cbd5e1",
              mt: 1.5,
            }}
          >
            {book.description}
          </Typography>

          <Button
            color="error"
            variant="outlined"
            sx={{
              mt: 2,
              borderRadius: "10px",
            }}
            onClick={() => deleteBook(book.id)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
