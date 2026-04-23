// HOME PAGE

const HomeHero = ({nav, variant='dashboard'}) => (
  <section className="hero">
    <div className="hero-bg"/>
    <div className="hero-grid-bg"/>
    <div className="container" style={{position:'relative'}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1.1fr', gap: 56, alignItems:'center'}}>
        <div>
          <div className="row" style={{gap: 8, marginBottom: 24}}>
            <Badge variant="pop">★ Partner oficial Codeplex</Badge>
            <Badge variant="primary">Autorizado SUNAT</Badge>
          </div>
          <h1>Cumple con <span className="gradient-text">SUNAT</span> sin complicarte la vida.</h1>
          <p style={{fontSize: 19, marginTop: 22, maxWidth: 560, color:'var(--ink-500)', lineHeight: 1.6}}>
            Implementamos y acompañamos tu empresa con <b style={{color:'var(--ink-900)'}}>ContaPlex</b>, <b style={{color:'var(--ink-900)'}}>GestiónPlex</b> y <b style={{color:'var(--ink-900)'}}>Facturación Electrónica</b> — los sistemas cloud de Codeplex, 100% válidos ante SUNAT.
          </p>
          <div className="row" style={{marginTop: 32, gap: 12}}>
            <Btn variant="primary" size="lg" onClick={()=>nav('contacto')}>Solicitar demo gratis <Icon name="arrow" size={18}/></Btn>
            <Btn variant="outline" size="lg" onClick={()=>nav('planes')}>Ver planes</Btn>
          </div>
          <div style={{marginTop: 36, display:'flex', gap: 24, flexWrap:'wrap', fontSize: 13, color:'var(--ink-500)'}}>
            <div style={{display:'flex', alignItems:'center', gap: 6}}><Icon name="check" size={16} style={{color:'var(--brand-accent)'}}/>Setup en 7 días</div>
            <div style={{display:'flex', alignItems:'center', gap: 6}}><Icon name="check" size={16} style={{color:'var(--brand-accent)'}}/>Capacitación incluida</div>
            <div style={{display:'flex', alignItems:'center', gap: 6}}><Icon name="check" size={16} style={{color:'var(--brand-accent)'}}/>Soporte en Perú</div>
          </div>
        </div>
        <div style={{position:'relative'}}>
          {variant === 'abstract' ? <AbstractHero/> : <DashboardHero/>}
        </div>
      </div>
    </div>
  </section>
);

const DashboardHero = () => (
  <div style={{position:'relative'}}>
    <div style={{animation:'floatY 6s ease-in-out infinite'}}>
      <DashMock variant="contaplex"/>
    </div>
    {/* Floating mini cards */}
    <div style={{position:'absolute', top: -20, right: -10, background:'var(--bg)', border:'1px solid var(--ink-200)', borderRadius: 12, padding: 12, boxShadow:'var(--shadow-lg)', display:'flex', alignItems:'center', gap: 10, animation:'floatY 5s ease-in-out infinite .5s'}}>
      <div style={{width: 36, height: 36, borderRadius: 8, background:'color-mix(in srgb, var(--brand-accent) 15%, transparent)', color:'var(--brand-accent-2)', display:'grid', placeItems:'center'}}><Icon name="check" size={20} strokeWidth={2.5}/></div>
      <div>
        <div style={{fontSize: 11, color:'var(--ink-500)', fontWeight: 600}}>SUNAT presentó</div>
        <div style={{fontSize: 13, fontWeight: 700}}>Libro de Ventas · OK</div>
      </div>
    </div>
    <div style={{position:'absolute', bottom: -16, left: -24, background:'var(--bg)', border:'1px solid var(--ink-200)', borderRadius: 12, padding: 12, boxShadow:'var(--shadow-lg)', animation:'floatY 7s ease-in-out infinite 1s'}}>
      <div style={{fontSize: 10, color:'var(--ink-500)', fontWeight: 600, textTransform:'uppercase', letterSpacing:'.06em'}}>Facturación hoy</div>
      <div style={{fontSize: 20, fontWeight: 800, margin: '2px 0', color:'var(--brand-primary)'}}>S/ 48,230</div>
      <div style={{fontSize: 11, color:'var(--brand-accent-2)', fontWeight: 600}}>↑ 18% vs ayer</div>
    </div>
  </div>
);

const AbstractHero = () => (
  <div style={{aspectRatio:'5/4', borderRadius: 24, background:'linear-gradient(135deg, var(--brand-primary), var(--brand-accent-2))', padding: 40, color:'white', position:'relative', overflow:'hidden'}}>
    <div style={{position:'absolute', inset: 0, background:'radial-gradient(circle at 70% 30%, rgba(255,255,255,.2), transparent 50%)'}}/>
    <div style={{position:'relative'}}>
      <div style={{fontSize: 12, opacity:.7, fontWeight: 600, letterSpacing:'.1em', textTransform:'uppercase'}}>Panel integrado</div>
      <div style={{fontSize: 38, fontWeight: 800, marginTop: 10}}>1,248</div>
      <div style={{fontSize: 14, opacity:.8}}>comprobantes enviados este mes</div>
    </div>
  </div>
);

const MetricsStrip = () => (
  <section style={{padding:'48px 0', background:'var(--brand-primary)', color:'white'}}>
    <div className="container">
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 32}}>
        {[
          {text:'Partner', label:'autorizado Codeplex Software · Perú'},
          {text:'SUNAT', label:'100% válido: SIRE, PLE, facturación electrónica'},
          {text:'Cloud', label:'multi-empresa, multi-usuario, multi-almacén'},
          {text:'Lun · Sáb', label:'soporte en Perú, en español'},
        ].map((m,i)=>(
          <div key={i} style={{textAlign:'center'}}>
            <div style={{fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing:'-0.03em', color:'white'}}>
              {m.text}
            </div>
            <div style={{fontSize: 13, color:'rgba(255,255,255,.7)', marginTop: 6, fontWeight: 500}}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProductCards = ({nav}) => (
  <section>
    <div className="container">
      <SectionHeader eyebrow="Nuestra suite" title="Tres productos, una sola plataforma" desc="Implementamos cada uno por separado o todo integrado. Tú eliges por dónde empezar."/>
      <div className="grid-3">
        {Object.values(PRODUCTS).map(p => (
          <div key={p.slug} className="card card-hover" style={{display:'flex', flexDirection:'column', gap: 16, position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', top:-40, right:-40, width: 160, height: 160, borderRadius:'50%', background:`radial-gradient(circle, color-mix(in srgb, ${p.color} 25%, transparent), transparent 70%)`}}/>
            <div style={{width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${p.color}, color-mix(in srgb, ${p.color} 60%, black))`, color:'white', display:'grid', placeItems:'center', position:'relative'}}>
              <Icon name={p.icon} size={26} strokeWidth={1.8}/>
            </div>
            <div>
              <h3 style={{fontSize: 22}}>{p.name}</h3>
              <p style={{marginTop: 6, fontSize: 15, color:'var(--ink-500)'}}>{p.tagline}</p>
            </div>
            <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap: 10, margin: '4px 0'}}>
              {p.bullets.map(b => (
                <li key={b} style={{display:'flex', gap: 10, fontSize: 14, color:'var(--ink-700)'}}>
                  <Icon name="check" size={18} strokeWidth={2.5} style={{color: p.color, flexShrink: 0, marginTop: 1}}/>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button onClick={()=>nav(`productos/${p.slug}`)} className="btn btn-outline" style={{marginTop:'auto', justifyContent:'space-between', width:'100%'}}>
              <span>Conocer más</span><Icon name="arrow" size={16}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyDGD = () => (
  <section className="section-alt">
    <div className="container">
      <SectionHeader eyebrow="Por qué elegir DGD" title="No somos desarrolladores. Somos tu equipo de implementación." desc="Codeplex construye el software. Nosotros lo hacemos funcionar en tu empresa, en tu idioma, con tu gente."/>
      <div className="grid-4">
        {[
          {icon:'compass', title:'Asesoría local en Perú', desc:'Consultores contables y tecnológicos en Lima, Arequipa y Trujillo.'},
          {icon:'academy', title:'Capacitación incluida', desc:'Sesiones en vivo + acceso a la DGD Academy para tu equipo.'},
          {icon:'users', title:'Implementación paso a paso', desc:'Un project manager dedicado desde el kickoff hasta producción.'},
          {icon:'headset', title:'Soporte WhatsApp + tickets', desc:'Lunes a Sábado, respuesta promedio bajo 2 horas.'},
        ].map((f,i)=>(
          <div key={i} className="card" style={{padding: 24, textAlign:'left', borderRadius: 16, background: 'var(--bg)'}}>
            <div style={{width: 44, height: 44, borderRadius: 12, background:'color-mix(in srgb, var(--brand-accent) 12%, transparent)', color:'var(--brand-accent-2)', display:'grid', placeItems:'center', marginBottom: 16}}>
              <Icon name={f.icon} size={22}/>
            </div>
            <h3 style={{fontSize: 17, marginBottom: 8}}>{f.title}</h3>
            <p style={{fontSize: 14, color:'var(--ink-500)', lineHeight: 1.6}}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Results = () => (
  <section>
    <div className="container">
      <SectionHeader eyebrow="Beneficios del producto" title="Lo que reporta Codeplex para sus usuarios" desc="Métricas publicadas por Codeplex Software en su sitio oficial (codeplex.pe). Los resultados dependen de la implementación y operación de cada empresa."/>
      <div className="grid-4">
        {[
          {n:'-40%', label:'tiempo en gestión de ingresos y gastos', icon:'clock', color:'#F59E0B', src:'codeplex.pe'},
          {n:'-35%', label:'costos logísticos y de distribución', icon:'box', color:'#3B82F6', src:'codeplex.pe'},
          {n:'100%', label:'cumplimiento normativo SUNAT', icon:'shield', color:'#14B8A6', src:'codeplex.pe'},
          {n:'+60%', label:'potencial de ingresos resellers', icon:'zap', color:'#EF4444', src:'codeplex.pe'},
        ].map((r,i)=>(
          <div key={i} style={{padding: 28, borderRadius: 20, background:'var(--bg)', border:'1px solid var(--ink-200)', position:'relative', overflow:'hidden'}}>
            <div style={{width: 40, height: 40, borderRadius: 10, background: `color-mix(in srgb, ${r.color} 12%, transparent)`, color: r.color, display:'grid', placeItems:'center', marginBottom: 14}}>
              <Icon name={r.icon} size={20}/>
            </div>
            <div style={{fontSize: 44, fontWeight: 800, letterSpacing:'-0.04em', color: 'var(--ink-900)'}}>{r.n}</div>
            <div style={{fontSize: 14, color:'var(--ink-500)', marginTop: 4}}>{r.label}</div>
            <div className="mono" style={{fontSize: 11, color:'var(--ink-500)', marginTop: 10, opacity: .7}}>fuente: {r.src}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const IntegrationMap = () => (
  <section className="section-alt">
    <div className="container">
      <SectionHeader eyebrow="Integración total" title="Un ecosistema, no tres productos sueltos" desc="Los datos fluyen automáticamente entre ContaPlex, GestiónPlex y Facturación. Sin dobles digitaciones. Sin errores humanos."/>
      <div style={{position:'relative', maxWidth: 900, margin: '0 auto'}}>
        <svg viewBox="0 0 800 360" style={{width:'100%', height:'auto'}}>
          <defs>
            <linearGradient id="flow1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#14B8A6" stopOpacity=".2"/>
              <stop offset="1" stopColor="#14B8A6" stopOpacity=".7"/>
            </linearGradient>
          </defs>
          {/* Lines */}
          <path d="M170,100 Q400,100 400,180" fill="none" stroke="url(#flow1)" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite"/>
          </path>
          <path d="M630,100 Q400,100 400,180" fill="none" stroke="url(#flow1)" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite"/>
          </path>
          <path d="M400,220 L400,300" fill="none" stroke="url(#flow1)" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite"/>
          </path>
        </svg>
        {/* Product badges over SVG */}
        <div style={{position:'absolute', top: '10%', left: '8%', width: 180, padding: 16, borderRadius: 14, background:'var(--bg)', border:'1px solid var(--ink-200)', boxShadow:'var(--shadow)', textAlign:'center'}}>
          <div style={{width: 40, height: 40, margin:'0 auto 8px', borderRadius: 10, background:'linear-gradient(135deg, #14B8A6, #0D9488)', color:'white', display:'grid', placeItems:'center'}}><Icon name="calc" size={22}/></div>
          <div style={{fontWeight: 700, fontSize: 14}}>ContaPlex</div>
          <div style={{fontSize: 11, color:'var(--ink-500)'}}>Contabilidad</div>
        </div>
        <div style={{position:'absolute', top: '10%', right: '8%', width: 180, padding: 16, borderRadius: 14, background:'var(--bg)', border:'1px solid var(--ink-200)', boxShadow:'var(--shadow)', textAlign:'center'}}>
          <div style={{width: 40, height: 40, margin:'0 auto 8px', borderRadius: 10, background:'linear-gradient(135deg, #3B82F6, #1D4ED8)', color:'white', display:'grid', placeItems:'center'}}><Icon name="box" size={22}/></div>
          <div style={{fontWeight: 700, fontSize: 14}}>GestiónPlex</div>
          <div style={{fontSize: 11, color:'var(--ink-500)'}}>Logística & POS</div>
        </div>
        <div style={{position:'absolute', top: '44%', left: '50%', transform:'translateX(-50%)', width: 220, padding: 20, borderRadius: 16, background:'linear-gradient(135deg, var(--brand-primary), #1E3A5F)', color:'white', boxShadow:'var(--shadow-lg)', textAlign:'center'}}>
          <div style={{fontSize: 11, fontWeight: 600, opacity: .7, textTransform:'uppercase', letterSpacing:'.1em'}}>Núcleo de datos</div>
          <div style={{fontSize: 18, fontWeight: 700, marginTop: 4}}>DGD Suite</div>
          <div style={{fontSize: 12, opacity:.8, marginTop: 4}}>Sincronización en tiempo real</div>
        </div>
        <div style={{position:'absolute', bottom: '6%', left: '50%', transform:'translateX(-50%)', width: 220, padding: 16, borderRadius: 14, background:'var(--bg)', border:'1px solid var(--ink-200)', boxShadow:'var(--shadow)', textAlign:'center'}}>
          <div style={{width: 40, height: 40, margin:'0 auto 8px', borderRadius: 10, background:'linear-gradient(135deg, #8B5CF6, #6D28D9)', color:'white', display:'grid', placeItems:'center'}}><Icon name="receipt" size={22}/></div>
          <div style={{fontWeight: 700, fontSize: 14}}>Facturación SUNAT</div>
          <div style={{fontSize: 11, color:'var(--ink-500)'}}>Emisión electrónica</div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const [idx, setIdx] = React.useState(0);
  return (
    <section>
      <div className="container">
        <SectionHeader eyebrow="Voces de clientes" title="Lo que dicen los que ya se digitalizaron con DGD"/>
        <div className="grid-3">
          {TESTIMONIALS.map((t,i)=>(
            <div key={i} className="card" style={{borderRadius: 20, padding: 28, display:'flex', flexDirection:'column', gap: 16, background: i===1?'var(--brand-primary)':'var(--bg)', color: i===1?'white':'inherit'}}>
              <div style={{display:'flex', gap: 2}}>
                {[1,2,3,4,5].map(s=><Icon key={s} name="star" size={16} style={{color:'#F59E0B', fill:'#F59E0B'}}/>)}
              </div>
              <p style={{fontSize: 15, lineHeight: 1.65, color: i===1?'rgba(255,255,255,.92)':'var(--ink-700)', flex: 1}}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{display:'flex', alignItems:'center', gap: 12, paddingTop: 14, borderTop: `1px solid ${i===1?'rgba(255,255,255,.15)':'var(--ink-200)'}`}}>
                <div style={{width: 44, height: 44, borderRadius:'50%', background: i===1?'var(--brand-accent)':'var(--ink-100)', color: i===1?'white':'var(--brand-primary)', display:'grid', placeItems:'center', fontWeight: 700, fontSize: 15}}>{t.init}</div>
                <div>
                  <div style={{fontWeight: 700, fontSize: 14, color: i===1?'white':'var(--ink-900)'}}>{t.name}</div>
                  <div style={{fontSize: 12.5, color: i===1?'rgba(255,255,255,.7)':'var(--ink-500)'}}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InlineCTA = ({nav}) => {
  const toast = useToast();
  const [form, setForm] = React.useState({nombre:'', email:'', whatsapp:'', producto:'ContaPlex'});
  const submit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email) { toast('Completa los campos requeridos', 'error'); return; }
    toast(`¡Gracias ${form.nombre.split(' ')[0]}! Te contactamos en 24h.`);
    setForm({nombre:'', email:'', whatsapp:'', producto:'ContaPlex'});
  };
  return (
    <section style={{padding:'72px 0'}}>
      <div className="container">
        <div style={{borderRadius: 'var(--radius-xl)', background:'linear-gradient(135deg, #0A2540 0%, #123558 60%, #0D9488 140%)', padding: 'clamp(40px, 6vw, 72px)', color:'white', position:'relative', overflow:'hidden'}}>
          <div style={{position:'absolute', right: -100, top: -100, width: 400, height: 400, borderRadius:'50%', background:'radial-gradient(circle, rgba(20,184,166,.35), transparent 70%)'}}/>
          <div style={{position:'relative', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 56, alignItems:'center'}}>
            <div>
              <h2 style={{color:'white'}}>¿Listo para digitalizar tu empresa?</h2>
              <p style={{color:'rgba(255,255,255,.82)', marginTop: 14, fontSize: 17, lineHeight: 1.6}}>
                Déjanos tus datos y un consultor te contacta en menos de 24 horas. Sin compromiso.
              </p>
              <div style={{marginTop: 28, display:'flex', flexDirection:'column', gap: 14, color:'rgba(255,255,255,.85)', fontSize: 14}}>
                <div style={{display:'flex', gap: 10, alignItems:'center'}}><Icon name="check" size={18} style={{color:'var(--brand-accent)'}}/>Demo personalizada según tu industria</div>
                <div style={{display:'flex', gap: 10, alignItems:'center'}}><Icon name="check" size={18} style={{color:'var(--brand-accent)'}}/>Propuesta de implementación a medida</div>
                <div style={{display:'flex', gap: 10, alignItems:'center'}}><Icon name="check" size={18} style={{color:'var(--brand-accent)'}}/>Sin letra chica, sin compromiso</div>
              </div>
            </div>
            <form onSubmit={submit} style={{background:'rgba(255,255,255,.08)', backdropFilter:'blur(12px)', borderRadius: 18, padding: 28, border:'1px solid rgba(255,255,255,.15)'}}>
              <h3 style={{color:'white', fontSize: 18, marginBottom: 18}}>Agenda tu demo</h3>
              <div style={{display:'flex', flexDirection:'column', gap: 12}}>
                <input required placeholder="Nombre y apellido *" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} className="input" style={{background:'rgba(255,255,255,.9)', border:'1px solid rgba(255,255,255,.2)'}}/>
                <input required type="email" placeholder="Email corporativo *" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="input" style={{background:'rgba(255,255,255,.9)'}}/>
                <input placeholder="WhatsApp (opcional)" value={form.whatsapp} onChange={e=>setForm({...form, whatsapp:e.target.value})} className="input" style={{background:'rgba(255,255,255,.9)'}}/>
                <select value={form.producto} onChange={e=>setForm({...form, producto:e.target.value})} className="select" style={{background:'rgba(255,255,255,.9)'}}>
                  <option>ContaPlex</option>
                  <option>GestiónPlex</option>
                  <option>Facturación SUNAT</option>
                  <option>Los tres integrados</option>
                  <option>No estoy seguro</option>
                </select>
                <Btn type="submit" variant="primary" size="lg" style={{justifyContent:'center', width:'100%', marginTop: 6}}>Agendar demo <Icon name="arrow" size={18}/></Btn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = ({nav, heroVariant}) => (
  <div className="page" data-screen-label="Home">
    <HomeHero nav={nav} variant={heroVariant}/>
    <MetricsStrip/>
    <ProductCards nav={nav}/>
    <WhyDGD/>
    <Results/>
    <IntegrationMap/>
    <Testimonials/>
    <InlineCTA nav={nav}/>
  </div>
);

window.HomePage = HomePage;
