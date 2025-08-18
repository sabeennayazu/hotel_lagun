'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchImages } from '@/utils/api';

const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchImages();
        setImages(data);
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <h1 className="text-3xl font-bold mb-8">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <Image
              src={image}
              alt={`Image ${index}`}
              width={500}
              height={500}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
