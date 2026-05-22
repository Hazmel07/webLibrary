from django.shortcuts import render

# Create your views here.
from django.db.models import Q
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny

from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "status",
        "rating",
        "language",
    ]

    search_fields = [
        "title",
        "description",
        "authors",
    ]

    ordering_fields = [
        "created_at",
        "updated_at",
        "title",
        "rating",
        "page_count",
    ]

    ordering = [
        "-created_at",
    ]

    