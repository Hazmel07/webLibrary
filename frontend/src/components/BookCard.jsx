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
          gap: 3,
        }}
      >
        {book.cover_url && (
          <Box
            component="img"
            src={book.cover_url}
            alt={book.title}
            sx={{
              width: 100,
              height: 150,
              objectFit: "cover",
              borderRadius: "14px",
            }}
          />
        )}

        <Box flex={1}>
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
              mb: 1,
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
              mt: 2,
            }}
          >
            {book.description}
          </Typography>

          <Button
            color="error"
            variant="outlined"
            sx={{
              mt: 3,
              borderRadius: "12px",
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