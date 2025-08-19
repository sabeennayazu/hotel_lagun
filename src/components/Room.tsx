'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export interface RoomType {
  id: number;
  name: string;
  description: string;
  max_adults: number;
  price: number;
  total_price: number;
  category: { name: string };
  bed_type: { name: string | null };
  image?: string;
}

interface RoomProps {
  room: RoomType;
  checkIn: string;
  checkOut: string;
  adults: number;
}

const Room = ({ room, checkIn, checkOut, adults }: RoomProps) => {
  const router = useRouter();


  // Save booking info in cookie
  Cookies.set('bookingInfo', JSON.stringify({ checkIn, checkOut, adults, room }));
  Cookies.set('selectedRoom', JSON.stringify({ room }));
  console.log("Cookie has been set bis");

  const handleClick = () => {
    router.push(
      `/book-room/${room.id}?check_in=${checkIn}&check_out=${checkOut}&adults=${adults}`
    );
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"

    >
      {room.image && (
        <img
          src={`http://localhost:8000${room.image}`}
          alt={room.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{room.name}</h2>
        <p className="text-gray-700 mb-1">
          Category: {room.category.name} | Bed: {room.bed_type?.name || 'N/A'}
        </p>
        <p className="text-gray-700 mb-2">{room.description}</p>
        <p className="text-gray-900 font-bold">Price: ${room.total_price}</p>
      </div>
    </div>
  );
};

export default Room;
