"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PropertyActions({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("¿Estás seguro que deseas eliminar esta propiedad? Esta acción no se puede deshacer.")) {
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/properties/${propertyId}`, {
          method: 'DELETE',
        });
        
        if (res.ok) {
          alert("Propiedad eliminada.");
          router.refresh(); // Refresca la lista de propiedades actualizando el Server Component
        } else {
          alert("Error al eliminar la propiedad.");
        }
      } catch (error) {
        alert("Error de conexión al eliminar.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <td className="actions">
      <Link href={`/admin/dashboard/propiedades/${propertyId}/fotos`}>
        <button className="action-btn" title="Gestionar Fotos">📸</button>
      </Link>
      <Link href={`/admin/dashboard/propiedades/${propertyId}/editar`}>
        <button className="action-btn edit" title="Editar">✏️</button>
      </Link>
      <button 
        className="action-btn delete" 
        title="Eliminar" 
        onClick={handleDelete}
        disabled={isDeleting}
        style={{ opacity: isDeleting ? 0.5 : 1 }}
      >
        🗑️
      </button>
    </td>
  );
}
