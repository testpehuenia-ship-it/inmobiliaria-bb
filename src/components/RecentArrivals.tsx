"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PropertyImage {
  url: string;
}

interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  totalArea: number;
  images: PropertyImage[];
}

export default function RecentArrivals() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties?isNewArrival=true')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProperties(data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (properties.length === 0) return null;

  return (
    <section className="recent-arrivals-section">
      <div className="section-header">
        <span className="subtitle">Oportunidades Premium</span>
        <h2>Recién Ingresados</h2>
        <div className="accent-line"></div>
      </div>

      <div className="carousel-viewport">
        <div className="carousel-track">
          {/* Duplicamos para el efecto infinito */}
          {[...properties, ...properties].map((property, index) => (
            <div key={`${property.id}-${index}`} className="flip-card-container">
              <div className="flip-card-inner">
                {/* Frente: Imagen y Título */}
                <div className="flip-card-front">
                  <Image 
                    src={property.images[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'} 
                    alt={property.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="card-overlay">
                    <h3>{property.title}</h3>
                    <p>{property.currency} {property.price.toLocaleString()}</p>
                  </div>
                </div>

                {/* Dorso: Datos Premium */}
                <div className="flip-card-back">
                  <h3>ESPECIFICACIONES</h3>
                  <div className="features-grid-flip">
                    <div className="feature-item-flip">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h18"/><path d="M3 14V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"/><path d="M3 14v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-5"/><path d="M7 10h10"/></svg>
                      <span>Habitaciones</span>
                      <strong>{property.bedrooms}</strong>
                    </div>
                    <div className="feature-item-flip">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M10 5h11a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/><path d="M10 11v1"/></svg>
                      <span>Baños</span>
                      <strong>{property.bathrooms}</strong>
                    </div>
                    <div className="feature-item-flip">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                      <span>Superficie</span>
                      <strong>{property.totalArea} m²</strong>
                    </div>
                    <div className="feature-item-flip">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                      <span>Parking</span>
                      <strong>Disponible</strong>
                    </div>
                  </div>
                  <Link href={`/propiedades/${property.id}`} className="cta-button-flip">
                    Ver Más Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
