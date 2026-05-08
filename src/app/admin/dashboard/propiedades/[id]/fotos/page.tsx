"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import './fotos.css';

export default function GestionarFotosPage({ params }: { params: Promise<{ id: string }> }) {
  // 🚀 CORRECCIÓN CLAVE: En Next.js 15, el ID de la URL viene empaquetado 
  // y hay que "desempaquetarlo" con la función use() de React.
  const resolvedParams = use(params);
  
  const router = useRouter();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar imágenes actuales desde nuestra base de datos local
  useEffect(() => {
    fetch(`/api/properties/${resolvedParams.id}/images`)
      .then(res => res.json())
      .then(data => {
        if (data.images) setImages(data.images);
        setLoading(false);
      });
  }, [resolvedParams.id]);

  // Esta función se dispara mágicamente cuando Cloudinary termina de subir la foto
  const handleUploadSuccess = async (result: any) => {
    const secureUrl = result.info.secure_url;
    
    // Inyectamos la URL segura generada por la Nube en nuestra Base de Datos
    const res = await fetch(`/api/properties/${resolvedParams.id}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: secureUrl }),
    });

    if (res.ok) {
      const data = await res.json();
      setImages(prev => [...prev, data.image]); // Añadir a la galería en tiempo real
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (confirm("¿Seguro que quieres eliminar esta foto?")) {
      try {
        const res = await fetch(`/api/properties/${resolvedParams.id}/images/${imageId}`, {
          method: 'DELETE',
        });
        
        if (res.ok) {
          // Remover la imagen del estado local
          setImages(prev => prev.filter(img => img.id !== imageId));
        } else {
          alert("Error al eliminar la foto.");
        }
      } catch (error) {
        alert("Error de conexión al eliminar.");
      }
    }
  };

  return (
    <div className="fotos-container">
      <div className="fotos-header">
        <div>
          <h2>Gestor de Fotografías</h2>
          <p>Sube imágenes de alta calidad. La primera será usada como portada.</p>
        </div>
        <button className="btn-cancel" onClick={() => router.push('/admin/dashboard/propiedades')}>
          Volver al Inventario
        </button>
      </div>

      {/* Widget Inteligente de Carga de Cloudinary */}
      <div className="upload-section">
        <CldUploadWidget 
          signatureEndpoint="/api/cloudinary/sign" // Conexión cifrada sin depender del dashboard de Cloudinary
          onSuccess={handleUploadSuccess}
          options={{
            sources: ['local', 'camera', 'url'],
            multiple: true,
            maxFiles: 25, // Pueden subir 25 fotos de un solo golpe
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            styles: {
              palette: {
                window: "#1a251c",
                windowBorder: "#90a98c",
                tabIcon: "#90a98c",
                menuIcons: "#ffffff",
                textDark: "#000000",
                textLight: "#ffffff",
                link: "#90a98c",
                action: "#2b3d2e",
                inProgress: "#90a98c",
                complete: "#22c55e",
                sourceBg: "#1a251c"
              }
            }
          }}
        >
          {({ open }) => {
            return (
              <button className="btn-upload" onClick={() => open()}>
                📸 Haz clic aquí para Subir Fotos
              </button>
            );
          }}
        </CldUploadWidget>
      </div>

      {/* Galería Visual de Fotos Subidas */}
      <div className="gallery-section">
        <h3>Fotos Subidas ({images.length})</h3>
        
        {loading ? (
          <p>Cargando galería desde el servidor...</p>
        ) : images.length === 0 ? (
          <div className="empty-gallery">
            Aún no has subido ninguna foto. ¡Carga la primera para la portada!
          </div>
        ) : (
          <div className="image-grid">
            {images.map((img) => (
              <div key={img.id} className={`image-card ${img.isMain ? 'main-image' : ''}`}>
                {img.isMain && <span className="main-badge">Portada Principal</span>}
                <img src={img.url} alt="Inmueble" />
                <div className="image-actions">
                  <button className="btn-delete" title="Eliminar foto" onClick={() => handleDeleteImage(img.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
