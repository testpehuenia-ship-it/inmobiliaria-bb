import Image from 'next/image';

export default function NosotrosPage() {
  return (
    <div className="nosotros-page" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', color: '#2b6e4f', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>Sobre Nosotros</h1>
        <div style={{ width: '80px', height: '4px', background: '#6A9780', margin: '0 auto' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
        <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <Image 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Nuestra oficina" 
            width={500} 
            height={600} 
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Pasión por los Bienes Raíces</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '20px' }}>
            En **Inmobiliaria B&B**, no solo vendemos propiedades; ayudamos a las personas a encontrar el lugar donde construirán sus sueños. Con años de experiencia en el mercado de Neuquén y alrededores, nos hemos consolidado como un referente de confianza y profesionalismo.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
            Nuestra misión es brindar un asesoramiento integral y personalizado, utilizando las últimas tecnologías y herramientas de marketing para que cada operación sea ágil, segura y satisfactoria para todas las partes.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
        {[
          { title: 'Confianza', desc: 'Transparencia absoluta en cada contrato.' },
          { title: 'Excelencia', desc: 'Buscamos la perfección en cada detalle.' },
          { title: 'Innovación', desc: 'Tecnología al servicio de tu propiedad.' }
        ].map((item, i) => (
          <div key={i} style={{ padding: '30px', background: '#f8faf9', borderRadius: '15px', textAlign: 'center' }}>
            <h4 style={{ color: '#2b6e4f', fontSize: '1.3rem', marginBottom: '10px' }}>{item.title}</h4>
            <p style={{ color: '#666' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
