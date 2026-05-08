'use client';

import React, { useState } from 'react';

interface ContactFormProps {
  propertyId?: string;
  propertyTitle?: string;
}

export default function ContactForm({ propertyId, propertyTitle }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      mensaje: formData.get('mensaje'),
      propertyId,
      propertyTitle
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error enviando formulario');
      }
      
      setSubmitted(true);
      setLoading(false);
      
      setTimeout(() => {
        setSubmitted(false);
        const target = e.target as HTMLFormElement;
        target.reset();
      }, 3000);
    } catch (error: any) {
      console.error(error);
      alert(`Hubo un error: ${error.message}`);
      setSubmitted(false);
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container" style={{ 
      backgroundColor: '#769c84', 
      padding: '30px', 
      borderRadius: '15px',
      color: 'white',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'white', fontWeight: '700' }}>
        ¿Te interesa esta propiedad?
      </h3>
      <p style={{ marginBottom: '25px', opacity: 0.9, fontSize: '1rem', lineHeight: '1.4' }}>
        Déjanos tus datos y un agente se comunicará contigo a la brevedad.
      </p>

      {submitted && (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' }}>
          ¡Mensaje enviado con éxito!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre completo" 
          required 
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem' }}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Correo electrónico" 
          required 
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem' }}
        />
        <input 
          type="tel" 
          name="telefono" 
          placeholder="Teléfono" 
          required 
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem' }}
        />
        <textarea 
          name="mensaje" 
          placeholder="Hola, estoy interesado en esta propiedad..." 
          required 
          rows={4}
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem', resize: 'none' }}
        ></textarea>
        
        <button 
          type="submit" 
          className="btn-submit" 
          disabled={loading}
          style={{ 
            backgroundColor: '#22312b', 
            color: 'white', 
            padding: '18px', 
            borderRadius: '10px', 
            border: 'none', 
            fontWeight: '700', 
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'transform 0.2s'
          }}
        >
          {loading ? 'ENVIANDO...' : 'SOLICITAR INFORMACIÓN'}
        </button>
      </form>
    </div>
  );
}
