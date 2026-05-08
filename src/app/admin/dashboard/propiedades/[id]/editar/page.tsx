"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
// Reutilizamos los mismos estilos que el formulario de creación
import '../../../nueva-propiedad/form.css';

export default function EditarPropiedadPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Estado del formulario
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'USD',
    operationType: 'VENTA',
    propertyType: 'CASA',
    status: 'DISPONIBLE',
    bedrooms: '0',
    bathrooms: '0',
    totalArea: '0',
    coveredArea: '0',
    city: '',
    neighborhood: '',
    address: '',
  });

  // Cargar datos existentes de la propiedad
  useEffect(() => {
    fetch(`/api/properties/${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setFormData({
            title: data.title,
            description: data.description,
            price: data.price.toString(),
            currency: data.currency,
            operationType: data.operationType,
            propertyType: data.propertyType,
            status: data.status,
            bedrooms: data.bedrooms.toString(),
            bathrooms: data.bathrooms.toString(),
            totalArea: data.totalArea.toString(),
            coveredArea: data.coveredArea.toString(),
            city: data.city,
            neighborhood: data.neighborhood || '',
            address: data.address || '',
          });
        }
      })
      .catch(error => {
        console.error("Error al cargar la propiedad:", error);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [resolvedParams.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Enviamos los datos actualizados a nuestra API
      const res = await fetch(`/api/properties/${resolvedParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('¡Propiedad actualizada con éxito!');
        router.push('/admin/dashboard/propiedades');
      } else {
        alert('Hubo un error al actualizar la propiedad.');
      }
    } catch (error) {
      alert('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="form-container"><p>Cargando datos de la propiedad...</p></div>;
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Propiedad</h2>
        <p>Modifica los datos del inmueble. Los cambios se reflejarán de inmediato.</p>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        
        {/* SECCIÓN 1: DATOS PRINCIPALES Y ESTADO */}
        <div className="form-section">
          <h3>1. Datos Principales</h3>
          <div className="input-row">
            <div className="input-group full-width">
              <label>Título del Anuncio *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group full-width">
              <label>Descripción *</label>
              <textarea name="description" required rows={4} value={formData.description} onChange={handleChange}></textarea>
            </div>
          </div>
          
          <div className="input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
            <div className="input-group">
              <label>Estado del Inmueble *</label>
              <select name="status" value={formData.status} onChange={handleChange} style={{ border: '2px solid var(--color-btn-primary)', fontWeight: 'bold' }}>
                <option value="DISPONIBLE">🟢 Disponible</option>
                <option value="RESERVADA">🟡 Reservada</option>
                <option value="VENDIDA">🔴 Vendida / Alquilada</option>
                <option value="INACTIVA">⚪ Oculta</option>
              </select>
            </div>
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
              <input type="number" name="price" required value={formData.price} onChange={handleChange} />
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
              <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Dirección</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => router.push('/admin/dashboard/propiedades')}>Cancelar</button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Guardando Cambios...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}
