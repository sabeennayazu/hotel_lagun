// src/utils/api.ts

export const fetchImages = async () => {
  // List your image filenames in the public/images folder
  const files = [
    "about-bg.jpg",
    "about-image-2.jpg",
    "about-image.jpg",
    "hero-bg.jpg",
  ];

  // Convert to public URLs
  return files.map((file) => `/images/${file}`);
};
