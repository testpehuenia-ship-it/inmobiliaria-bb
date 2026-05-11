"use client";

import React, { useRef, useState } from 'react';

export default function ConstructionVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="construction-video-section">
      {/* Header */}
      <div className="cv-header">
        <span className="subtitle">Construimos Sueños</span>
        <h2>Del Terreno a Tu Hogar</h2>
        <p className="cv-subtitle">
          Viví el proceso completo: desde el primer ladrillo hasta el día en que tu familia estrena su hogar.
        </p>
        <div className="accent-line" style={{ margin: '20px auto 0' }}></div>
      </div>

      {/* Video Container */}
      <div className="cv-video-wrapper">
        <div className="cv-video-frame">
          {!isPlaying ? (
            /* Poster / Thumbnail con botón de play */
            <div className="cv-poster" onClick={handlePlay}>
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
                alt="Construcción de vivienda moderna"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="cv-overlay">
                <div className="cv-play-badge">
                  <span>3:42 min</span>
                </div>
                <button className="cv-play-btn" aria-label="Reproducir video">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <div className="cv-overlay-text">
                  <h3>Time-lapse: Construcción de Vivienda Residencial</h3>
                  <p>Del terreno a la entrega de llaves — todo en 4 minutos</p>
                </div>
              </div>
            </div>
          ) : (
            /* YouTube embed autoplay */
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/w01eMBRHDW4?autoplay=1&rel=0&modestbranding=1&controls=1"
              title="Construcción de casa residencial time-lapse"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          )}
        </div>

        {/* Stats Strip */}
        <div className="cv-stats-strip">
          <div className="cv-stat">
            <strong>+200</strong>
            <span>Proyectos Entregados</span>
          </div>
          <div className="cv-stat-divider"></div>
          <div className="cv-stat">
            <strong>8 meses</strong>
            <span>Tiempo Promedio</span>
          </div>
          <div className="cv-stat-divider"></div>
          <div className="cv-stat">
            <strong>15 años</strong>
            <span>De Experiencia</span>
          </div>
          <div className="cv-stat-divider"></div>
          <div className="cv-stat">
            <strong>100%</strong>
            <span>Satisfacción Cliente</span>
          </div>
        </div>
      </div>
    </section>
  );
}
