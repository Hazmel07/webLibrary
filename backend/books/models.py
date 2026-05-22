from django.utils import timezone

from django.db import models

# Create your models here.

class BookStatus(models.TextChoices):
    WANT_TO_READ = "want_to_read", "Want to read"
    READING = "reading", "Reading"
    READ = "read", "Read"
    PAUSED = "paused", "Paused"
    DNF = "dnf", "Did not finish"


class Book(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)

    authors = models.JSONField(default=list)

    description = models.TextField(blank=True, null=True)
    personal_notes = models.TextField(blank=True, null=True)

    status = models.CharField(
        max_length=50,
        choices=BookStatus.choices,
        default=BookStatus.WANT_TO_READ,
    )

    rating = models.PositiveSmallIntegerField(blank=True, null=True)

    language = models.CharField(max_length=50, blank=True, null=True)
    page_count = models.PositiveIntegerField(blank=True, null=True)

    cover_url = models.URLField(blank=True, null=True)

    started_at = models.DateField(blank=True, null=True)
    finished_at = models.DateField(blank=True, null=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title