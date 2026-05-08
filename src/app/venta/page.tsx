import prisma from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function VentaPage() {
  // Buscar solo ventas en la BD
  const properties = await prisma.property.findMany({
    where: {
      status: 'DISPONIBLE',
      operationType: 'VENTA'
    },
    include: {
      images: {
        orderBy: { isMain: 'desc' },
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="catalog-page">
      <div className="catalog-header" style={{ background: 'linear-gradient(135deg, #8b7355 0%, #5d4d3a 100%)' }}>
        <h1>Propiedades en Venta</h1>
        <p>Tu próxima inversión o el hogar de tus sueños está aquí</p>
      </div>

      <div style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <SearchBar defaultOperacion="VENTA" />
      </div>

      <div className="catalog-results">
        <div className="results-header">
          <h2>{properties.length} {properties.length === 1 ? 'Propiedad en venta' : 'Propiedades en venta'}</h2>
        </div>

        {properties.length === 0 ? (
          <div className="no-results">
            <h3>No hay propiedades en venta disponibles en este momento</h3>
            <p>Vuelve pronto o consulta por alquileres.</p>
            <Link href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>Ver todas las propiedades</Link>
          </div>
        ) : (
          <div className="property-grid">
            {properties.map(prop => (
              <Link href={`/propiedades/${prop.id}`} key={prop.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <PropertyCard 
                  images={prop.images}
                  price={`${prop.currency} ${prop.price.toLocaleString('es-AR')}`}
                  title={prop.title}
                  beds={prop.bedrooms || 0}
                  baths={prop.bathrooms || 0}
                  sqft={prop.totalArea || 0}
                  operationType={prop.operationType}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
