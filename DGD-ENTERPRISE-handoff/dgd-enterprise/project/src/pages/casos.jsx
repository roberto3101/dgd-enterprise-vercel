// Casos de éxito page

const CasosPage = ({nav}) => {
  const [filter, setFilter] = React.useState('Todos');
  const [selected, setSelected] = React.useState(null);

  const tags = ['Todos', ...Array.from(new Set(CASOS.map(c=>c.tag)))];
  const filtered = filter==='Todos' ? CASOS : CASOS.filter(c=>c.tag===filter);

  const colorFor = (tag) => ({
    'Testimonio público':'#14B8A6',
    'Investigación':'#3B82F6',
    'Próximamente':'#8B5CF6',
  }[tag] || '#14B8A6');

  return (
    <div className="page" data-screen-label="Casos">
      <section style={{padding:'72px 0 48px'}}>
        <div className="container" style={{textAlign:'center', maxWidth: 760}}>
          <Eyebrow>Casos de éxito</Eyebrow>
          <h1 style={{marginTop: 8}}>Historias reales de PYMEs peruanas</h1>
          <p style={{fontSize: 18, color:'var(--ink-500)', marginTop: 18}}>Estamos construyendo esta sección con casos reales y autorización escrita de cada cliente. Mientras tanto, compartimos referencias públicas verificables.</p>
        </div>
      </section>

      <section style={{padding: '0 0 32px'}}>
        <div className="container">
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap: 8, marginBottom: 32}}>
            {tags.map(t => (
              <button key={t} onClick={()=>setFilter(t)} style={{
                padding:'8px 16px', borderRadius: 999, border:'1px solid var(--ink-200)',
                background: filter===t?'var(--ink-900)':'var(--bg)',
                color: filter===t?'var(--bg)':'var(--ink-700)',
                fontSize: 13.5, fontWeight: 600, cursor:'pointer', transition:'all .15s'
              }}>{t}</button>
            ))}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap: 20}}>
            {filtered.map((c,i)=>(
              <article key={i} onClick={()=>setSelected(c)} className="card card-hover" style={{padding: 0, cursor:'pointer', overflow:'hidden', borderRadius: 18}}>
                <div style={{height: 140, background:`linear-gradient(135deg, ${colorFor(c.tag)}, color-mix(in srgb, ${colorFor(c.tag)} 50%, black))`, padding: 22, color:'white', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden'}}>
                  <div style={{position:'absolute', right:-40, bottom:-40, width: 180, height: 180, borderRadius:'50%', border:'1px solid rgba(255,255,255,.15)'}}/>
                  <Badge variant="pop" style={{background:'rgba(255,255,255,.18)', color:'white', alignSelf:'flex-start'}}>{c.tag}</Badge>
                  <div>
                    <div style={{fontSize: 38, fontWeight: 800, letterSpacing:'-0.03em'}}>{c.metric}</div>
                    <div style={{fontSize: 13, opacity: .85}}>{c.kpi}</div>
                  </div>
                </div>
                <div style={{padding: 22}}>
                  <div style={{fontSize: 11, color:'var(--ink-500)', fontWeight: 600, textTransform:'uppercase', letterSpacing:'.08em', marginBottom: 6}}>{c.industry}</div>
                  <h3 style={{fontSize: 18, marginBottom: 10}}>{c.company}</h3>
                  <p style={{fontSize: 13.5, color:'var(--ink-500)', lineHeight: 1.55, marginBottom: 16}}>{c.desc}</p>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize: 12, color:'var(--ink-500)'}}>
                    <span>{c.city} · {c.size}</span>
                    <span style={{color:'var(--brand-accent-2)', fontWeight: 600}}>Leer caso <Icon name="arrow" size={12} style={{display:'inline', marginLeft: 2}}/></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div onClick={()=>setSelected(null)} style={{position:'fixed', inset: 0, background:'rgba(10,22,40,.75)', backdropFilter:'blur(6px)', zIndex: 200, display:'grid', placeItems:'center', padding: 24}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'var(--bg)', borderRadius: 20, padding: 40, maxWidth: 640, width:'100%', maxHeight:'88vh', overflow:'auto', boxShadow:'var(--shadow-xl)'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 20}}>
              <Badge variant="primary">{selected.tag}</Badge>
              <button onClick={()=>setSelected(null)} style={{width: 36, height: 36, borderRadius:'50%', background:'var(--ink-100)'}}><Icon name="x" size={18}/></button>
            </div>
            <div style={{fontSize: 12, color:'var(--ink-500)', textTransform:'uppercase', fontWeight: 600, letterSpacing:'.06em'}}>{selected.industry}</div>
            <h2 style={{margin:'8px 0 18px'}}>{selected.company}</h2>
            <div style={{padding: 24, background:'var(--bg-alt)', borderRadius: 14, marginBottom: 20}}>
              <div style={{fontSize: 52, fontWeight: 800, color:'var(--brand-accent-2)', letterSpacing:'-0.03em'}}>{selected.metric}</div>
              <div style={{fontSize: 14, color:'var(--ink-700)'}}>{selected.kpi}</div>
            </div>
            <p style={{color:'var(--ink-700)', lineHeight: 1.7, fontSize: 15, marginBottom: 20}}>{selected.desc}</p>
            {selected.link && <a href={selected.link} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex', alignItems:'center', gap: 6, color:'var(--brand-accent-2)', fontWeight: 600, fontSize: 13.5, marginBottom: 16}}>Ver fuente pública <Icon name="arrow" size={14}/></a>}
            <div style={{display:'flex', gap: 20, padding:'16px 0', borderTop:'1px solid var(--ink-200)', fontSize: 13, color:'var(--ink-500)'}}>
              <span><b style={{color:'var(--ink-900)'}}>Ubicación:</b> {selected.city}</span>
              <span><b style={{color:'var(--ink-900)'}}>Tamaño:</b> {selected.size}</span>
            </div>
            <Btn variant="primary" size="lg" onClick={()=>{setSelected(null); nav('contacto');}} style={{marginTop: 16, width:'100%', justifyContent:'center'}}>Quiero un caso como este <Icon name="arrow" size={18}/></Btn>
          </div>
        </div>
      )}

      <CTAPanel title="¿Quieres ser nuestro próximo caso de éxito?" desc="Agenda una sesión con nuestros consultores y diseñemos juntos tu plan de digitalización." primary="Agendar reunión" onPrimary={()=>nav('contacto')}/>
    </div>
  );
};

window.CasosPage = CasosPage;
