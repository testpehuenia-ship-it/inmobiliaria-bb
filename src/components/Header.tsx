"use client";

import { useState } from 'react';
import Link from 'next/link';
import LogoBB from './LogoBB';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="logo-container">
        <LogoBB />
        <div className="logo-text">
          <span>INMOBILIARIA</span>
          <span style={{fontSize: '1.2rem', color: 'var(--color-bg-outside)'}}>B&B</span>
        </div>
      </div>
      
      {/* Mobile Toggle Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <nav className={`main-nav ${isMenuOpen ? 'mobile-active' : ''}`}>
        <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
        <Link href="/alquileres" className="nav-link" onClick={() => setIsMenuOpen(false)}>Alquileres</Link>
        <Link href="/venta" className="nav-link" onClick={() => setIsMenuOpen(false)}>Venta</Link>
        <Link href="/nosotros" className="nav-link" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
        <Link href="/contacto#tasacion" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tasaciones</Link>
        <Link href="/contacto" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
      </nav>
      
      <div className="header-right-placeholder"></div>
    </header>
  );
}
