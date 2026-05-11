"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Mariana González',
    role: 'Compró una Casa en Confluencia',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Desde el primer contacto, el equipo de B&B nos hizo sentir completamente acompañados. Encontramos la casa de nuestros sueños en menos de un mes. ¡Increíble profesionalismo!',
    date: 'Marzo 2025',
    property: 'Casa 3 Dorm. – Confluencia',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Vendió su Propiedad en Neuquén',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Vendí mi departamento en tiempo récord y al precio que esperaba. La gestión fue impecable, con total transparencia en cada paso. Los recomendaría sin dudarlo.',
    date: 'Enero 2025',
    property: 'Dpto. 2 Amb. – Centro',
  },
  {
    id: 3,
    name: 'Sofía Martínez',
    role: 'Alquiló en Santa Genoveva',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Buscar alquiler siempre es estresante, pero con B&B fue diferente. Me asesoraron en todo momento, consiguieron el inmueble perfecto para mis necesidades y presupuesto.',
    date: 'Febrero 2025',
    property: 'Casa 2 Dorm. – Santa Genoveva',
  },
  {
    id: 4,
    name: 'Diego Fernández',
    role: 'Compró Terreno para Construir',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Queríamos un terreno con buenas condiciones para construir nuestra casa. B&B nos presentó varias opciones y nos guió en cada detalle de la compra. Excelente servicio.',
    date: 'Abril 2025',
    property: 'Terreno – Cipolletti',
  },
  {
    id: 5,
    name: 'Lucía Pereyra',
    role: 'Inversora Inmobiliaria',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Como inversora, necesito asesoramiento de confianza. B&B demostró un conocimiento profundo del mercado de Neuquén y me ayudó a maximizar el retorno de mi inversión.',
    date: 'Mayo 2025',
    property: 'Depto. Inversión – Centro',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="star-rating" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map(star => (
        <svg key={star} width="18" height="18" viewBox="0 0 24 24"
          fill={star <= rating ? '#f59e0b' : '#d1d5db'} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const AUTOPLAY_INTERVAL = 4500; // ms between slides

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [animating, setAnimating] = useState(false);

  const total = TESTIMONIALS.length;
  const avgRating = (TESTIMONIALS.reduce((a, t) => a + t.rating, 0) / total).toFixed(1);

  const goTo = useCallback((index: number, dir: 'left' | 'right' = 'left') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex((index + total) % total);
      setAnimating(false);
    }, 400);
  }, [animating, total]);

  const next = useCallback(() => goTo(activeIndex + 1, 'left'), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1, 'right'), [activeIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const t = TESTIMONIALS[activeIndex];

  return (
    <section className="testimonials-section">
      {/* Header */}
      <div className="testimonials-header">
        <span className="subtitle">Lo Que Dicen Nuestros Clientes</span>
        <h2>Opiniones y Calificaciones</h2>
        <div className="accent-line" style={{ margin: '20px auto 50px' }}></div>

        {/* Rating Summary */}
        <div className="rating-summary">
          <div className="rating-big-number">{avgRating}</div>
          <div className="rating-details">
            <StarRating rating={5} />
            <p>Basado en {total} reseñas verificadas</p>
            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map(n => (
                <div key={n} className="rating-bar-row">
                  <span>{n}★</span>
                  <div className="rating-bar-bg">
                    <div className="rating-bar-fill"
                      style={{ width: `${n === 5 ? '95' : n === 4 ? '4' : '1'}%` }}
                    />
                  </div>
                  <span className="rating-bar-pct">{n === 5 ? '95%' : n === 4 ? '4%' : '1%'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="testimonials-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Prev Button */}
        <button className="tcarousel-btn tcarousel-prev" onClick={prev} aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Card */}
        <div className={`testimonials-slide-wrapper ${animating ? `slide-out-${direction}` : 'slide-in'}`}>
          <div className="testimonial-card-single">
            <div className="quote-icon">"</div>
            <StarRating rating={t.rating} />
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-footer">
              <div className="testimonial-avatar">
                <Image src={t.avatar} alt={t.name} width={56} height={56}
                  style={{ borderRadius: '50%', objectFit: 'cover' }} unoptimized />
              </div>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
                <span className="testimonial-property">🏠 {t.property}</span>
              </div>
              <div className="testimonial-date">{t.date}</div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button className="tcarousel-btn tcarousel-next" onClick={next} aria-label="Siguiente">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="tcarousel-dots">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`tcarousel-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => goTo(i, i > activeIndex ? 'left' : 'right')}
            aria-label={`Ir a reseña ${i + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail Row */}
      <div className="tcarousel-thumbs">
        {TESTIMONIALS.map((item, i) => (
          <button
            key={item.id}
            className={`tcarousel-thumb ${i === activeIndex ? 'active' : ''}`}
            onClick={() => goTo(i, i > activeIndex ? 'left' : 'right')}
          >
            <Image src={item.avatar} alt={item.name} width={44} height={44}
              style={{ borderRadius: '50%', objectFit: 'cover' }} unoptimized />
          </button>
        ))}
      </div>

      {/* Google Reviews Badge */}
      <div className="reviews-badge">
        <div className="reviews-badge-inner">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <div>
            <strong>4.9 en Google</strong>
            <p>Ver todas las reseñas</p>
          </div>
          <StarRating rating={5} />
        </div>
      </div>
    </section>
  );
}
