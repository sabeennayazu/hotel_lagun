'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function CheckinForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    adults: '1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save booking info in cookie
    Cookies.set('bookingInfo', JSON.stringify(formData));

    // Redirect to rooms page
    const params = new URLSearchParams({
      check_in: formData.checkin,
      check_out: formData.checkout,
      adults: String(formData.adults || '1'),
    });
    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="date"
        name="checkin"
        value={formData.checkin}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="checkout"
        value={formData.checkout}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="adults"
        value={formData.adults}
        onChange={handleChange}
        min={1}
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Continue
      </button>
    </form>
  );
}
