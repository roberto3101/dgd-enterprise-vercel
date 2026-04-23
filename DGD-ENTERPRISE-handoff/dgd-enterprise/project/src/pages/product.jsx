// Generic product page

const ProductPage = ({slug, nav}) => {
  const p = PRODUCTS[slug];
  if (!p) return <div className="container" style={{padding: 80}}>Producto no encontrado</div>;

  return (
    <div className="page" data-screen-label={p.name}>
      {/* Hero */}
      <section className="hero" style={{paddingBottom: 48}}>
        <div className="hero-bg"/>
        <div className="container" style={{position:'relative'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1.1fr', gap: 48, alignItems:'center'}}>
            <div>
              <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 18}}>
                <div style={{width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg, ${p.color}, color-mix(in srgb, ${p.color} 60%, black))`, color:'white', display:'grid', placeItems:'center'}}><Icon name={p.icon} size={22}/></div>
                <div>
                  <div style={{fontSize: 12, color:'var(--ink-500)', textTransform:'uppercase', letterSpacing:'.08em', fontWeight:600}}>Producto Codeplex</div>
                  <div style={{fontSize: 20, fontWeight: 800}}>{p.name}</div>
                </div>
              </div>
              <h1 style={{fontSize:'clamp(2rem, 4vw, 3.2rem)'}}>{p.hero}</h1>
              <p style={{fontSize: 18, color:'var(--ink-500)', marginTop: 20, maxWidth: 540, lineHeight: 1.6}}>{p.heroDesc}</p>
              <div className="row" style={{marginTop: 28, gap: 12}}>
                <Btn variant="primary" size="lg" onClick={()=>nav('contacto')}>Solicitar demo de {p.name} <Icon name="arrow" size={18}/></Btn>
                <Btn variant="outline" size="lg" onClick={()=>document.getElementById('planes')?.scrollIntoView({behavior:'smooth', block:'start'})}>Ver planes</Btn>
              </div>
            </div>
            <div>
              <DashMock variant={slug==='gestionplex'?'gestionplex':slug==='facturacion-sunat'?'facturacion':'contaplex'}/>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-alt">
        <div className="container">
          <SectionHeader eyebrow="Funcionalidades" title={`Todo lo que ${p.name} incluye`}/>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 16}}>
            {p.features.map((f,i)=>(
              <div key={i} className="card card-hover" style={{padding: 22, background:'var(--bg)', borderRadius: 16}}>
                <div style={{width: 40, height: 40, borderRadius: 10, background:`color-mix(in srgb, ${p.color} 12%, transparent)`, color: p.color, display:'grid', placeItems:'center', marginBottom: 14}}>
                  <Icon name={f.icon} size={20}/>
                </div>
                <h3 style={{fontSize: 15, marginBottom: 6}}>{f.title}</h3>
                <p style={{fontSize: 13, color:'var(--ink-500)', lineHeight: 1.5}}>{f.desc}</p>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 960px) { .container > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
        </div>
      </section>

      {/* Plans */}
      <section id="planes">
        <div className="container">
          <SectionHeader eyebrow="Planes y precios" title={`Escoge el plan de ${p.name} que te calce`} desc="Todos los planes incluyen usuarios ilimitados, parametrización y actualizaciones."/>
          <div style={{display:'grid', gridTemplateColumns:`repeat(${p.plans.length}, 1fr)`, gap: 20, maxWidth: p.plans.length>3?1100:900, margin:'0 auto'}}>
            {p.plans.map((plan, i) => (
              <div key={i} style={{
                padding: 28, borderRadius: 20,
                background: plan.popular?'linear-gradient(180deg, var(--brand-primary), #123558)':'var(--bg)',
                color: plan.popular?'white':'inherit',
                border: plan.popular?'1px solid rgba(255,255,255,.1)':'1px solid var(--ink-200)',
                position:'relative',
                transform: plan.popular?'scale(1.03)':'none',
                boxShadow: plan.popular?'var(--shadow-xl)':'none',
              }}>
                {plan.popular && <Badge variant="pop" className="" style={{position:'absolute', top: -12, left: '50%', transform:'translateX(-50%)'}}>MÁS POPULAR</Badge>}
                <div style={{fontSize: 13, fontWeight: 700, textTransform:'uppercase', letterSpacing:'.08em', color: plan.popular?'rgba(255,255,255,.7)':'var(--ink-500)', marginBottom: 8}}>{plan.name}</div>
                <div style={{display:'flex', alignItems:'baseline', gap: 4, margin: '8px 0'}}>
                  <span style={{fontSize: 42, fontWeight: 800, letterSpacing:'-0.03em'}}>S/{plan.price}</span>
                  <span style={{fontSize: 14, color: plan.popular?'rgba(255,255,255,.65)':'var(--ink-500)'}}>/mes</span>
                </div>
                <div style={{fontSize: 13, color: plan.popular?'rgba(255,255,255,.75)':'var(--ink-500)', marginBottom: 14}}>
                  {typeof plan.empresas==='number'? `Hasta ${plan.empresas} empresas`: plan.empresas}
                </div>
                <p style={{fontSize: 14, marginBottom: 18, color: plan.popular?'rgba(255,255,255,.9)':'var(--ink-700)', lineHeight: 1.5}}>{plan.desc}</p>
                <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap: 10, marginBottom: 22}}>
                  {plan.features.map((f,j)=>(
                    <li key={j} style={{display:'flex', gap: 10, fontSize: 13.5, alignItems:'flex-start'}}>
                      <Icon name="check" size={16} strokeWidth={2.5} style={{color: plan.popular?'var(--brand-accent)':p.color, flexShrink: 0, marginTop: 2}}/>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Btn variant={plan.popular?'primary':'outline'} onClick={()=>nav('contacto')} style={{width:'100%', justifyContent:'center'}}>
                  {plan.popular?'Solicitar demo':'Elegir plan'}
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-alt">
        <div className="container" style={{maxWidth: 820}}>
          <SectionHeader eyebrow="Preguntas frecuentes" title={`Dudas sobre ${p.name}`}/>
          <FAQ items={p.faq}/>
        </div>
      </section>

      <CTAPanel
        title={`¿Listo para empezar con ${p.name}?`}
        desc="Implementación, migración y capacitación incluidas. Te acompañamos en cada paso."
        primary={`Solicitar demo de ${p.name}`}
        onPrimary={()=>nav('contacto')}
        secondary="Comparar con otros productos"
        onSecondary={()=>nav('planes')}
      />
    </div>
  );
};

window.ProductPage = ProductPage;
