import prisma from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AlquileresPage() {
  // Buscar solo alquileres en la BD
  const properties = await prisma.property.findMany({
    where: {
      status: 'DISPONIBLE',
      operationType: 'ALQUILER'
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
      <div className="catalog-header" style={{ background: 'linear-gradient(135deg, #6A9780 0%, #2b6e4f 100%)' }}>
        <h1>Propiedades en Alquiler</h1>
        <p>Encuentra tu próximo hogar temporal o permanente</p>
      </div>

      <div style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <SearchBar defaultOperacion="ALQUILER" />
      </div>

      <div className="catalog-results">
        <div className="results-header">
          <h2>{properties.length} {properties.length === 1 ? 'Propiedad en alquiler' : 'Propiedades en alquiler'}</h2>
        </div>

        {properties.length === 0 ? (
          <div className="no-results">
            <h3>No hay alquileres disponibles en este momento</h3>
            <p>Vuelve pronto o consulta por ventas.</p>
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
