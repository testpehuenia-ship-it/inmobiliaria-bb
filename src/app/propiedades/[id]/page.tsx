import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import PropertyGallery from "@/components/PropertyGallery";
import ContactForm from "@/components/ContactForm";

export default async function PropertyDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      images: {
        orderBy: { isMain: 'desc' },
      },
      agent: true,
    }
  });

  if (!property) {
    notFound();
  }

  // Preparamos imágenes
  const images = property.images.length > 0 
    ? property.images 
    : [{ id: 'default', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', isMain: true }];
  
  const mainImage = images[0];
  const galleryImages = images.slice(1, 5); // Tomamos hasta 4 imágenes extras para la cuadrícula lateral

  const isVenta = property.operationType.toLowerCase() === 'venta';
  const badgeColor = isVenta ? '#8b7355' : '#6A9780';

  return (
    <div className="property-detail-page">
      {/* Navegación de migas de pan (Breadcrumb) */}
      <div className="breadcrumb">
        <Link href="/">Inicio</Link> &gt; <Link href="/propiedades">Catálogo</Link> &gt; <span>{property.title}</span>
      </div>

      {/* Título Principal */}
      <div className="detail-header">
        <div className="detail-title-group">
          <span className="detail-badge" style={{ backgroundColor: badgeColor }}>{property.operationType.toUpperCase()}</span>
          <h1>{property.title}</h1>
          <p className="detail-location">📍 {property.address ? `${property.address}, ` : ''}{property.neighborhood ? `${property.neighborhood}, ` : ''}{property.city}</p>
        </div>
        <div className="detail-price-group">
          <h2>{property.currency} {property.price.toLocaleString('es-AR')}</h2>
        </div>
      </div>

      {/* Visor de Galería Interactivo */}
      <PropertyGallery images={images} />

      {/* Contenido Inferior */}
      <div className="detail-content">
        {/* Columna Izquierda: Detalles */}
        <div className="detail-info">
          <div className="info-card">
            <h3>Características Principales</h3>
            <div className="features-grid">
              <div className="feature-box">
                <span className="feature-value">{property.bedrooms}</span>
                <span className="feature-label">Habitaciones</span>
              </div>
              <div className="feature-box">
                <span className="feature-value">{property.bathrooms}</span>
                <span className="feature-label">Baños</span>
              </div>
              <div className="feature-box">
                <span className="feature-value">{property.coveredArea} m²</span>
                <span className="feature-label">Cubiertos</span>
              </div>
              <div className="feature-box">
                <span className="feature-value">{property.totalArea} m²</span>
                <span className="feature-label">Totales</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Descripción</h3>
            <div className="description-text">
              {property.description.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Mapa Satelital */}
          <div className="property-map" style={{ marginTop: '40px' }}>
            <h3 style={{ marginBottom: '20px' }}>Ubicación</h3>
            <div className="map-wrapper" style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', height: '400px' }}>
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address + ", " + property.city)}&t=k&z=17&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
              📍 {property.address}, {property.city}
            </p>
          </div>
        </div>

        {/* Columna Derecha: Sticky Contact Form */}
        <div className="detail-sidebar">
          <div className="contact-card sticky">
            <h3>¿Te interesa esta propiedad?</h3>
            <p>Déjanos tus datos y un agente se comunicará contigo a la brevedad.</p>
            
            <ContactForm propertyId={property.id} propertyTitle={property.title} />
            
            <div className="agent-info">
              <div className="agent-avatar" style={{ overflow: 'hidden' }}>
                <Image src="/agent.jpg" alt="Agente" width={50} height={50} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
              <div>
                <strong>Agente a cargo:</strong>
                <p>{property.agent?.name || 'Equipo B&B'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
