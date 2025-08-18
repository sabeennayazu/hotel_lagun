'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BookRoomPage = () => {
  const router = useRouter();
  const params = useParams(); // get room id from url
  const searchParams = useSearchParams();

  const roomId = params?.id;
  const check_in = searchParams.get('check_in');
  const check_out = searchParams.get('check_out');
  const adults = searchParams.get('adults') || '1';

  const [room, setRoom] = useState<{ name: string; price: number; image?: string } | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  // redirect if missing params
  useEffect(() => {
    if (!roomId || !check_in || !check_out || !adults) {
      router.push('/');
    }
  }, [roomId, check_in, check_out, adults, router]);

  // fetch room details
  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/rooms/${roomId}/`);
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error('Error fetching room:', err);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { first_name, last_name, email, phone } = formData;

    if (!first_name || !last_name) {
      alert('Name cannot be empty');
      return;
    }

    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Phone number must be 10 digits');
      return;
    }

    const payload = {
      room: Number(roomId),
      first_name,
      last_name,
      email,
      phone,
      check_in,
      check_out,
      adults: Number(adults),
    };

    try {
      const res = await fetch('http://localhost:8000/api/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Booked successfully!');
        router.push('/');
      } else {
        alert('Booking failed: ' + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert('Unexpected error occurred.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="w-full max-w-md p-6 bg-white rounded shadow">
          {room ? (
            <>
              {room.image && (
                <img
                  src={`http://localhost:8000${room.image}`}
                  alt={room.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-2xl font-bold">{room.name}</h2>
              <p className="text-gray-700 font-semibold">Price: ${room.price}</p>
              <p className="text-gray-600 mb-4">
                Check-in: {check_in} | Check-out: {check_out} | Adults: {adults}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Book Now
                </button>
              </form>
            </>
          ) : (
            <p>Loading room details...</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookRoomPage;
