"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import './admin-login.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que recargue la página
    setLoading(true);
    setError('');

    try {
      // Usar NextAuth para verificar credenciales
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
        setLoading(false);
      } else {
        // Si el login es exitoso, redirigimos al Panel Central
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError('Ocurrió un error. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      
      <div className="login-glass-card">
        <div className="login-header">
          <div className="login-logo">B&B</div>
          <h2>Panel de Agentes</h2>
          <p>Ingresa tus credenciales para gestionar propiedades.</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Mensaje de error visual si la clave está mal */}
          {error && (
            <div style={{
              color: '#c0392b', 
              fontSize: '14px', 
              textAlign: 'center', 
              background: 'rgba(231,76,60,0.1)', 
              padding: '12px', 
              borderRadius: '8px', 
              fontWeight: 600
            }}>
              {error}
            </div>
          )}
          
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agente@inmobiliariabb.com" 
              required 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
            />
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Verificando...' : 'Ingresar al Panel'}
          </button>
        </form>
        
        <div className="login-footer">
          <Link href="/" className="back-link">
            ← Volver al sitio público
          </Link>
        </div>
      </div>
    </div>
  );
}
