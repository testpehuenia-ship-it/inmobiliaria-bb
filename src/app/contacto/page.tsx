import ContactForm from "@/components/ContactForm";
import AppraisalForm from "@/components/AppraisalForm";

export default function ContactoPage() {
  return (
    <div className="contact-page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', width: '100%', boxSizing: 'border-box' }}>
      <div className="contact-header" style={{ textAlign: 'center', marginBottom: '50px', padding: '0 10px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2b6e4f', marginBottom: '15px', wordBreak: 'break-word' }}>¿En qué podemos ayudarte?</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Estamos aquí para asesorarte en cada paso de tu camino inmobiliario.</p>
      </div>

      <div className="forms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}>
        {/* Formulario 1: Contacto General */}
        <div className="form-wrapper">
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '20px', color: '#2b6e4f' }}>Contacto General</h3>
            <p style={{ marginBottom: '25px', color: '#666', fontSize: '0.95rem' }}>Escríbenos por cualquier consulta general y te responderemos a la brevedad.</p>
            <ContactForm />
          </div>
        </div>

        {/* Formulario 2: Tasación */}
        <div id="tasacion" className="form-wrapper" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
          <AppraisalForm />
        </div>
      </div>

      <div className="contact-info-footer" style={{ marginTop: '80px', textAlign: 'center', padding: '40px', background: '#f8faf9', borderRadius: '12px' }}>
        <h3 style={{ color: '#2b6e4f', marginBottom: '20px' }}>Otras vías de contacto</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          <div>
            <span style={{ display: 'block', fontWeight: 'bold' }}>📍 Ubicación</span>
            <p>Neuquén Capital, Argentina</p>
          </div>
          <div>
            <span style={{ display: 'block', fontWeight: 'bold' }}>📞 Teléfono</span>
            <p>+54 299 4200757</p>
          </div>
          <div>
            <span style={{ display: 'block', fontWeight: 'bold' }}>✉️ Email</span>
            <p>consultas@inmobiliariabb.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
