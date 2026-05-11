"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './form.css';

export default function NuevaPropiedadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estado que guarda todo lo que el agente escribe
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'USD',
    operationType: 'VENTA',
    propertyType: 'CASA',
    bedrooms: '0',
    bathrooms: '0',
    totalArea: '0',
    coveredArea: '0',
    city: 'Neuquén',
    neighborhood: '',
    address: '',
    isNewArrival: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Enviamos la propiedad a nuestra API segura
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('¡Propiedad guardada con éxito en la Base de Datos!');
        router.push('/admin/dashboard'); // Lo regresamos al panel
      } else {
        alert('Hubo un error al crear la propiedad.');
      }
    } catch (error) {
      alert('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cargar Nueva Propiedad</h2>
        <p>Completa los datos del inmueble. (La sección de fotos la armaremos luego).</p>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        
        {/* SECCIÓN 1: DATOS PRINCIPALES */}
        <div className="form-section">
          <h3>1. Datos Principales</h3>
          <div className="input-row">
            <div className="input-group full-width">
              <label>Título del Anuncio *</label>
              <input type="text" name="title" required placeholder="Ej: Hermosa Casa 3 Dormitorios en Santa Genoveva" value={formData.title} onChange={handleChange} />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group full-width">
              <label>Descripción *</label>
              <textarea name="description" required rows={4} placeholder="Describe los detalles..." value={formData.description} onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="input-row triple">
            <div className="input-group">
              <label>Operación *</label>
              <select name="operationType" value={formData.operationType} onChange={handleChange}>
                <option value="VENTA">Venta</option>
                <option value="ALQUILER">Alquiler</option>
                <option value="TEMPORAL">Alquiler Temporal</option>
              </select>
            </div>
            <div className="input-group">
              <label>Moneda *</label>
              <select name="currency" value={formData.currency} onChange={handleChange}>
                <option value="USD">Dólares (US$)</option>
                <option value="ARS">Pesos (AR$)</option>
              </select>
            </div>
            <div className="input-group">
              <label>Precio *</label>
              <input type="number" name="price" required placeholder="Ej: 150000" value={formData.price} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: CARACTERÍSTICAS */}
        <div className="form-section">
          <h3>2. Características del Inmueble</h3>
          <div className="input-row triple">
            <div className="input-group">
              <label>Tipo de Propiedad *</label>
              <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                <option value="CASA">Casa</option>
                <option value="DEPARTAMENTO">Departamento</option>
                <option value="TERRENO">Lote / Terreno</option>
                <option value="OFICINA">Oficina</option>
                <option value="LOCAL">Local Comercial</option>
              </select>
            </div>
            <div className="input-group">
              <label>Dormitorios</label>
              <input type="number" name="bedrooms" min="0" value={formData.bedrooms} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Baños</label>
              <input type="number" name="bathrooms" min="0" value={formData.bathrooms} onChange={handleChange} />
            </div>
          </div>
          <div className="input-row double">
            <div className="input-group">
              <label>Superficie Total (m²)</label>
              <input type="number" name="totalArea" min="0" value={formData.totalArea} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Superficie Cubierta (m²)</label>
              <input type="number" name="coveredArea" min="0" value={formData.coveredArea} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: UBICACIÓN */}
        <div className="form-section">
          <h3>3. Ubicación</h3>
          <div className="input-row triple">
            <div className="input-group">
              <label>Ciudad *</label>
              <input type="text" name="city" required value={formData.city} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Barrio</label>
              <input type="text" name="neighborhood" placeholder="Ej: Centro" value={formData.neighborhood} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Dirección (Opcional)</label>
              <input type="text" name="address" placeholder="Ej: Av. Argentina 123" value={formData.address} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* SECCIÓN 4: OPCIONES COMERCIALES */}
        <div className="form-section">
          <h3>4. Opciones Comerciales</h3>
          <div className="input-row">
            <div className="input-group checkbox-group">
              <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: '600', color: '#2b6e4f' }}>
                <input 
                  type="checkbox" 
                  name="isNewArrival" 
                  checked={formData.isNewArrival} 
                  onChange={handleChange} 
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                Marcar como "Recién Ingresado" (Aparecerá en el carrusel premium de inicio)
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => router.push('/admin/dashboard')}>Cancelar</button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Guardando en BD...' : 'Guardar Propiedad'}
          </button>
        </div>
      </form>
    </div>
  );
}
