# api/signals.py
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from .models import Booking, Room

# When a booking is created, mark the room as unavailable
@receiver(post_save, sender=Booking)
def set_room_unavailable(sender, instance, created, **kwargs):
    if created:
        room = instance.room
        room.is_available = False
        room.save()

# When a booking is deleted, mark the room as available
@receiver(post_delete, sender=Booking)
def set_room_available(sender, instance, **kwargs):
    room = instance.room
    room.is_available = True
    room.save()
