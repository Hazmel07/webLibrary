from django.test import SimpleTestCase


class BookCorsTests(SimpleTestCase):
    def test_vite_dev_origin_can_preflight_book_create(self):
        response = self.client.options(
            "/api/books/",
            HTTP_ORIGIN="http://localhost:5173",
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
            HTTP_ACCESS_CONTROL_REQUEST_HEADERS="content-type",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.headers.get("access-control-allow-origin"),
            "http://localhost:5173",
        )
        self.assertIn("POST", response.headers["access-control-allow-methods"])
