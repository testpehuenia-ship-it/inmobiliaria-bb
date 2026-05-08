import Link from "next/link";
import prisma from "@/lib/prisma";

// Le decimos a Next.js que esta página no se debe guardar en caché, 
// para que siempre muestre los datos reales en vivo.
export const dynamic = 'force-dynamic';

export default async function DashboardHomePage() {
  // Contamos de verdad cuántas propiedades hay en la Base de Datos
  const totalProperties = await prisma.property.count();
  
  // Contamos consultas no leídas
  const newInquiries = await prisma.inquiry.count({
    where: { isRead: false }
  });

  return (
    <>
      <div className="welcome-banner">
        <h2>Bienvenido al Centro de Control 🚀</h2>
        <p>Desde aquí podrás cargar, editar y publicar todas las propiedades de Inmobiliaria B&B de forma súper rápida y profesional. Despídete de Tokko.</p>
        <Link href="/admin/dashboard/nueva-propiedad">
          <button className="btn-primary">+ Cargar Nueva Propiedad</button>
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-title">Propiedades Activas</span>
          {/* Aquí inyectamos el valor real */}
          <h3 className="stat-value">{totalProperties}</h3>
        </div>
        <div className="stat-card">
          <span className="stat-title">Consultas Nuevas</span>
          <h3 className="stat-value">{newInquiries}</h3>
        </div>
        <div className="stat-card">
          <span className="stat-title">Vistas Totales</span>
          <h3 className="stat-value">0</h3>
        </div>
      </div>
    </>
  );
}
