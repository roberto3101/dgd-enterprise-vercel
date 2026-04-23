// Blog post template

const BlogPost = ({slug, nav}) => {
  const post = BLOG_POSTS.find(p=>p.slug===slug) || BLOG_POSTS[0];
  const [progress, setProgress] = React.useState(0);
  const [activeSec, setActiveSec] = React.useState(0);

  const catColor = (c) => ({SUNAT:'#14B8A6', Contabilidad:'#3B82F6', Logística:'#F59E0B', Facturación:'#8B5CF6', PYMEs:'#EC4899', Tecnología:'#6366F1'}[c] || '#14B8A6');
  const color = catColor(post.cat);

  React.useEffect(()=>{
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p);
      // Active TOC detection
      const secs = document.querySelectorAll('[data-toc-section]');
      let cur = 0;
      secs.forEach((s,i)=>{ if (s.getBoundingClientRect().top < 200) cur = i; });
      setActiveSec(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fake rich body
  const sections = [
    {id:'intro', title:'Introducción'},
    {id:'contexto', title:'Contexto actual'},
    {id:'pasos', title:'Los pasos críticos'},
    {id:'errores', title:'Errores que evitar'},
    {id:'cierre', title:'Conclusión'},
  ];

  const related = BLOG_POSTS.filter(p=>p.slug!==post.slug).slice(0,3);

  return (
    <div className="page" data-screen-label="Blog post">
      {/* Reading progress */}
      <div style={{position:'fixed', top: 68, left: 0, height: 3, width: `${progress}%`, background: color, zIndex: 90, transition:'width .1s'}}/>

      <article>
        <header style={{padding:'56px 0 32px', background:'var(--bg-alt)'}}>
          <div className="container" style={{maxWidth: 820}}>
            <div style={{marginBottom: 20, fontSize: 14, color:'var(--ink-500)'}}>
              <button onClick={()=>nav('blog')} style={{color:'var(--brand-accent-2)', fontWeight: 600}}>← Volver al blog</button>
            </div>
            <div style={{display:'flex', gap: 10, marginBottom: 18}}>
              <Badge style={{background: `color-mix(in srgb, ${color} 12%, transparent)`, color}}>{post.cat}</Badge>
              <span style={{fontSize: 13, color:'var(--ink-500)'}}>{post.date} · {post.read} de lectura</span>
            </div>
            <h1 style={{fontSize:'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15}}>{post.title}</h1>
            <div style={{display:'flex', alignItems:'center', gap: 14, marginTop: 28, paddingTop: 24, borderTop:'1px solid var(--ink-200)'}}>
              <div style={{width: 48, height: 48, borderRadius:'50%', background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, black))`, color:'white', display:'grid', placeItems:'center', fontWeight: 700, fontSize: 16}}>
                {post.author.split(' ').map(w=>w[0]).slice(0,2).join('')}
              </div>
              <div>
                <div style={{fontWeight: 700, fontSize: 15}}>{post.author}</div>
                <div style={{fontSize: 13, color:'var(--ink-500)'}}>{post.authorRole} · DGD Enterprise</div>
              </div>
            </div>
          </div>
        </header>

        <div className="container" style={{padding:'56px 0'}}>
          <div style={{display:'grid', gridTemplateColumns:'240px 1fr', gap: 56, maxWidth: 1060, margin:'0 auto'}}>
            {/* TOC */}
            <aside style={{position:'sticky', top: 96, height:'fit-content', alignSelf:'start'}}>
              <div style={{fontSize: 11, fontWeight: 700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-500)', marginBottom: 14}}>En esta página</div>
              <nav style={{display:'flex', flexDirection:'column', gap: 2, borderLeft:'2px solid var(--ink-200)'}}>
                {sections.map((s, i) => (
                  <a key={s.id} href={`#${s.id}`} onClick={(e)=>{e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({behavior:'smooth'});}} style={{
                    padding:'8px 14px',
                    fontSize: 13.5,
                    color: activeSec===i?'var(--ink-900)':'var(--ink-500)',
                    fontWeight: activeSec===i?600:500,
                    borderLeft: `2px solid ${activeSec===i?color:'transparent'}`,
                    marginLeft:-2,
                    transition:'all .15s'
                  }}>{s.title}</a>
                ))}
              </nav>
              <div style={{marginTop: 28, paddingTop: 20, borderTop:'1px solid var(--ink-200)'}}>
                <div style={{fontSize: 11, fontWeight: 700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-500)', marginBottom: 10}}>Compartir</div>
                <div style={{display:'flex', gap: 6}}>
                  {['LinkedIn','X','WA','Link'].map(s=>(
                    <button key={s} style={{width: 36, height: 36, borderRadius: 8, background:'var(--ink-100)', fontSize: 11, fontWeight: 700, color:'var(--ink-700)'}}>{s}</button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Body */}
            <div style={{fontSize: 18, lineHeight: 1.75, color:'var(--ink-700)'}}>
              <div id="intro" data-toc-section style={{marginBottom: 40}}>
                <p style={{fontSize: 20, color:'var(--ink-900)', fontWeight: 500, lineHeight: 1.55, marginBottom: 24}}>{post.excerpt}</p>
                <p>En DGD Enterprise acompañamos a PYMEs peruanas que intentan ordenar su operación tributaria y contable con la suite de Codeplex. Hay patrones que se repiten — y aprendizajes concretos que vale la pena compartir.</p>
                <p style={{marginTop: 18}}>Este artículo busca ser práctico: nada de teoría abstracta, sí pasos claros que puedes aplicar esta semana en tu empresa.</p>
              </div>

              <div id="contexto" data-toc-section style={{marginBottom: 40}}>
                <h2 style={{fontSize: 28, marginBottom: 18, color:'var(--ink-900)'}}>Contexto actual</h2>
                <p>La normativa SUNAT se ha movido aceleradamente en los últimos dos años. Lo que antes era opcional hoy es obligatorio, y los plazos de adecuación cada vez son más cortos. Las PYMEs que se anticipan se ahorran multas y, sobre todo, dolores de cabeza operativos.</p>
                <blockquote style={{borderLeft: `4px solid ${color}`, padding:'16px 24px', background:'var(--bg-alt)', borderRadius: 8, margin: '24px 0', fontStyle:'italic', color:'var(--ink-900)'}}>
                  "El 80% de los problemas con SUNAT no son técnicos: son de procesos internos mal diseñados."
                </blockquote>
                <p>La herramienta importa, claro — pero la forma en que la equipas e implementas pesa más que la marca.</p>
              </div>

              <div id="pasos" data-toc-section style={{marginBottom: 40}}>
                <h2 style={{fontSize: 28, marginBottom: 18, color:'var(--ink-900)'}}>Los pasos críticos</h2>
                <p>En nuestra experiencia, una implementación ordenada sigue este orden:</p>
                <ol style={{marginTop: 20, paddingLeft: 24, display:'flex', flexDirection:'column', gap: 12}}>
                  <li><b style={{color:'var(--ink-900)'}}>Diagnóstico inicial</b> — inventario de procesos, fuentes de datos y accesos a SUNAT.</li>
                  <li><b style={{color:'var(--ink-900)'}}>Limpieza maestra</b> — plan de cuentas, maestro de clientes y proveedores depurado.</li>
                  <li><b style={{color:'var(--ink-900)'}}>Migración piloto</b> — un período completo de prueba antes del go-live oficial.</li>
                  <li><b style={{color:'var(--ink-900)'}}>Capacitación en vivo</b> — tu equipo necesita ver el sistema funcionando con tu data.</li>
                  <li><b style={{color:'var(--ink-900)'}}>Go-live y acompañamiento</b> — los primeros 30 días son clave para cerrar bien.</li>
                </ol>
              </div>

              <div id="errores" data-toc-section style={{marginBottom: 40}}>
                <h2 style={{fontSize: 28, marginBottom: 18, color:'var(--ink-900)'}}>Errores que evitar</h2>
                <p>Los tropiezos más comunes que vemos mes a mes:</p>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12, marginTop: 20}}>
                  {['Cambiar todo el mismo día sin piloto','No involucrar al contador desde el inicio','Saltarse la capacitación formal','Dejar la migración al final del proceso'].map((e,i)=>(
                    <div key={i} style={{padding: 16, background:'var(--bg-alt)', borderRadius: 10, borderLeft:`3px solid #EF4444`, fontSize: 14, color:'var(--ink-700)'}}>
                      <b style={{color:'var(--ink-900)'}}>#{i+1}</b> {e}
                    </div>
                  ))}
                </div>
              </div>

              <div id="cierre" data-toc-section>
                <h2 style={{fontSize: 28, marginBottom: 18, color:'var(--ink-900)'}}>Conclusión</h2>
                <p>Digitalizarse con SUNAT no es un proyecto de tecnología; es un proyecto de procesos con una herramienta debajo. Cuando lo ves así, las decisiones se ordenan solas.</p>
                <p style={{marginTop: 18}}>Si tienes dudas sobre por dónde empezar, agenda una llamada gratuita — hablamos en concreto sobre tu caso, sin guion de venta.</p>
                <div style={{marginTop: 32, padding: 28, borderRadius: 16, background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 50%, black))`, color:'white'}}>
                  <h3 style={{color:'white', fontSize: 20, marginBottom: 8}}>¿Quieres profundizar en este tema?</h3>
                  <p style={{color:'rgba(255,255,255,.85)', marginBottom: 18, fontSize: 15}}>Agenda 30 minutos con un consultor DGD — revisamos juntos tu caso específico.</p>
                  <Btn variant="primary" onClick={()=>nav('contacto')} style={{background:'white', color: color}}>Agendar llamada <Icon name="arrow" size={16}/></Btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="section-alt">
        <div className="container">
          <SectionHeader eyebrow="Sigue leyendo" title="Artículos relacionados" align="left" style={{textAlign:'left', marginLeft: 0}}/>
          <div className="grid-3">
            {related.map(p => (
              <article key={p.slug} onClick={()=>{ nav(`blog/${p.slug}`); window.scrollTo(0,0); }} className="card card-hover" style={{padding: 0, cursor:'pointer', overflow:'hidden', borderRadius: 16}}>
                <div style={{height: 120, background: `linear-gradient(135deg, ${catColor(p.cat)}, color-mix(in srgb, ${catColor(p.cat)} 50%, black))`}}/>
                <div style={{padding: 20}}>
                  <Badge style={{background: `color-mix(in srgb, ${catColor(p.cat)} 12%, transparent)`, color: catColor(p.cat), marginBottom: 10}}>{p.cat}</Badge>
                  <h3 style={{fontSize: 16, lineHeight: 1.35, marginBottom: 10}}>{p.title}</h3>
                  <div style={{fontSize: 12, color:'var(--ink-500)'}}>{p.author} · {p.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

window.BlogPost = BlogPost;
