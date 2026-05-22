from rest_framework import serializers

from .models import Book

class BookSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Book
        fields = [
            "id",
            "title",
            "subtitle",
            "authors",
            "description",
            "personal_notes",
            "status",
            "rating",
            "language",
            "page_count",
            "cover_url",
            "started_at",
            "finished_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
    
        ]

    def validate_authors(self, value):
        if not value:
            raise serializers.ValidationError("At least one author is required.")

        if not isinstance(value, list):
            raise serializers.ValidationError("Authors must be a list.")

        for author in value:
            if not isinstance(author, str) or not author.strip():
                raise serializers.ValidationError(
                    "Each author must be a non-empty string."
                )   

        return value

    def validate_rating(self, value):
        if value is not None and not 1 <= value <= 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value

    def validate(self, attrs):
        started_at = attrs.get("started_at")
        finished_at = attrs.get("finished_at")

        if started_at and finished_at and finished_at < started_at:
            raise serializers.ValidationError(
                "Finished date cannot be before started date."
            )

        return attrs
