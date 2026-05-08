import Link from 'next/link';
import LogoBB from './LogoBB';

export default function Header() {
  return (
    <header className="main-header">
      <div className="logo-container">
        <LogoBB />
        <div className="logo-text">
          <span>INMOBILIARIA</span>
          <span style={{fontSize: '1.2rem', color: 'var(--color-bg-outside)'}}>B&B</span>
        </div>
      </div>
      <nav className="main-nav">
        <Link href="/" className="nav-link">Inicio</Link>
        <Link href="/alquileres" className="nav-link">Alquileres</Link>
        <Link href="/venta" className="nav-link">Venta</Link>
        <Link href="/nosotros" className="nav-link">Nosotros</Link>
        <Link href="/contacto#tasacion" className="nav-link">Tasaciones</Link>
        <Link href="/contacto" className="nav-link">Contacto</Link>
      </nav>
      <div className="header-right-placeholder" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {/* Espacio para balancear el logo de la izquierda */}
      </div>
    </header>
  );
}
