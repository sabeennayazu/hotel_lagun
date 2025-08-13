from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class BedType(models.Model):
    name = models.CharField(max_length=50, unique=True)  # e.g. "Single Bed"
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Room(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="rooms")
    bed_type = models.ForeignKey(BedType, on_delete=models.SET_NULL, null=True, blank=True, related_name="rooms")
    max_adults = models.PositiveIntegerField(default=1)
    max_children = models.PositiveIntegerField(default=0)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.category.name} - {self.bed_type.name if self.bed_type else 'No bed type'}"


class Booking(models.Model):
    room = models.ForeignKey('Room', on_delete=models.CASCADE, related_name='bookings')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)  # optional
    phone = models.CharField(max_length=20)
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.PositiveIntegerField()
    children = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking for {self.room.name} ({self.check_in} to {self.check_out}) by {self.first_name} {self.last_name}"

class Contact(models.Model):
    country = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    tole = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return f"{self.tole}, {self.district}, {self.country} - {self.phone}"