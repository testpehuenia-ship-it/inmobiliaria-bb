import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ConsultasPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Consultas Recibidas</h2>
        <Link href="/admin/dashboard" className="btn-secondary">Volver al Dashboard</Link>
      </div>

      <div className="table-container">
        {inquiries.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No hay consultas todavía.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Propiedad de interés</th>
                <th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} style={{ backgroundColor: inq.isRead ? 'transparent' : '#f0fdf4' }}>
                  <td>{new Date(inq.createdAt).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td><strong>{inq.nombre}</strong></td>
                  <td>
                    <div>{inq.email}</div>
                    <div style={{ fontSize: '0.9em', color: '#666' }}>{inq.telefono}</div>
                  </td>
                  <td>
                    {inq.propertyTitle ? (
                      inq.propertyId ? <Link href={`/propiedades/${inq.propertyId}`} target="_blank" style={{ color: '#2b6e4f', textDecoration: 'underline' }}>{inq.propertyTitle}</Link> : inq.propertyTitle
                    ) : (
                      <span style={{ color: '#999' }}>Consulta general</span>
                    )}
                  </td>
                  <td>
                    <div style={{ maxHeight: '80px', overflowY: 'auto', fontSize: '0.9em' }}>
                      {inq.mensaje}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
