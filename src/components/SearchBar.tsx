"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ defaultOperacion = 'VENTA', defaultTipo = 'DEPARTAMENTO' }: { defaultOperacion?: string, defaultTipo?: string }) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [operation, setOperation] = useState(defaultOperacion);
  const [propertyType, setPropertyType] = useState(defaultTipo);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Creamos la URL inteligente con los parámetros de búsqueda
    const params = new URLSearchParams();
    if (location) params.append('ubicacion', location);
    params.append('operacion', operation);
    params.append('tipo', propertyType);
    
    // Redirigimos a la página del catálogo
    router.push(`/propiedades?${params.toString()}`);
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSearch} className="search-bar-container hover-3d">
        <div className="search-group">
          <span>Ubicación</span>
          <input 
            type="text" 
            placeholder="Ej: Buenos Aires" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="search-group">
          <span>Operación</span>
          <select 
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="search-select"
          >
            <option value="VENTA">Venta</option>
            <option value="ALQUILER">Alquiler</option>
          </select>
        </div>
        <div className="search-group">
          <span>Tipo de Propiedad</span>
          <select 
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="search-select"
          >
            <option value="CASA">Casas</option>
            <option value="DEPARTAMENTO">Departamentos</option>
            <option value="TERRENO">Lotes</option>
            <option value="OFICINA">Oficinas</option>
          </select>
        </div>
        <button type="submit" className="btn-primary hover-3d">Buscar Propiedades</button>
      </form>
    </div>
  );
}
