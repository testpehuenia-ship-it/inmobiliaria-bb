import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import "./dashboard.css";
import LogoutButton from "./LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="dashboard-container">
      {/* BARRA LATERAL (Sidebar) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-box">B&B</div>
          <h3>Panel Admin</h3>
        </div>
        <nav className="sidebar-nav">
          <Link href="/admin/dashboard" className="nav-item">🏠 Central</Link>
          <Link href="/admin/dashboard/propiedades" className="nav-item">🏢 Mis Propiedades</Link>
          <Link href="/admin/dashboard/consultas" className="nav-item">✉️ Consultas</Link>
          {session.user?.role === "ADMIN" && (
            <Link href="/admin/dashboard/agentes" className="nav-item">👥 Agentes</Link>
          )}
        </nav>
        <div className="sidebar-footer">
          <LogoutButton />
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <header className="top-header">
          <div className="search-bar">
            <input type="text" placeholder="Buscar propiedad o ID..." />
          </div>
          <div className="user-profile">
            <div className="avatar">
              {session.user?.name?.charAt(0) || "A"}
            </div>
            <div className="user-info">
              <p className="user-name">Hola, {session.user?.name?.split(' ')[0]}</p>
              <span className="user-role">{session.user?.role === "ADMIN" ? "Administrador" : "Agente"}</span>
            </div>
          </div>
        </header>

        {/* Las sub-páginas (como nueva-propiedad) se inyectarán dinámicamente aquí */}
        <section className="dashboard-content">
          {children}
        </section>
      </main>
    </div>
  );
}
