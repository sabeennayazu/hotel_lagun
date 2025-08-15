from rest_framework import serializers
from .models import Category, BedType, Room, Booking, Contact

# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

# BedType Serializer
class BedTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BedType
        fields = ['id', 'name', 'description']

# Room Serializer with nested category and bed type
class RoomSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    bed_type = BedTypeSerializer(read_only=True)
    image = serializers.ImageField(required=False)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = [
            'id',
            'name',
            'category',
            'bed_type',
            'price',
            'description',
            'max_adults',
            'total_price',
            'is_available',
            'image'
        ]
    def get_total_price(self, obj):
        # obj.total_price is added dynamically in the view
        return getattr(obj, 'total_price', obj.price)

# Booking Serializer
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'id',
            'room',
            'first_name',
            'last_name',
            'email',
            'phone',
            'check_in',
            'check_out',
            'adults',
            
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
