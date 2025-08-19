'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cookies from 'js-cookie';

const BookRoomPage = () => {
  const router = useRouter();
  const { id: roomId } = useParams(); // destructure directly
  const searchParams = useSearchParams();

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
  const [unauthorized, setUnauthorized] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Check access after mount
  useEffect(() => {
    const bookingInfo = Cookies.get('bookingInfo');
    const selectedRoom = Cookies.get('selectedRoom');
    console.log("Cookies:", bookingInfo, selectedRoom);

    if (!bookingInfo || !selectedRoom) {
      setUnauthorized(true);
    }
  }, []);

  // Countdown redirect if unauthorized
  useEffect(() => {
    if (!unauthorized) return;
    const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [unauthorized]);

  useEffect(() => {
    if (unauthorized && countdown <= 0) {
      router.replace('/');
    }
  }, [unauthorized, countdown, router]);

  // Fetch room details only if roomId exists and authorized
  useEffect(() => {
    if (!roomId || unauthorized) return;

    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/rooms/${roomId}/`);
        if (!res.ok) throw new Error('Room not found');
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.error('Error fetching room:', err);
        router.replace('/'); // redirect if invalid room
      }
    };
    fetchRoom();
  }, [roomId, unauthorized, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { first_name, last_name, email, phone } = formData;

    if (!first_name || !last_name) return alert('Name cannot be empty');
    if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) return alert('Invalid email address');
    if (!/^\d{10}$/.test(phone)) return alert('Phone must be 10 digits');

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
        router.replace('/');
      } else {
        alert('Booking failed: ' + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert('Unexpected error occurred.');
    }
  };

  if (unauthorized) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white p-8 rounded shadow-md max-w-md text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-700 mb-4">
              You cannot access this page directly. Please select your room and dates first.
            </p>
            <p className="text-gray-500">
              Redirecting to homepage in <span className="font-bold">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10 bg-gray-50 px-4">
        <div className="w-full max-w-md p-6 bg-white rounded shadow">
          {room ? (
            <>
              {room.image && (
                <img src={`http://localhost:8000${room.image}`} alt={room.name} className="w-full h-48 object-cover rounded mb-4" />
              )}
              <h2 className="text-2xl font-bold mb-2">{room.name}</h2>
              <p className="text-gray-700 font-semibold mb-2">Price: ${room.price}</p>
              <p className="text-gray-600 mb-4">
                Check-in: {check_in} | Check-out: {check_out} | Adults: {adults}
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required className="p-2 border rounded" />
                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required className="p-2 border rounded" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="p-2 border rounded" />
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="p-2 border rounded" />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Book Now</button>
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
