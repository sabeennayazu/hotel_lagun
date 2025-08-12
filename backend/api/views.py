from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q
from .models import Room, Booking, Contact
from .serializers import RoomSerializer, BookingSerializer, ContactSerializer

class RoomViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing Room instances.
    """
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'type', 'description']
    ordering_fields = ['price', 'capacity', 'created_at']

    @action(detail=True, methods=['get'])
    def check_availability(self, request, pk=None):
        """
        Check if the room is available for given dates.
        Expects check_in and check_out dates as query parameters.
        """
        room = self.get_object()
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')

        if not check_in or not check_out:
            return Response(
                {"error": "Please provide check_in and check_out dates"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if there are any overlapping bookings
        overlapping_bookings = Booking.objects.filter(
            room=room,
            status='confirmed',
            check_in__lte=check_out,
            check_out__gte=check_in
        )

        is_available = not overlapping_bookings.exists()
        
        return Response({
            "is_available": is_available,
            "room": RoomSerializer(room).data
        })

    @action(detail=False, methods=['get'])
    def available_rooms(self, request):
        """
        Get all available rooms for given dates.
        Expects check_in and check_out dates as query parameters.
        """
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')

        if not check_in or not check_out:
            return Response(
                {"error": "Please provide check_in and check_out dates"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get all rooms that don't have confirmed bookings for these dates
        booked_rooms = Booking.objects.filter(
            status='confirmed',
            check_in__lte=check_out,
            check_out__gte=check_in
        ).values_list('room_id', flat=True)

        available_rooms = Room.objects.exclude(id__in=booked_rooms)
        serializer = self.get_serializer(available_rooms, many=True)
        
        return Response(serializer.data)

class BookingViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing Booking instances.
    """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email']
    ordering_fields = ['check_in', 'created_at', 'status']

    def perform_create(self, serializer):
        """
        Create a new booking and set its initial status.
        """
        serializer.save(status='pending')

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        """
        Confirm a pending booking.
        """
        booking = self.get_object()
        if booking.status != 'pending':
            return Response(
                {"error": "Only pending bookings can be confirmed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if room is still available
        overlapping_bookings = Booking.objects.filter(
            room=booking.room,
            status='confirmed',
            check_in__lte=booking.check_out,
            check_out__gte=booking.check_in
        ).exclude(id=booking.id)

        if overlapping_bookings.exists():
            return Response(
                {"error": "Room is no longer available for these dates"},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.status = 'confirmed'
        booking.save()
        return Response({"status": "booking confirmed"})

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """
        Cancel a booking.
        """
        booking = self.get_object()
        if booking.status == 'cancelled':
            return Response(
                {"error": "Booking is already cancelled"},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.status = 'cancelled'
        booking.save()
        return Response({"status": "booking cancelled"})

class ContactViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing Contact instances.
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'email', 'subject']
    ordering_fields = ['created_at', 'is_read']

    def perform_create(self, serializer):
        """
        Create a new contact message.
        """
        serializer.save()
        # TODO: Send email notification to admin
        return Response(
            {"message": "Thank you for your message. We will get back to you soon."},
            status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        """
        Mark a contact message as read.
        """
        message = self.get_object()
        if message.is_read:
            return Response({"status": "Message is already marked as read"})

        message.is_read = True
        message.save()
        return Response({"status": "Message marked as read"})
