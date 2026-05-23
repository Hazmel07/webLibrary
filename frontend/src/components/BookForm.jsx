import {
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { darkInput, glassCard } from "../styles/theme";

export default function BookForm({ form, setForm, addBook }) {
  return (
    <Card sx={glassCard}>
      <CardContent sx={{ p: { xs: 2, sm: 2.75, md: 3 } }}>

        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 2,
            fontSize: "1.3rem",
          }}
        >
          Add New Book
        </Typography>

        <Stack spacing={{ xs: 1.75, md: 2 }}>

          {/* TITLE */}
          <TextField
            fullWidth
            label="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            sx={darkInput}
          />

          {/* AUTHORS */}
          <TextField
            fullWidth
            label="Authors"
            value={form.authors}
            onChange={(e) =>
              setForm({ ...form, authors: e.target.value })
            }
            sx={darkInput}
          />

          {/* STATUS */}
          <TextField
            fullWidth
            select
            label="Reading Status"
            value={form.status || "want_to_read"}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            sx={darkInput}
          >
            <MenuItem value="want_to_read">Want to read</MenuItem>
            <MenuItem value="reading">Reading</MenuItem>
            <MenuItem value="read">Read</MenuItem>
            <MenuItem value="paused">Paused</MenuItem>
            <MenuItem value="dnf">Did not finish</MenuItem>
          </TextField>

          {/* DESCRIPTION */}
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={2}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            sx={darkInput}
          />

          {/* NOTES */}
          <TextField
            fullWidth
            label="Personal Notes"
            multiline
            rows={2}
            value={form.personal_notes}
            onChange={(e) =>
              setForm({
                ...form,
                personal_notes: e.target.value,
              })
            }
            sx={darkInput}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: { xs: 1.75, md: 2 },
            }}
          >
            {/* LANGUAGE */}
            <TextField
              fullWidth
              label="Language"
              value={form.language}
              onChange={(e) =>
                setForm({
                  ...form,
                  language: e.target.value,
                })
              }
              sx={darkInput}
            />

            {/* PAGE COUNT */}
            <TextField
              fullWidth
              label="Page Count"
              type="number"
              value={form.page_count}
              onChange={(e) =>
                setForm({
                  ...form,
                  page_count: e.target.value,
                })
              }
              sx={darkInput}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: { xs: 1.75, md: 2 },
            }}
          >
            {/* START DATE */}
            <DatePicker
              label="Started Reading"
              value={form.started_at ? dayjs(form.started_at) : null}
              onChange={(newValue) =>
                setForm({
                  ...form,
                  started_at: newValue ? newValue.format("YYYY-MM-DD") : "",
                })
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    ...darkInput,

                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#0f172a",
                      color: "white",
                    },

                    "& .MuiInputBase-input": {
                      color: "white",
                    },

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#334155",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#475569",
                    },

                    "& .MuiSvgIcon-root": {
                      color: "#94a3b8",
                    },
                  },
                },
              }}
            />

            {/* FINISH DATE */}
            <DatePicker
              label="Finished Reading"
              value={form.finished_at ? dayjs(form.finished_at) : null}
              onChange={(newValue) =>
                setForm({
                  ...form,
                  finished_at: newValue ? newValue.format("YYYY-MM-DD") : "",
                })
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    ...darkInput,

                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#0f172a",
                      color: "white",
                    },

                    "& .MuiInputBase-input": {
                      color: "white",
                    },

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#334155",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#475569",
                    },

                    "& .MuiSvgIcon-root": {
                      color: "#94a3b8",
                    },
                  },
                },
              }}
            />
          </Box>

          {/* RATING */}
          <Box>
            <Typography sx={{ color: "#cbd5e1", mb: 1 }}>
              Rating
            </Typography>

            <Rating
              value={form.rating}
              onChange={(e, newValue) =>
                setForm({ ...form, rating: newValue })
              }
            />
          </Box>

          {/* BUTTON */}
          <Button
            variant="contained"
            size="large"
            onClick={addBook}
            sx={{
              mt: 0.5,
              py: 1.35,
              borderRadius: "14px",
              fontWeight: "bold",
              background:
                "linear-gradient(135deg,#3b82f6,#2563eb)",
            }}
          >
            ➕ Add Book
          </Button>

        </Stack>
      </CardContent>
    </Card>
  );
}
