// Planes page — muestra planes reales de Codeplex (no inventa precios) y servicios propios de DGD.

const PlanesPage = ({nav}) => {
  const [productTab, setProductTab] = React.useState('contaplex');

  // Servicios propios de DGD — paquetes de implementación/acompañamiento sobre la licencia Codeplex.
  const services = [
    {name:'Onboarding Esencial', icon:'compass', desc:'Instalación, parametrización base y 2 capacitaciones en vivo. Ideal si ya tienes tu data lista.', includes:['Configuración inicial','Plan de cuentas base','2 sesiones · equipo','Soporte WhatsApp 30 días']},
    {name:'Implementación Completa', icon:'academy', desc:'Migración de data histórica, integración entre módulos y acompañamiento de 60 días.', includes:['Todo lo de Esencial','Migración de data','Integración ContaPlex ↔ GestiónPlex','5 sesiones · equipo','Soporte 60 días'], featured: true},
    {name:'Acompañamiento Anual', icon:'headset', desc:'Soporte prioritario, capacitaciones trimestrales y revisión de procesos todo el año.', includes:['Soporte prioritario 12 meses','4 capacitaciones trimestrales','Revisión de procesos','Consultor asignado']},
  ];

  const product = PRODUCTS[productTab];

  return (
    <div className="page" data-screen-label="Planes">
      <section style={{padding:'72px 0 32px'}}>
        <div className="container" style={{textAlign:'center', maxWidth: 780}}>
          <Eyebrow>Planes y servicios</Eyebrow>
          <h1 style={{marginTop: 8}}>Los planes son de Codeplex. El servicio es de DGD.</h1>
          <p style={{fontSize: 17, color:'var(--ink-500)', marginTop: 18, lineHeight: 1.6}}>La licencia del software la contratas según la lista oficial de Codeplex Software. Nosotros añadimos implementación, capacitación y soporte local en Perú.</p>
        </div>
      </section>

      {/* Planes oficiales Codeplex */}
      <section style={{padding:'16px 0 56px'}}>
        <div className="container">
          <div style={{display:'flex', justifyContent:'center', gap: 8, marginBottom: 32, flexWrap:'wrap'}}>
            {Object.values(PRODUCTS).map(p=>(
              <button key={p.slug} onClick={()=>setProductTab(p.slug)} style={{
                padding:'10px 18px', borderRadius: 999,
                border: `1px solid ${productTab===p.slug?'transparent':'var(--ink-200)'}`,
                background: productTab===p.slug?'var(--ink-900)':'var(--bg)',
                color: productTab===p.slug?'var(--bg)':'var(--ink-700)',
                fontSize: 14, fontWeight: 600, cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 8
              }}>
                <Icon name={p.icon} size={14}/>{p.name}
              </button>
            ))}
          </div>

          <div style={{display:'grid', gridTemplateColumns:`repeat(${product.plans.length}, 1fr)`, gap: 16}}>
            {product.plans.map((pl,i)=>(
              <div key={i} style={{
                padding: 26, borderRadius: 18,
                background: pl.popular?'linear-gradient(180deg, var(--brand-primary), #123558)':'var(--bg)',
                color: pl.popular?'white':'inherit',
                border: pl.popular?'1px solid rgba(255,255,255,.15)':'1px solid var(--ink-200)',
                position:'relative', transform: pl.popular?'scale(1.02)':'none',
                boxShadow: pl.popular?'var(--shadow-xl)':'var(--shadow-sm)'
              }}>
                {pl.popular && <Badge variant="pop" style={{position:'absolute', top: -12, left: '50%', transform:'translateX(-50%)'}}>MÁS POPULAR</Badge>}
                <div style={{fontSize: 12, fontWeight: 700, textTransform:'uppercase', letterSpacing:'.08em', color: pl.popular?'var(--brand-accent)':'var(--brand-accent-2)', marginBottom: 8}}>{product.name}</div>
                <h3 style={{fontSize: 22, marginBottom: 6}}>{pl.name}</h3>
                <p style={{fontSize: 13, color: pl.popular?'rgba(255,255,255,.7)':'var(--ink-500)', marginBottom: 16, lineHeight: 1.5, minHeight: 38}}>{pl.desc}</p>
                <div style={{display:'flex', alignItems:'baseline', gap: 4, marginBottom: 4}}>
                  <span style={{fontSize: 16, fontWeight: 600, opacity: .7}}>S/</span>
                  <span style={{fontSize: 42, fontWeight: 800, letterSpacing:'-0.03em'}}>{pl.price}</span>
                  <span style={{fontSize: 13, color: pl.popular?'rgba(255,255,255,.7)':'var(--ink-500)'}}>/mes</span>
                </div>
                <div style={{fontSize: 12, color: pl.popular?'rgba(255,255,255,.65)':'var(--ink-500)', marginBottom: 18}}>{typeof pl.empresas==='number'?`Hasta ${pl.empresas} empresas`:pl.empresas}</div>
                <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap: 8, marginBottom: 20}}>
                  {pl.features.slice(0,5).map(f=>(
                    <li key={f} style={{display:'flex', gap: 8, fontSize: 13, color: pl.popular?'rgba(255,255,255,.9)':'var(--ink-700)'}}>
                      <Icon name="check" size={14} strokeWidth={2.5} style={{color: pl.popular?'var(--brand-accent)':'var(--brand-accent-2)', flexShrink: 0, marginTop: 3}}/>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Btn variant={pl.popular?'primary':'outline'} onClick={()=>nav('contacto')} style={{width:'100%', justifyContent:'center'}}>Cotizar implementación</Btn>
              </div>
            ))}
          </div>

          <div className="mono" style={{textAlign:'center', marginTop: 24, fontSize: 12, color:'var(--ink-500)'}}>// Precios de la lista oficial de Codeplex Software. DGD cotiza aparte el servicio de implementación.</div>
        </div>
      </section>

      {/* Servicios DGD */}
      <section className="section-alt">
        <div className="container">
          <div style={{textAlign:'center', maxWidth: 720, margin:'0 auto 40px'}}>
            <Eyebrow>Servicios DGD</Eyebrow>
            <h2 style={{fontSize: 32, marginTop: 8}}>Lo que añadimos sobre tu licencia Codeplex</h2>
            <p style={{fontSize: 15.5, color:'var(--ink-500)', marginTop: 14}}>La licencia del software la contratas directo según el plan oficial de Codeplex. DGD se encarga de que funcione en tu empresa con estos paquetes.</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 20}}>
            {services.map((s,i)=>(
              <div key={i} style={{
                padding: 28, borderRadius: 20,
                background: s.featured?'linear-gradient(180deg, var(--brand-primary), #123558)':'var(--bg)',
                color: s.featured?'white':'inherit',
                border: s.featured?'1px solid rgba(255,255,255,.15)':'1px solid var(--ink-200)',
                position:'relative', transform: s.featured?'scale(1.02)':'none',
                boxShadow: s.featured?'var(--shadow-xl)':'var(--shadow-sm)'
              }}>
                {s.featured && <Badge variant="pop" style={{position:'absolute', top: -12, left: '50%', transform:'translateX(-50%)'}}>MÁS ELEGIDO</Badge>}
                <div style={{width: 48, height: 48, borderRadius: 12, background: s.featured?'rgba(255,255,255,.12)':'color-mix(in srgb, var(--brand-accent) 12%, transparent)', color: s.featured?'var(--brand-accent)':'var(--brand-accent-2)', display:'grid', placeItems:'center', marginBottom: 16}}>
                  <Icon name={s.icon} size={22}/>
                </div>
                <h3 style={{fontSize: 20, marginBottom: 10}}>{s.name}</h3>
                <p style={{fontSize: 13.5, color: s.featured?'rgba(255,255,255,.8)':'var(--ink-500)', marginBottom: 20, lineHeight: 1.55}}>{s.desc}</p>
                <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap: 10, marginBottom: 22}}>
                  {s.includes.map(f=>(
                    <li key={f} style={{display:'flex', gap: 10, fontSize: 13.5, color: s.featured?'rgba(255,255,255,.9)':'var(--ink-700)'}}>
                      <Icon name="check" size={16} strokeWidth={2.5} style={{color: s.featured?'var(--brand-accent)':'var(--brand-accent-2)', flexShrink: 0, marginTop: 2}}/>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mono" style={{fontSize: 12, color: s.featured?'rgba(255,255,255,.6)':'var(--ink-500)', marginBottom: 14}}>// cotización según alcance</div>
                <Btn variant={s.featured?'primary':'outline'} onClick={()=>nav('contacto')} style={{width:'100%', justifyContent:'center'}}>Solicitar cotización</Btn>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAPanel title="¿Ayuda eligiendo el plan correcto?" desc="Un consultor de DGD te orienta sobre qué plan de Codeplex se ajusta a tu volumen y qué servicio de implementación necesitas." primary="Hablar con un consultor" onPrimary={()=>nav('contacto')}/>
    </div>
  );
};

window.PlanesPage = PlanesPage;
