# backend/api/views.py
from datetime import datetime
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Contact, Room, Booking
from .serializers import RoomSerializer, BookingSerializer, ContactSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @action(detail=False, methods=['get'])
    def available(self, request):
        check_in_str = request.GET.get('checkIn')
        check_out_str = request.GET.get('checkOut')
        adults = int(request.GET.get('adults', 1))

        if not check_in_str or not check_out_str:
            return Response({"error": "checkIn and checkOut required"}, status=400)

        check_in = datetime.strptime(check_in_str, "%Y-%m-%d").date()
        check_out = datetime.strptime(check_out_str, "%Y-%m-%d").date()
        days = (check_out - check_in).days or 1

        # Filter rooms by adults capacity and availability
        rooms = Room.objects.filter(max_adults__gte=adults, is_available=True)

        # Calculate total_price for each room
        available_rooms = []
        for room in rooms:
            room.total_price = room.price * days
            available_rooms.append(room)

        serializer = RoomSerializer(available_rooms, many=True, context={'request': request})
        data = serializer.data

        # Inject total_price into serialized data
        for idx, room in enumerate(available_rooms):
            data[idx]['total_price'] = room.total_price

        return Response(data)


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def perform_create(self, serializer):
        # Save booking
        booking = serializer.save()
        # Mark room as unavailable
        room = booking.room
        room.is_available = False
        room.save()

    def perform_destroy(self, instance):
        # Before deleting booking, make room available
        room = instance.room
        room.is_available = True
        room.save()
        instance.delete()


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
