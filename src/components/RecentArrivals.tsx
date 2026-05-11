"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PropertyImage { url: string; }
interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  totalArea: number;
  parking?: number;
  images: PropertyImage[];
}

const DEMO_PROPERTIES: Property[] = [
  { id: 'demo-1', title: 'Villa Esmeralda – Santa Genoveva', price: 285000, currency: 'USD', bedrooms: 4, bathrooms: 3, totalArea: 320, parking: 2, images: [{ url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' }] },
  { id: 'demo-2', title: 'Departamento Premium – Centro', price: 148000, currency: 'USD', bedrooms: 2, bathrooms: 2, totalArea: 95, parking: 1, images: [{ url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' }] },
  { id: 'demo-3', title: 'Casa Moderna – Confluencia', price: 220000, currency: 'USD', bedrooms: 3, bathrooms: 2, totalArea: 210, parking: 2, images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' }] },
  { id: 'demo-4', title: 'Casa de Diseño – Rincón de los Sauces', price: 195000, currency: 'USD', bedrooms: 3, bathrooms: 2, totalArea: 178, parking: 1, images: [{ url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' }] },
  { id: 'demo-5', title: 'Penthouse con Vista al Limay', price: 310000, currency: 'USD', bedrooms: 3, bathrooms: 3, totalArea: 260, parking: 2, images: [{ url: 'https://images.unsplash.com/photo-1600607687940-4e5a994e5373?auto=format&fit=crop&w=800&q=80' }] },
];

/**
 * Flip toggle: manipula el DOM directamente para NO causar re-render de React,
 * lo que evita que la animación CSS del carousel se reinicie.
 */
function handleFlip(e: React.MouseEvent<HTMLDivElement>) {
  e.stopPropagation();
  const inner = e.currentTarget.querySelector('.flip-card-inner') as HTMLElement | null;
  if (inner) inner.classList.toggle('is-flipped');
}

export default function RecentArrivals() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties?isNewArrival=true')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setProperties(data);
        else setProperties(DEMO_PROPERTIES);
      })
      .catch(() => setProperties(DEMO_PROPERTIES))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <section className="recent-arrivals-section">
      <div className="section-header">
        <span className="subtitle">Oportunidades Premium</span>
        <h2>Recién Ingresados</h2>
        <div className="accent-line"></div>
      </div>
      <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    </section>
  );

  const displayProps = [...properties, ...properties];

  return (
    <section className="recent-arrivals-section">
      <div className="section-header">
        <span className="subtitle">Oportunidades Premium</span>
        <h2>Recién Ingresados</h2>
        <div className="accent-line"></div>
      </div>

      <div className="carousel-viewport">
        <div className="carousel-track">
          {displayProps.map((property, index) => (
            <div
              key={`${property.id}-${index}`}
              className="flip-card-container"
              onClick={handleFlip}
            >
              <div className="flip-card-inner">
                {/* Front */}
                <div className="flip-card-front">
                  <Image
                    src={property.images[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}
                    alt={property.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                  <div className="card-overlay">
                    <h3>{property.title}</h3>
                    <p>{property.currency} {property.price.toLocaleString('es-AR')}</p>
                  </div>
                </div>

                {/* Back */}
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
                      <strong>{property.parking ?? 1} Cochera{(property.parking ?? 1) > 1 ? 's' : ''}</strong>
                    </div>
                  </div>
                  <Link
                    href={property.id.startsWith('demo-') ? '/venta' : `/propiedades/${property.id}`}
                    className="cta-button-flip"
                    onClick={e => e.stopPropagation()}
                  >
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
