from django.contrib import admin
from .models import Category, BedType, Room, Booking, Contact

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']

@admin.register(BedType)
class BedTypeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'bed_type', 'price', 'max_adults',  'is_available']
    list_filter = ['category', 'bed_type', 'is_available']
    search_fields = ['name', 'description']

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['id', 'room', 'first_name', 'last_name', 'check_in', 'check_out', 'adults',  'created_at']
    list_filter = ['check_in', 'check_out', 'room']
    search_fields = ['first_name', 'last_name', 'email', 'phone']
    readonly_fields = ['created_at']
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'country', 'district', 'tole', 'phone', 'email')
    search_fields = ('country', 'district', 'tole', 'phone', 'email')