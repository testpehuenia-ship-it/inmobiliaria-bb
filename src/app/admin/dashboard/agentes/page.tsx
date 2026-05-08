"use client";

import React, { useState, useEffect } from 'react';

export default function AgentesAdminPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'AGENT'
  });

  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/agents');
      if (res.ok) {
        const data = await res.json();
        setAgents(data);
      }
    } catch (error) {
      console.error("Error cargando agentes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Agente creado con éxito');
        setFormData({ name: '', email: '', password: '', role: 'AGENT' });
        setShowForm(false);
        fetchAgents();
      } else {
        const err = await res.json();
        alert(`Error: ${err.error}`);
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  return (
    <div className="agentes-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ color: '#2b6e4f', margin: 0 }}>Gestión de Agentes</h2>
          <p style={{ color: '#666', margin: '5px 0 0' }}>Administra el equipo de ventas de la inmobiliaria.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary"
          style={{ padding: '10px 20px', borderRadius: '8px' }}
        >
          {showForm ? 'Cancelar' : '+ Nuevo Agente'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Registrar Nuevo Agente</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Nombre Completo</label>
              <input 
                type="text" 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Email de acceso</label>
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Contraseña temporal</label>
              <input 
                type="password" 
                required 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Rol</label>
              <select 
                value={formData.role} 
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
              >
                <option value="AGENT">Agente</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <button type="submit" className="btn-primary" style={{ padding: '12px 30px' }}>Guardar Agente</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8faf9', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '15px 20px' }}>Nombre</th>
              <th style={{ padding: '15px 20px' }}>Email</th>
              <th style={{ padding: '15px 20px' }}>Rol</th>
              <th style={{ padding: '15px 20px' }}>Fecha Alta</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center' }}>Cargando equipo...</td></tr>
            ) : agents.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center' }}>No hay agentes registrados aún.</td></tr>
            ) : (
              agents.map((agent) => (
                <tr key={agent.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                  <td style={{ padding: '15px 20px', fontWeight: 'bold' }}>{agent.name}</td>
                  <td style={{ padding: '15px 20px', color: '#666' }}>{agent.email}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem', 
                      background: agent.role === 'ADMIN' ? '#e3f2fd' : '#f1f8e9',
                      color: agent.role === 'ADMIN' ? '#1976d2' : '#388e3c'
                    }}>
                      {agent.role === 'ADMIN' ? 'Administrador' : 'Agente'}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', color: '#999', fontSize: '0.9rem' }}>
                    {new Date(agent.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
