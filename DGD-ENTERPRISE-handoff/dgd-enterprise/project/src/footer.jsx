const Footer = ({nav}) => (
  <footer>
    <div className="container">
      <div className="footer-grid">
        <div>
          <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 16, color:'white'}}>
            <div style={{width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #14B8A6, #0D9488)', display:'grid', placeItems:'center', color:'white', fontWeight: 800}}>D</div>
            <span style={{color:'white', fontWeight: 700, fontSize: 18}}>DGD<span style={{color:'var(--brand-accent)'}}>.</span>enterprise</span>
          </div>
          <p style={{fontSize: 14, lineHeight: 1.65, color:'var(--ink-400)', marginBottom: 20, maxWidth: 320}}>
            Partner oficial de Codeplex Software en Perú. Implementamos y acompañamos a PYMEs en su digitalización SUNAT.
          </p>
          <div style={{display:'flex', gap: 10}}>
            {['linkedin','facebook','instagram','youtube'].map(s=>(
              <a key={s} href="#" aria-label={s} style={{width: 36, height: 36, borderRadius: 8, background:'rgba(255,255,255,.08)', display:'grid', placeItems:'center', transition:'all .15s'}} onMouseEnter={e=>e.currentTarget.style.background='var(--brand-accent)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.08)'}>
                <span style={{fontSize: 11, fontWeight: 700, color:'white', textTransform:'uppercase'}}>{s[0]}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Productos</h4>
          <ul>
            <li><a href="#/productos/contaplex" onClick={(e)=>{e.preventDefault(); nav('productos/contaplex');}}>ContaPlex</a></li>
            <li><a href="#/productos/gestionplex" onClick={(e)=>{e.preventDefault(); nav('productos/gestionplex');}}>GestiónPlex</a></li>
            <li><a href="#/productos/facturacion-sunat" onClick={(e)=>{e.preventDefault(); nav('productos/facturacion-sunat');}}>Facturación SUNAT</a></li>
            <li><a href="#/planes" onClick={(e)=>{e.preventDefault(); nav('planes');}}>Comparar planes</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Empresa</h4>
          <ul>
            <li><a href="#/nosotros" onClick={(e)=>{e.preventDefault(); nav('nosotros');}}>Nosotros</a></li>
            <li><a href="#/blog" onClick={(e)=>{e.preventDefault(); nav('blog');}}>Blog</a></li>
            <li><a href="#/casos-de-exito" onClick={(e)=>{e.preventDefault(); nav('casos-de-exito');}}>Casos de éxito</a></li>
            <li><a href="#/contacto" onClick={(e)=>{e.preventDefault(); nav('contacto');}}>Contacto</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Cookies</a></li>
            <li style={{marginTop: 6}}><a href="#" className="reclamaciones"><Icon name="book" size={13}/> LIBRO DE RECLAMACIONES</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <div>DGD Enterprise · <span style={{fontFamily:'var(--font-mono)', opacity: .7}}>RUC pendiente</span></div>
          <div style={{marginTop: 3, color:'var(--ink-500)', fontFamily:'var(--font-mono)', fontSize: 12}}>// dirección fiscal pendiente de dato real</div>
        </div>
        <div style={{display:'flex', gap: 18, alignItems:'center'}}>
          <span>© 2026 DGD Enterprise</span>
          <span className="badge" style={{background:'rgba(20,184,166,.15)', color:'var(--brand-accent)'}}>Partner oficial Codeplex</span>
        </div>
      </div>
    </div>
  </footer>
);

window.Footer = Footer;
