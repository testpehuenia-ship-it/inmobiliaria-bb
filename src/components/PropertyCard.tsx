"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface PropertyImage {
  id: string;
  url: string;
  isMain: boolean;
}

interface PropertyCardProps {
  images: PropertyImage[];
  price: string;
  title: string;
  beds: number;
  baths: number;
  sqft: number;
  operationType: string;
}

export default function PropertyCard({ images, price, title, beds, baths, sqft, operationType }: PropertyCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Colores premium dependiendo de la operación
  const isVenta = operationType.toLowerCase() === 'venta';
  const badgeColor = isVenta ? '#8b7355' : '#6A9780'; // Dorado oscuro para venta, verde para alquiler

  // Fallback seguro si no subieron ninguna imagen
  const defaultImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  const displayImages = images.length > 0 ? images : [{ id: 'default', url: defaultImage, isMain: true }];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir que el click viaje a la tarjeta contenedora
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  return (
    <div className="property-card hover-3d">
      <div className="card-img-wrapper group">
        <div className="card-badge" style={{ backgroundColor: badgeColor }}>
          {operationType.toUpperCase()}
        </div>
        <div className="card-heart">🤍</div>
        
        {/* Carrusel Interactivo de Imágenes */}
        <div className="carousel-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image 
            src={displayImages[currentIndex].url} 
            alt={title} 
            fill 
            style={{ objectFit: 'cover' }} 
            className="property-image" 
          />
          
          {/* Controles del Carrusel (solo se muestran si hay más de 1 imagen) */}
          {displayImages.length > 1 && (
            <>
              <button className="carousel-btn prev" onClick={prevImage}>❮</button>
              <button className="carousel-btn next" onClick={nextImage}>❯</button>
              
              <div className="carousel-dots">
                {displayImages.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="card-price">{price}</div>
      <div className="card-title">{title}</div>
      <div className="card-features">
        <div className="feature-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 14h18" />
            <path d="M3 14V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
            <path d="M3 14v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-5" />
            <path d="M7 10h10" />
          </svg>
          <span>{beds} Hab.</span>
        </div>
        <div className="feature-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
            <path d="M10 5h11a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
            <path d="M10 11v1" />
          </svg>
          <span>{baths} Baños</span>
        </div>
        <div className="feature-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          <span>{sqft} m²</span>
        </div>
      </div>
    </div>
  );
}
