import Link from 'next/link';
import prisma from '@/lib/prisma';
import PropertyActions from './PropertyActions';
import './list.css';

export const dynamic = 'force-dynamic';

export default async function PropiedadesListPage() {
  // Extraemos todas las propiedades de la Base de Datos
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' } // De más nuevas a más viejas
  });

  return (
    <div className="list-container">
      <div className="list-header">
        <div>
          <h2>Mis Propiedades</h2>
          <p>Gestiona tu inventario. Tienes {properties.length} inmuebles en total.</p>
        </div>
        <Link href="/admin/dashboard/nueva-propiedad">
          <button className="btn-primary">+ Nueva Propiedad</button>
        </Link>
      </div>

      <div className="table-wrapper">
        <table className="properties-table">
          <thead>
            <tr>
              <th>REF</th>
              <th>Título y Ubicación</th>
              <th>Operación</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-state">No tienes propiedades cargadas. ¡Comienza subiendo la primera!</td>
              </tr>
            ) : (
              properties.map((prop) => (
                <tr key={prop.id}>
                  <td className="prop-id">#{prop.id.slice(-5).toUpperCase()}</td>
                  <td className="prop-title">
                    <strong>{prop.title}</strong>
                    <span>{prop.propertyType} en {prop.city}</span>
                  </td>
                  <td>
                    <span className={`badge op-${prop.operationType.toLowerCase()}`}>
                      {prop.operationType}
                    </span>
                  </td>
                  <td className="prop-price">
                    {prop.currency} {prop.price.toLocaleString('es-AR')}
                  </td>
                  <td>
                    <span className="badge status-disponible">{prop.status}</span>
                  </td>
                  <PropertyActions propertyId={prop.id} />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
