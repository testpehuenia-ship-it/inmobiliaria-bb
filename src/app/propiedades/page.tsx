import prisma from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function PropiedadesPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  
  // Extraer parámetros de búsqueda
  const ubicacion = typeof searchParams.ubicacion === 'string' ? searchParams.ubicacion : undefined;
  const operacion = typeof searchParams.operacion === 'string' ? searchParams.operacion : undefined;
  const tipo = typeof searchParams.tipo === 'string' ? searchParams.tipo : undefined;

  // Construir el filtro para Prisma
  const whereFilter: any = {
    status: 'DISPONIBLE'
  };

  if (operacion) {
    whereFilter.operationType = operacion;
  }
  if (tipo) {
    whereFilter.propertyType = tipo;
  }
  if (ubicacion) {
    whereFilter.OR = [
      { city: { contains: ubicacion } },
      { neighborhood: { contains: ubicacion } },
      { title: { contains: ubicacion } }
    ];
  }

  // Buscar en la BD
  const properties = await prisma.property.findMany({
    where: whereFilter,
    include: {
      images: {
        orderBy: { isMain: 'desc' },
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="catalog-page">
      {/* Cabecera Estilo Hero Pequeño */}
      <div className="catalog-header">
        <h1>Catálogo de Propiedades</h1>
        <p>Encuentra el hogar de tus sueños con B&B</p>
      </div>

      {/* Buscador Integrado */}
      <div style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <SearchBar />
      </div>

      {/* Resultados */}
      <div className="catalog-results">
        <div className="results-header">
          <h2>
            {properties.length} {properties.length === 1 ? 'Propiedad encontrada' : 'Propiedades encontradas'}
          </h2>
          {(ubicacion || operacion || tipo) && (
            <p className="active-filters" style={{ textTransform: 'capitalize' }}>
              Filtros activos: <strong>{operacion?.toLowerCase()}</strong> {tipo ? `> ${tipo.toLowerCase()}` : ''} {ubicacion ? `> "${ubicacion}"` : ''}
            </p>
          )}
        </div>

        {properties.length === 0 ? (
          <div className="no-results hover-3d">
            <div className="no-results-icon">🏠</div>
            <h3>No encontramos resultados exactos</h3>
            <p>Intenta usar palabras más generales o cambiar los filtros.</p>
            <Link href="/propiedades" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
              Ver todo el catálogo
            </Link>
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
