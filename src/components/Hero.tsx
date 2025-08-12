'use client';
import { useState } from 'react';

const Hero = () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle booking logic here
        console.log({ checkIn, checkOut, adults, children });
    };

    return (
        <div className="relative h-screen">
            {/* Hero Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/hero-bg.jpg')",
                    filter: "brightness(0.7)",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
                    Experience Luxury and Serenity
                </h1>
                <p className="text-xl md:text-2xl text-center mb-12">
                    Your perfect getaway awaits at Hotel Lagoon
                </p>

                {/* Booking Form */}
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 w-full max-w-4xl border border-gray-200 shadow-2xl">
                    <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-medium">Check In</label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="w-full p-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 placeholder-gray-500 transition-all duration-200 hover:border-gray-400"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-medium">Check Out</label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="w-full p-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 placeholder-gray-500 transition-all duration-200 hover:border-gray-400"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-medium">Guests</label>
                            <div className="grid grid-cols-2 gap-3">
                                <select
                                    value={adults}
                                    onChange={(e) => setAdults(Number(e.target.value))}
                                    className="p-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 transition-all duration-200 hover:border-gray-400"
                                >
                                    {[1, 2, 3, 4].map((num) => (
                                        <option key={num} value={num}>
                                            {num} Adult{num !== 1 ? 's' : ''}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={children}
                                    onChange={(e) => setChildren(Number(e.target.value))}
                                    className="p-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 transition-all duration-200 hover:border-gray-400"
                                >
                                    {[0, 1, 2, 3].map((num) => (
                                        <option key={num} value={num}>
                                            {num} Child{num !== 1 ? 'ren' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 mt-6 md:mt-8 font-medium shadow-lg hover:shadow-xl"
                        >
                            Check Availability
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Hero;
