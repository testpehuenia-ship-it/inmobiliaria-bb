'use client';

import React, { useState } from 'react';

export default function AppraisalForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      type: 'TASACION',
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      propertyType: formData.get('propertyType'),
      bedrooms: formData.get('bedrooms'),
      bathrooms: formData.get('bathrooms'),
      area: formData.get('area'),
      address: formData.get('address'),
      mensaje: formData.get('descripcion'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error enviando solicitud');
      }
      
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: any) {
      alert(`Hubo un error: ${error.message}`);
    } finally {
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
        Tasación Profesional
      </h3>
      <p style={{ marginBottom: '25px', opacity: 0.9, fontSize: '1rem', lineHeight: '1.4' }}>
        Completa los datos técnicos de tu propiedad para recibir una valuación precisa.
      </p>

      {submitted && (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' }}>
          ¡Solicitud enviada! Nos contactaremos pronto.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <select 
          name="propertyType" 
          required 
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem', background: 'white' }}
        >
          <option value="">Tipo de Propiedad</option>
          <option value="CASA">Casa</option>
          <option value="DEPARTAMENTO">Departamento</option>
          <option value="TERRENO">Terreno / Lote</option>
          <option value="LOCAL">Local / Oficina</option>
        </select>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input 
            type="number" 
            name="bedrooms" 
            placeholder="Habitaciones" 
            required 
            style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem' }}
          />
          <input 
            type="number" 
            name="bathrooms" 
            placeholder="Baños" 
            required 
            style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem' }}
          />
        </div>

        <input 
          type="number" 
          name="area" 
          placeholder="Metros Cuadrados (m²)" 
          required 
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem' }}
        />

        <input 
          type="text" 
          name="address" 
          placeholder="Domicilio de la propiedad" 
          required 
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem' }}
        />

        <textarea 
          name="descripcion" 
          placeholder="Descripción Aquí: (Detalles adicionales, estado, etc.)" 
          rows={3}
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem', resize: 'none' }}
        ></textarea>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.2)', margin: '10px 0' }} />

        <input 
          type="text" 
          name="nombre" 
          placeholder="Tu Nombre completo" 
          required 
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem' }}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Tu Correo electrónico" 
          required 
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem' }}
        />
        <input 
          type="tel" 
          name="telefono" 
          placeholder="Tu Teléfono" 
          required 
          style={{ padding: '15px', borderRadius: '10px', border: 'none', width: '100%', fontSize: '1rem' }}
        />
        
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
          {loading ? 'ENVIANDO...' : 'SOLICITAR TASACIÓN'}
        </button>
      </form>
    </div>
  );
}
