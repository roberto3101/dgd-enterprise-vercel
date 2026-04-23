// Contacto page

const ContactoPage = ({nav}) => {
  const toast = useToast();
  const [form, setForm] = React.useState({nombre:'', empresa:'', ruc:'', email:'', telefono:'', producto:'ContaPlex', usuarios:'1-5', mensaje:''});
  const [sending, setSending] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const e = {};
    if (!form.nombre) e.nombre = 'Requerido';
    if (!form.email || !form.email.includes('@')) e.email = 'Email válido requerido';
    if (!form.empresa) e.empresa = 'Requerido';
    if (form.ruc && form.ruc.length !== 11) e.ruc = 'RUC debe tener 11 dígitos';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) { toast('Revisa los campos', 'error'); return; }
    setSending(true);
    setTimeout(()=>{
      setSending(false);
      toast(`¡Gracias ${form.nombre.split(' ')[0]}! Te contactamos pronto.`);
      setForm({nombre:'', empresa:'', ruc:'', email:'', telefono:'', producto:'ContaPlex', usuarios:'1-5', mensaje:''});
    }, 1200);
  };

  const err = (f) => errors[f];

  return (
    <div className="page" data-screen-label="Contacto">
      <section style={{padding:'72px 0 32px'}}>
        <div className="container" style={{textAlign:'center', maxWidth: 720}}>
          <Eyebrow>Contacto</Eyebrow>
          <h1 style={{marginTop: 8}}>Hablemos de tu proyecto</h1>
          <p style={{fontSize: 18, color:'var(--ink-500)', marginTop: 18}}>Completa el formulario o escríbenos por WhatsApp. Un consultor te contactará en menos de 24 horas.</p>
        </div>
      </section>

      <section style={{padding:'16px 0 72px'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap: 40, alignItems:'start'}}>
            <form onSubmit={submit} className="card" style={{padding: 36, borderRadius: 20}}>
              <h3 style={{fontSize: 20, marginBottom: 24}}>Cuéntanos sobre tu empresa</h3>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 16}}>
                <div className="field">
                  <label>Nombre y apellido *</label>
                  <input className="input" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} style={err('nombre')?{borderColor:'#EF4444'}:{}}/>
                  {err('nombre') && <span style={{fontSize: 12, color:'#EF4444'}}>{err('nombre')}</span>}
                </div>
                <div className="field">
                  <label>Empresa *</label>
                  <input className="input" value={form.empresa} onChange={e=>setForm({...form, empresa:e.target.value})} style={err('empresa')?{borderColor:'#EF4444'}:{}}/>
                  {err('empresa') && <span style={{fontSize: 12, color:'#EF4444'}}>{err('empresa')}</span>}
                </div>
                <div className="field">
                  <label>RUC</label>
                  <input className="input" value={form.ruc} onChange={e=>setForm({...form, ruc:e.target.value.replace(/\D/g,'').slice(0,11)})} placeholder="20XXXXXXXXX" style={err('ruc')?{borderColor:'#EF4444'}:{}}/>
                  {err('ruc') && <span style={{fontSize: 12, color:'#EF4444'}}>{err('ruc')}</span>}
                </div>
                <div className="field">
                  <label>Teléfono</label>
                  <input className="input" value={form.telefono} onChange={e=>setForm({...form, telefono:e.target.value})} placeholder="+51 9XX XXX XXX"/>
                </div>
                <div className="field" style={{gridColumn:'1/-1'}}>
                  <label>Email corporativo *</label>
                  <input type="email" className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} style={err('email')?{borderColor:'#EF4444'}:{}}/>
                  {err('email') && <span style={{fontSize: 12, color:'#EF4444'}}>{err('email')}</span>}
                </div>
                <div className="field">
                  <label>Producto de interés</label>
                  <select className="select" value={form.producto} onChange={e=>setForm({...form, producto:e.target.value})}>
                    <option>ContaPlex</option>
                    <option>GestiónPlex</option>
                    <option>Facturación SUNAT</option>
                    <option>Los tres integrados</option>
                    <option>No estoy seguro</option>
                  </select>
                </div>
                <div className="field">
                  <label>Usuarios estimados</label>
                  <select className="select" value={form.usuarios} onChange={e=>setForm({...form, usuarios:e.target.value})}>
                    <option>1-5</option>
                    <option>6-15</option>
                    <option>16-50</option>
                    <option>51-200</option>
                    <option>Más de 200</option>
                  </select>
                </div>
                <div className="field" style={{gridColumn:'1/-1'}}>
                  <label>Mensaje (opcional)</label>
                  <textarea className="textarea" value={form.mensaje} onChange={e=>setForm({...form, mensaje:e.target.value})} placeholder="Cuéntanos brevemente qué necesitas..."/>
                </div>
              </div>
              <div style={{marginTop: 24, display:'flex', gap: 14, alignItems:'center', justifyContent:'space-between', flexWrap:'wrap'}}>
                <label style={{fontSize: 13, color:'var(--ink-500)', display:'flex', gap: 10, alignItems:'flex-start', maxWidth: 380}}>
                  <input type="checkbox" required style={{marginTop: 3}}/>
                  <span>Acepto la política de privacidad y el tratamiento de mis datos para ser contactado.</span>
                </label>
                <Btn type="submit" variant="primary" size="lg" disabled={sending}>
                  {sending ? 'Enviando...' : 'Enviar solicitud'} <Icon name="send" size={16}/>
                </Btn>
              </div>
            </form>

            <aside style={{display:'flex', flexDirection:'column', gap: 18}}>
              <div className="card" style={{padding: 24, borderRadius: 16}}>
                <h4 style={{fontSize: 14, fontWeight: 700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-500)', marginBottom: 16}}>Contacto directo</h4>
                <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap: 14}}>
                  <li style={{display:'flex', gap: 12, alignItems:'flex-start'}}>
                    <div style={{width: 36, height: 36, borderRadius: 10, background:'color-mix(in srgb, var(--brand-accent) 12%, transparent)', color:'var(--brand-accent-2)', display:'grid', placeItems:'center'}}><Icon name="phone" size={16}/></div>
                    <div><div style={{fontSize: 12, color:'var(--ink-500)', fontWeight: 600}}>Teléfono</div><div style={{fontWeight: 600, fontFamily:'var(--font-mono)', fontSize: 13}}>// pendiente de dato real</div></div>
                  </li>
                  <li style={{display:'flex', gap: 12, alignItems:'flex-start'}}>
                    <div style={{width: 36, height: 36, borderRadius: 10, background:'color-mix(in srgb, var(--brand-accent) 12%, transparent)', color:'var(--brand-accent-2)', display:'grid', placeItems:'center'}}><Icon name="whatsapp" size={16}/></div>
                    <div><div style={{fontSize: 12, color:'var(--ink-500)', fontWeight: 600}}>WhatsApp</div><div style={{fontWeight: 600, fontFamily:'var(--font-mono)', fontSize: 13}}>// pendiente de dato real</div></div>
                  </li>
                  <li style={{display:'flex', gap: 12, alignItems:'flex-start'}}>
                    <div style={{width: 36, height: 36, borderRadius: 10, background:'color-mix(in srgb, var(--brand-accent) 12%, transparent)', color:'var(--brand-accent-2)', display:'grid', placeItems:'center'}}><Icon name="mail" size={16}/></div>
                    <div><div style={{fontSize: 12, color:'var(--ink-500)', fontWeight: 600}}>Email</div><div style={{fontWeight: 600, fontFamily:'var(--font-mono)', fontSize: 13}}>// pendiente de dato real</div></div>
                  </li>
                  <li style={{display:'flex', gap: 12, alignItems:'flex-start'}}>
                    <div style={{width: 36, height: 36, borderRadius: 10, background:'color-mix(in srgb, var(--brand-accent) 12%, transparent)', color:'var(--brand-accent-2)', display:'grid', placeItems:'center'}}><Icon name="mapPin" size={16}/></div>
                    <div><div style={{fontSize: 12, color:'var(--ink-500)', fontWeight: 600}}>Oficina</div><div style={{fontWeight: 600, fontFamily:'var(--font-mono)', fontSize: 13, lineHeight: 1.4}}>// dirección pendiente de dato real</div></div>
                  </li>
                </ul>
              </div>

              <div className="card" style={{padding: 24, borderRadius: 16, background:'linear-gradient(135deg, var(--brand-primary), #123558)', color:'white', border:'none'}}>
                <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 14}}>
                  <Icon name="clock" size={18} style={{color:'var(--brand-accent)'}}/>
                  <h4 style={{color:'white', margin: 0, fontSize: 14, fontWeight: 700, textTransform:'uppercase', letterSpacing:'.08em'}}>Horarios</h4>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,.1)', fontSize: 14}}>
                  <span style={{color:'rgba(255,255,255,.75)'}}>Lunes - Viernes</span><span style={{fontWeight: 600}}>8:00 AM — 6:00 PM</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,.1)', fontSize: 14}}>
                  <span style={{color:'rgba(255,255,255,.75)'}}>Sábados</span><span style={{fontWeight: 600}}>8:00 AM — 2:00 PM</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0', fontSize: 14}}>
                  <span style={{color:'rgba(255,255,255,.75)'}}>Domingos</span><span style={{fontWeight: 600, color:'rgba(255,255,255,.6)'}}>Cerrado</span>
                </div>
              </div>

              <a href="#" className="btn" style={{background:'#25D366', color:'white', justifyContent:'center', padding:'14px 22px', borderRadius: 14, fontWeight: 700}}>
                <Icon name="whatsapp" size={20}/> Escribir por WhatsApp
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Map */}
      <section style={{padding:'0 0 72px'}}>
        <div className="container">
          <div style={{borderRadius: 20, overflow:'hidden', border:'1px solid var(--ink-200)', boxShadow:'var(--shadow)', height: 360, position:'relative', background:'var(--bg-alt)'}}>
            <svg viewBox="0 0 800 360" style={{width:'100%', height:'100%', background: 'var(--bg-alt)'}}>
              {/* Grid streets */}
              <g stroke="var(--ink-200)" strokeWidth="1" fill="none">
                {Array.from({length: 12}).map((_,i)=><line key={`v${i}`} x1={i*70} y1="0" x2={i*70} y2="360"/>)}
                {Array.from({length: 6}).map((_,i)=><line key={`h${i}`} x1="0" y1={i*65} x2="800" y2={i*65}/>)}
              </g>
              <g stroke="var(--ink-300)" strokeWidth="3" fill="none">
                <line x1="0" y1="160" x2="800" y2="160"/>
                <line x1="350" y1="0" x2="350" y2="360"/>
              </g>
              {/* Parks */}
              <rect x="500" y="40" width="160" height="80" fill="color-mix(in srgb, #14B8A6 15%, transparent)" rx="6"/>
              <rect x="100" y="220" width="120" height="80" fill="color-mix(in srgb, #14B8A6 15%, transparent)" rx="6"/>
              {/* Labels */}
              <text x="30" y="155" fontSize="11" fill="var(--ink-500)" fontFamily="var(--font-mono)">Av. Javier Prado E.</text>
              <text x="360" y="30" fontSize="11" fill="var(--ink-500)" fontFamily="var(--font-mono)">Av. Petit Thouars</text>
              {/* Pin */}
              <g transform="translate(380, 175)">
                <circle r="24" fill="var(--brand-accent)" opacity=".25"/>
                <circle r="14" fill="var(--brand-accent)"/>
                <path d="M 0 -28 C -10 -28 -14 -20 -14 -14 C -14 -4 0 8 0 8 C 0 8 14 -4 14 -14 C 14 -20 10 -28 0 -28 Z" fill="var(--brand-primary)"/>
                <circle cy="-15" r="5" fill="white"/>
              </g>
            </svg>
            <div style={{position:'absolute', bottom: 20, left: 20, padding: 14, background:'var(--bg)', borderRadius: 12, boxShadow:'var(--shadow)', maxWidth: 280}}>
              <div style={{fontWeight: 700, marginBottom: 4}}>DGD Enterprise · Oficina Lima</div>
              <div style={{fontSize: 13, color:'var(--ink-500)', fontFamily:'var(--font-mono)'}}>// ubicación pendiente de dato real</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

window.ContactoPage = ContactoPage;
