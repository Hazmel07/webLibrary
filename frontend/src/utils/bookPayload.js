const splitAuthors = (authors) => {
  if (Array.isArray(authors)) {
    return authors.map((author) => author.trim()).filter(Boolean);
  }

  return String(authors ?? "")
    .split(",")
    .map((author) => author.trim())
    .filter(Boolean);
};

const optionalDate = (value) => value || null;

const optionalPositiveNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
};

export function buildBookPayload(form) {
  return {
    ...form,
    authors: splitAuthors(form.authors),
    rating: optionalPositiveNumber(form.rating),
    page_count: optionalPositiveNumber(form.page_count),
    started_at: optionalDate(form.started_at),
    finished_at: optionalDate(form.finished_at),
  };
}
