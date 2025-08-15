'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Room, { RoomType } from '@/components/Room';

const RoomsPage = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const checkIn = searchParams.get('check_in') || '';
  const checkOut = searchParams.get('check_out') || '';
  const adults = Number(searchParams.get('adults') || 1);

  useEffect(() => {
    if (!checkIn || !checkOut) return;

    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/rooms/available/?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}`
        );
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [checkIn, checkOut, adults]);

  return (
    <Layout>
      {!checkIn || !checkOut ? (
        <p className="text-center mt-12">Please select check-in and check-out dates.</p>
      ) : loading ? (
        <p className="text-center mt-12">Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <p className="text-center mt-12">No rooms available for your selection.</p>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Room
              key={room.id}
              room={room}
              checkIn={checkIn}
              checkOut={checkOut}
              adults={adults}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default RoomsPage;
