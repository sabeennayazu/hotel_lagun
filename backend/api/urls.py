from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoomViewSet, BookingViewSet, ContactViewSet

# Create a router instance
router = DefaultRouter()

# Register Room URLs - All room related endpoints
# GET /api/rooms/ - List all rooms
# POST /api/rooms/ - Create a new room
# GET /api/rooms/{id}/ - Get room details
# PUT /api/rooms/{id}/ - Update room
# DELETE /api/rooms/{id}/ - Delete room
# Custom actions:
# GET /api/rooms/{id}/check_availability/ - Check if specific room is available
# GET /api/rooms/available_rooms/ - List all available rooms for given dates
router.register(r'rooms', RoomViewSet)

# Register Booking URLs - All booking related endpoints
# GET /api/bookings/ - List all bookings
# POST /api/bookings/ - Create a new booking
# GET /api/bookings/{id}/ - Get booking details
# PUT /api/bookings/{id}/ - Update booking
# DELETE /api/bookings/{id}/ - Delete booking
# Custom actions:
# POST /api/bookings/{id}/confirm/ - Confirm a pending booking
# POST /api/bookings/{id}/cancel/ - Cancel a booking
router.register(r'bookings', BookingViewSet)

# Register Contact URLs - All contact form related endpoints
# GET /api/contact/ - List all contact messages
# POST /api/contact/ - Submit a new contact message
# GET /api/contact/{id}/ - Get message details
# PUT /api/contact/{id}/ - Update message
# DELETE /api/contact/{id}/ - Delete message
# Custom actions:
# POST /api/contact/{id}/mark_as_read/ - Mark message as read
router.register(r'contact', ContactViewSet)

# Include all router URLs in the urlpatterns
urlpatterns = [
    path('', include(router.urls)),
]
