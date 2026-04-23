// Blog index

const BlogPage = ({nav}) => {
  const [search, setSearch] = React.useState('');
  const [cat, setCat] = React.useState('Todos');
  const [page, setPage] = React.useState(1);
  const cats = ['Todos', 'SUNAT', 'Contabilidad', 'Logística', 'Facturación', 'PYMEs', 'Tecnología'];
  const toast = useToast();
  const [email, setEmail] = React.useState('');

  const filtered = BLOG_POSTS.filter(p =>
    (cat==='Todos' || p.cat===cat) &&
    (search==='' || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );
  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil(filtered.length/perPage));
  const paged = filtered.slice((page-1)*perPage, page*perPage);

  const catColor = (c) => ({SUNAT:'#14B8A6', Contabilidad:'#3B82F6', Logística:'#F59E0B', Facturación:'#8B5CF6', PYMEs:'#EC4899', Tecnología:'#6366F1'}[c] || '#14B8A6');

  const submitNewsletter = (e) => {
    e.preventDefault();
    if (!email) return;
    toast('¡Suscrito! Revisa tu bandeja.');
    setEmail('');
  };

  return (
    <div className="page" data-screen-label="Blog">
      <section style={{padding:'72px 0 40px', background:'linear-gradient(180deg, var(--bg-alt), var(--bg))'}}>
        <div className="container" style={{textAlign:'center', maxWidth: 760}}>
          <Eyebrow>Blog DGD</Eyebrow>
          <h1 style={{marginTop: 8}}>Ideas para digitalizar tu PYME</h1>
          <p style={{fontSize: 18, color:'var(--ink-500)', marginTop: 18}}>Guías SUNAT, tips contables, logística y casos reales de PYMEs peruanas. Escrito por nuestros consultores.</p>
          <div style={{marginTop: 32, position:'relative', maxWidth: 480, margin: '32px auto 0'}}>
            <Icon name="search" size={18} style={{position:'absolute', left: 18, top:'50%', transform:'translateY(-50%)', color:'var(--ink-500)'}}/>
            <input value={search} onChange={e=>{setSearch(e.target.value); setPage(1);}} placeholder="Buscar artículos..." className="input" style={{paddingLeft: 46, height: 52, borderRadius: 999, fontSize: 15}}/>
          </div>
        </div>
      </section>

      <section style={{padding: '32px 0 0'}}>
        <div className="container">
          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap: 8, marginBottom: 48}}>
            {cats.map(c => (
              <button key={c} onClick={()=>{setCat(c); setPage(1);}} style={{
                padding:'8px 16px', borderRadius: 999,
                border: `1px solid ${cat===c?'transparent':'var(--ink-200)'}`,
                background: cat===c?'var(--ink-900)':'var(--bg)',
                color: cat===c?'var(--bg)':'var(--ink-700)',
                fontSize: 13.5, fontWeight: 600, cursor:'pointer'
              }}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding: '0 0 64px'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1fr 280px', gap: 40}}>
            <div>
              {paged.length===0 ? (
                <div style={{padding: 64, textAlign:'center', color:'var(--ink-500)', border:'1px dashed var(--ink-200)', borderRadius: 18}}>
                  <div style={{fontSize: 34, marginBottom: 12}}>✏️</div>
                  <div style={{fontSize: 17, fontWeight: 600, color:'var(--ink-900)', marginBottom: 6}}>Pronto publicaremos artículos</div>
                  <div style={{fontSize: 14, maxWidth: 380, margin:'0 auto'}}>Estamos preparando contenido original sobre SUNAT, contabilidad y digitalización para PYMEs. Suscríbete al newsletter para recibirlos primero.</div>
                </div>
              ) : (
                <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 24}}>
                  {paged.map(p => (
                    <article key={p.slug} onClick={()=>nav(`blog/${p.slug}`)} className="card card-hover" style={{padding: 0, cursor:'pointer', overflow:'hidden', borderRadius: 16, display:'flex', flexDirection:'column'}}>
                      <div style={{height: 160, background: `linear-gradient(135deg, ${catColor(p.cat)}, color-mix(in srgb, ${catColor(p.cat)} 50%, black))`, position:'relative', overflow:'hidden'}}>
                        <div style={{position:'absolute', inset: 0, background:'repeating-linear-gradient(45deg, transparent 0 20px, rgba(255,255,255,.07) 20px 40px)'}}/>
                        <Badge variant="pop" style={{position:'absolute', top: 14, left: 14, background:'rgba(255,255,255,.22)', backdropFilter:'blur(8px)', color:'white'}}>{p.cat}</Badge>
                        <div style={{position:'absolute', bottom: 14, right: 14, padding:'4px 10px', borderRadius: 6, background:'rgba(0,0,0,.3)', color:'white', fontSize: 11, fontWeight: 600}}>{p.read}</div>
                      </div>
                      <div style={{padding: 20, flex: 1, display:'flex', flexDirection:'column'}}>
                        <h3 style={{fontSize: 17, lineHeight: 1.35, marginBottom: 10}}>{p.title}</h3>
                        <p style={{fontSize: 13.5, color:'var(--ink-500)', lineHeight: 1.55, marginBottom: 16, flex: 1}}>{p.excerpt}</p>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize: 12, color:'var(--ink-500)', paddingTop: 14, borderTop:'1px solid var(--ink-100)'}}>
                          <span>{p.author}</span>
                          <span>{p.date}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div style={{display:'flex', justifyContent:'center', gap: 6, marginTop: 40}}>
                  <button onClick={()=>setPage(Math.max(1, page-1))} disabled={page===1} style={{padding:'8px 14px', borderRadius: 8, border:'1px solid var(--ink-200)', background:'var(--bg)', opacity: page===1?.4:1, cursor: page===1?'default':'pointer'}}>
                    <Icon name="chevron" size={14} style={{transform:'rotate(90deg)'}}/>
                  </button>
                  {Array.from({length: totalPages}, (_,i)=>i+1).map(n => (
                    <button key={n} onClick={()=>setPage(n)} style={{width: 40, height: 40, borderRadius: 8, background: page===n?'var(--ink-900)':'var(--bg)', color: page===n?'var(--bg)':'var(--ink-700)', fontWeight: 600, border: `1px solid ${page===n?'transparent':'var(--ink-200)'}`}}>{n}</button>
                  ))}
                  <button onClick={()=>setPage(Math.min(totalPages, page+1))} disabled={page===totalPages} style={{padding:'8px 14px', borderRadius: 8, border:'1px solid var(--ink-200)', background:'var(--bg)', opacity: page===totalPages?.4:1}}>
                    <Icon name="chevron" size={14} style={{transform:'rotate(-90deg)'}}/>
                  </button>
                </div>
              )}
            </div>

            <aside style={{display:'flex', flexDirection:'column', gap: 28}}>
              <div className="card" style={{padding: 22, borderRadius: 16}}>
                <h4 style={{fontSize: 13, fontWeight: 700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-500)', marginBottom: 14}}>Categorías</h4>
                <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap: 8}}>
                  {cats.slice(1).map(c => {
                    const count = BLOG_POSTS.filter(p=>p.cat===c).length;
                    return (
                      <li key={c}><button onClick={()=>{setCat(c); setPage(1);}} style={{width:'100%', display:'flex', justifyContent:'space-between', padding:'6px 0', fontSize: 14, color:'var(--ink-700)'}}>
                        <span>{c}</span><span style={{color:'var(--ink-500)', fontSize: 12}}>{count}</span>
                      </button></li>
                    );
                  })}
                </ul>
              </div>
              <div className="card" style={{padding: 22, borderRadius: 16}}>
                <h4 style={{fontSize: 13, fontWeight: 700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-500)', marginBottom: 14}}>Más populares</h4>
                <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap: 14}}>
                  {BLOG_POSTS.slice(0,4).map((p,i) => (
                    <li key={p.slug} onClick={()=>nav(`blog/${p.slug}`)} style={{display:'flex', gap: 12, cursor:'pointer'}}>
                      <div style={{fontSize: 22, fontWeight: 800, color:'var(--ink-300)', lineHeight: 1, minWidth: 24}}>0{i+1}</div>
                      <div style={{fontSize: 13, lineHeight: 1.4, fontWeight: 500, color:'var(--ink-900)'}}>{p.title}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{padding: 22, borderRadius: 16, background:'linear-gradient(135deg, var(--brand-primary), #123558)', color:'white'}}>
                <h4 style={{color:'white', marginBottom: 8, fontSize: 15}}>Newsletter DGD</h4>
                <p style={{fontSize: 13, color:'rgba(255,255,255,.8)', marginBottom: 16, lineHeight: 1.5}}>1 email al mes con lo nuevo de SUNAT y tips prácticos.</p>
                <form onSubmit={submitNewsletter} style={{display:'flex', flexDirection:'column', gap: 8}}>
                  <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@empresa.pe" className="input" style={{background:'rgba(255,255,255,.12)', border:'1px solid rgba(255,255,255,.2)', color:'white'}}/>
                  <Btn type="submit" variant="primary" size="sm" style={{justifyContent:'center'}}>Suscribirme</Btn>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

window.BlogPage = BlogPage;
