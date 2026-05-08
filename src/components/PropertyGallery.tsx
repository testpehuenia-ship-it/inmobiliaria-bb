"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface PropertyImage {
  id: string;
  url: string;
  isMain: boolean;
}

export default function PropertyGallery({ images }: { images: PropertyImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="detail-gallery-interactive">
      {/* Imagen Principal Grande con Flechas */}
      <div className="main-photo-large hover-3d">
        <Image 
          src={images[currentIndex].url} 
          alt={`Foto de la propiedad ${currentIndex + 1}`} 
          fill 
          style={{ objectFit: 'cover' }} 
          priority
        />
        
        {images.length > 1 && (
          <>
            <button className="gallery-nav-btn prev" onClick={prevImage}>❮</button>
            <button className="gallery-nav-btn next" onClick={nextImage}>❯</button>
            <div className="gallery-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Tira de miniaturas deslizable abajo */}
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((img, index) => (
            <div 
              key={img.id} 
              className={`thumbnail ${index === currentIndex ? 'active' : ''} hover-3d`}
              onClick={() => selectImage(index)}
            >
              <Image src={img.url} alt={`Miniatura ${index + 1}`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
