'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Hero = () => {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    router.push(
      `/rooms?check_in=${checkIn}&check_out=${checkOut}&adults=${adults}`
    );
  };

  return (
    <div
      className="relative h-screen flex items-end justify-center bg-cover bg-center pb-14"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 p-8 rounded-xl border border-black shadow-lg grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-4xl"
      >
        <div className="flex flex-col">
          <label className="text-black font-medium mb-2">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border border-black p-3 rounded text-black"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-medium mb-2">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border border-black p-3 rounded text-black"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-medium mb-2">Adults</label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="border border-black p-3 rounded text-black"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Adult{num !== 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800"
          >
            Check Availability
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hero;
