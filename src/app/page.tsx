import Image from "next/image";
import PropertyCard from "@/components/PropertyCard";
import HeroSlider from "@/components/HeroSlider";
import SearchBar from "@/components/SearchBar";
import RecentArrivals from "@/components/RecentArrivals";
import prisma from "@/lib/prisma";
import Link from "next/link";

// Fuerza a Next.js a consultar la BD en cada visita
export const dynamic = 'force-dynamic';

export default async function Home() {
  // ¡MAGIA PURA! Traemos las últimas 6 propiedades reales desde la Base de Datos
  // incluyendo la primera foto que subiste a Cloudinary (isMain: true)
  const properties = await prisma.property.findMany({
    where: { status: 'DISPONIBLE' },
    include: {
      images: {
        orderBy: { isMain: 'desc' },
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 6
  });

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-image">
          <HeroSlider />
        </div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <h1>Encuentra Tu Hogar<br/>Soñado en<br/>Argentina</h1>
          <p>Descubre propiedades exclusivas diseñadas para tu estilo de vida.</p>
        </div>
      </section>

      {/* Floating Search Bar */}
      <SearchBar />

      {/* Recién Ingresados Section (Infinite Flip Carousel) */}
      <RecentArrivals />

      {/* Featured Properties Section */}
      <section className="featured-section">
        <h2>Propiedades Destacadas</h2>
        
        <div className="property-grid">
          {properties.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b', fontSize: '18px' }}>
              No hay propiedades publicadas por el momento. ¡Carga la primera desde tu panel!
            </p>
          ) : (
            properties.map(prop => {
              return (
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
              )
            })
          )}
        </div>
      </section>
    </main>
  );
}
