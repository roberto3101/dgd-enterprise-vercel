// Navigation

const Nav = ({route, nav}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isActive = (r) => route === r || (r==='productos' && route.startsWith('productos/'));

  // Lock scroll when drawer open
  React.useEffect(()=>{
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return ()=>{ document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const go = (r) => { nav(r); setMobileOpen(false); setDropdownOpen(false); };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#/" onClick={(e)=>{e.preventDefault(); go('');}}><Logo/></a>
          <div className="nav-links">
            <div className={`nav-dropdown ${dropdownOpen?'open':''}`} onMouseLeave={()=>setDropdownOpen(false)}>
              <button className={`nav-link ${isActive('productos')?'active':''}`} onClick={()=>setDropdownOpen(!dropdownOpen)} onMouseEnter={()=>setDropdownOpen(true)}>
                Productos <Icon name="chevron" size={14}/>
              </button>
              <div className="nav-dropdown-menu" onMouseEnter={()=>setDropdownOpen(true)}>
                {Object.values(PRODUCTS).map(p=>(
                  <a key={p.slug} className="nav-dropdown-item" href={`#/productos/${p.slug}`} onClick={(e)=>{e.preventDefault(); go(`productos/${p.slug}`);}}>
                    <div className="nav-dropdown-item-icon" style={{background:`color-mix(in srgb, ${p.color} 12%, transparent)`, color: p.color}}>
                      <Icon name={p.icon} size={18}/>
                    </div>
                    <div>
                      <div className="nav-dropdown-item-title">{p.name}</div>
                      <div className="nav-dropdown-item-desc">{p.tagline}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <a className={`nav-link ${isActive('planes')?'active':''}`} href="#/planes" onClick={(e)=>{e.preventDefault(); go('planes');}}>Planes</a>
            <a className={`nav-link ${isActive('casos-de-exito')?'active':''}`} href="#/casos-de-exito" onClick={(e)=>{e.preventDefault(); go('casos-de-exito');}}>Casos de éxito</a>
            <a className={`nav-link ${isActive('blog')||route.startsWith('blog/')?'active':''}`} href="#/blog" onClick={(e)=>{e.preventDefault(); go('blog');}}>Blog</a>
            <a className={`nav-link ${isActive('nosotros')?'active':''}`} href="#/nosotros" onClick={(e)=>{e.preventDefault(); go('nosotros');}}>Nosotros</a>
            <a className={`nav-link ${isActive('contacto')?'active':''}`} href="#/contacto" onClick={(e)=>{e.preventDefault(); go('contacto');}}>Contacto</a>
            <a className="nav-cta" href="#/contacto" onClick={(e)=>{e.preventDefault(); go('contacto');}}>Solicitar demo <Icon name="arrow" size={14}/></a>
          </div>
          <button className="nav-mobile-toggle" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Menú">
            <Icon name={mobileOpen?'x':'menu'} size={22}/>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${mobileOpen?'open':''}`} onClick={()=>setMobileOpen(false)}>
        <div className="mobile-drawer-panel" onClick={(e)=>e.stopPropagation()}>
          <button onClick={()=>setMobileOpen(false)} aria-label="Cerrar" style={{position:'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: 8, display:'grid', placeItems:'center', color:'var(--ink-700)'}}>
            <Icon name="x" size={22}/>
          </button>

          <a className={`mobile-drawer-link ${isActive('')?'active':''}`} href="#/" onClick={(e)=>{e.preventDefault(); go('');}}>
            <Icon name="home" size={18}/> Inicio
          </a>

          <div className="mobile-drawer-section">Productos</div>
          {Object.values(PRODUCTS).map(p=>(
            <a key={p.slug} className={`mobile-drawer-link ${route===`productos/${p.slug}`?'active':''}`} href={`#/productos/${p.slug}`} onClick={(e)=>{e.preventDefault(); go(`productos/${p.slug}`);}}>
              <div style={{width: 28, height: 28, borderRadius: 6, background:`color-mix(in srgb, ${p.color} 15%, transparent)`, color: p.color, display:'grid', placeItems:'center', flexShrink: 0}}>
                <Icon name={p.icon} size={14}/>
              </div>
              {p.name}
            </a>
          ))}

          <div className="mobile-drawer-section">Empresa</div>
          <a className={`mobile-drawer-link ${isActive('planes')?'active':''}`} href="#/planes" onClick={(e)=>{e.preventDefault(); go('planes');}}>Planes</a>
          <a className={`mobile-drawer-link ${isActive('casos-de-exito')?'active':''}`} href="#/casos-de-exito" onClick={(e)=>{e.preventDefault(); go('casos-de-exito');}}>Casos de éxito</a>
          <a className={`mobile-drawer-link ${isActive('blog')||route.startsWith('blog/')?'active':''}`} href="#/blog" onClick={(e)=>{e.preventDefault(); go('blog');}}>Blog</a>
          <a className={`mobile-drawer-link ${isActive('nosotros')?'active':''}`} href="#/nosotros" onClick={(e)=>{e.preventDefault(); go('nosotros');}}>Nosotros</a>
          <a className={`mobile-drawer-link ${isActive('contacto')?'active':''}`} href="#/contacto" onClick={(e)=>{e.preventDefault(); go('contacto');}}>Contacto</a>

          <a className="mobile-drawer-cta" href="#/contacto" onClick={(e)=>{e.preventDefault(); go('contacto');}}>
            Solicitar demo <Icon name="arrow" size={14} style={{marginLeft: 6, verticalAlign:'middle'}}/>
          </a>
        </div>
      </div>
    </>
  );
};

window.Nav = Nav;
