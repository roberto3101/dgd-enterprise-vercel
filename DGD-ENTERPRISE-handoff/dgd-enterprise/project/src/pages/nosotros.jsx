// Nosotros page

const NosotrosPage = ({nav}) => (
  <div className="page" data-screen-label="Nosotros">
    <section className="hero" style={{paddingBottom: 48}}>
      <div className="hero-bg"/>
      <div className="container" style={{position:'relative', maxWidth: 860, textAlign:'center'}}>
        <Eyebrow>Nosotros</Eyebrow>
        <h1 style={{marginTop: 8}}>Somos el brazo de implementación de <span className="gradient-text">Codeplex</span> en Perú</h1>
        <p style={{fontSize: 19, color:'var(--ink-500)', marginTop: 22, maxWidth: 680, margin:'22px auto 0', lineHeight: 1.6}}>
          Desde 2019 acompañamos a PYMEs peruanas en su camino hacia la digitalización contable, logística y tributaria. No escribimos el software — lo llevamos a tu empresa y nos aseguramos de que funcione.
        </p>
      </div>
    </section>

    {/* Historia */}
    <section>
      <div className="container" style={{maxWidth: 980}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 48, alignItems:'center'}}>
          <div>
            <Eyebrow>Nuestra historia</Eyebrow>
            <h2 style={{marginTop: 8}}>De consultoría artesanal a ecosistema regional</h2>
            <div style={{display:'flex', flexDirection:'column', gap: 20, marginTop: 28, fontSize: 15.5, color:'var(--ink-700)', lineHeight: 1.7}}>
              <p>DGD Enterprise es partner comercial autorizado de Codeplex Software en Perú. Nuestra labor es la reventa e implementación de su suite cloud: ContaPlex, GestiónPlex y Facturación Electrónica SUNAT.</p>
              <p>No desarrollamos el software: lo llevamos a tu empresa. Nos encargamos de la asesoría, la parametrización, la capacitación y el soporte en español, desde Perú.</p>
              <p className="mono" style={{fontSize: 13, color:'var(--ink-500)'}}>// historia, fundación y números del equipo — pendientes de datos reales</p>
            </div>
          </div>
          <div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
              {[
                {y:'DGD', t:'Partner autorizado', d:'Brazo comercial y de implementación'},
                {y:'Codeplex', t:'Software proveedor', d:'Suite cloud SUNAT · LATAM'},
                {y:'SUNAT', t:'100% válido', d:'SIRE · RCE · RVIE · PLE'},
                {y:'Perú', t:'Soporte local', d:'Lun–Sáb en español'},
              ].map((m,i)=>(
                <div key={i} className="card" style={{padding: 20, borderRadius: 14}}>
                  <div className="mono" style={{fontSize: 12, color:'var(--brand-accent-2)', fontWeight: 600}}>{m.y}</div>
                  <div style={{fontWeight: 700, margin: '6px 0', fontSize: 15}}>{m.t}</div>
                  <div style={{fontSize: 12.5, color:'var(--ink-500)', lineHeight: 1.5}}>{m.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* MVV */}
    <section className="section-alt">
      <div className="container">
        <SectionHeader eyebrow="Cómo pensamos" title="Misión, visión y valores"/>
        <div className="grid-3">
          {[
            {icon:'target', title:'Misión', desc:'Simplificar la gestión contable y tributaria de las PYMEs peruanas, con tecnología confiable y acompañamiento humano.'},
            {icon:'eye', title:'Visión', desc:'Ser el partner de implementación líder en Perú para empresas que quieren crecer sin perder orden ni cumplimiento.'},
            {icon:'heart', title:'Valores', desc:'Cercanía, claridad, cumplimiento y aprendizaje continuo. No vendemos software: resolvemos problemas.'},
          ].map((m,i)=>(
            <div key={i} className="card" style={{borderRadius: 18, padding: 28, background:'var(--bg)'}}>
              <div style={{width: 48, height: 48, borderRadius: 12, background:'color-mix(in srgb, var(--brand-accent) 12%, transparent)', color:'var(--brand-accent-2)', display:'grid', placeItems:'center', marginBottom: 16}}>
                <Icon name={m.icon} size={22}/>
              </div>
              <h3 style={{fontSize: 20, marginBottom: 10}}>{m.title}</h3>
              <p style={{fontSize: 14.5, color:'var(--ink-500)', lineHeight: 1.6}}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Alianza Codeplex */}
    <section>
      <div className="container">
        <div style={{borderRadius: 24, background:'linear-gradient(135deg, var(--brand-primary), #123558)', padding: 'clamp(36px, 5vw, 56px)', color:'white', position:'relative', overflow:'hidden'}}>
          <div style={{position:'absolute', right: -80, top: -80, width: 320, height: 320, borderRadius:'50%', background:'radial-gradient(circle, rgba(20,184,166,.3), transparent 70%)'}}/>
          <div style={{position:'relative', display:'grid', gridTemplateColumns:'1.5fr 1fr', gap: 48, alignItems:'center'}}>
            <div>
              <Badge variant="pop">Alianza estratégica</Badge>
              <h2 style={{color:'white', marginTop: 14}}>Partner oficial de Codeplex Software</h2>
              <p style={{color:'rgba(255,255,255,.82)', fontSize: 17, marginTop: 16, lineHeight: 1.6}}>
                Codeplex construye suite cloud de contabilidad, gestión y facturación líder en Latinoamérica. DGD Enterprise es su brazo comercial y de implementación autorizado en Perú desde 2021.
              </p>
              <ul style={{listStyle:'none', marginTop: 20, display:'flex', flexDirection:'column', gap: 8, color:'rgba(255,255,255,.9)', fontSize: 14.5}}>
                <li style={{display:'flex', gap: 10}}><Icon name="check" size={18} style={{color:'var(--brand-accent)'}}/>Certificación oficial anual</li>
                <li style={{display:'flex', gap: 10}}><Icon name="check" size={18} style={{color:'var(--brand-accent)'}}/>Acceso preferente a roadmap y nuevas features</li>
                <li style={{display:'flex', gap: 10}}><Icon name="check" size={18} style={{color:'var(--brand-accent)'}}/>Soporte técnico directo con el equipo de desarrollo</li>
              </ul>
            </div>
            <div>
              <div style={{background:'rgba(255,255,255,.08)', borderRadius: 18, padding: 32, border:'1px solid rgba(255,255,255,.15)', backdropFilter:'blur(12px)', textAlign:'center'}}>
                <div style={{width: 90, height: 90, margin:'0 auto 18px', borderRadius: 20, background:'rgba(255,255,255,.1)', display:'grid', placeItems:'center', fontSize: 32, fontWeight: 800, letterSpacing:'-0.03em'}}>
                  <span style={{color:'var(--brand-accent)'}}>code</span>
                </div>
                <div style={{fontWeight: 700, fontSize: 20, marginBottom: 6}}>Codeplex Software</div>
                <div style={{fontSize: 13, color:'rgba(255,255,255,.7)', lineHeight: 1.5}}>Suite cloud contable y tributaria · LATAM · Más de 50,000 empresas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Equipo */}
    <section>
      <div className="container">
        <SectionHeader eyebrow="Nuestro equipo" title="Las personas detrás de DGD" desc="Consultores contables, tecnológicos y de soporte. Personas reales, en tu zona horaria."/>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap: 20}}>
          {[
            {name:'Pendiente', role:'CEO / Fundador/a', init:'··', c:'#14B8A6'},
            {name:'Pendiente', role:'Director de Implementación', init:'··', c:'#3B82F6'},
            {name:'Pendiente', role:'Líder Implementación', init:'··', c:'#8B5CF6'},
            {name:'Pendiente', role:'Consultor Contable Senior', init:'··', c:'#F59E0B'},
            {name:'Pendiente', role:'Especialista GestiónPlex', init:'··', c:'#EC4899'},
            {name:'Pendiente', role:'Head of Growth', init:'··', c:'#10B981'},
            {name:'Pendiente', role:'Contador Senior', init:'··', c:'#6366F1'},
            {name:'Pendiente', role:'Soporte Nivel 2', init:'··', c:'#EF4444'},
          ].map((p,i)=>(
            <div key={i} style={{textAlign:'center', padding: 20}}>
              <div style={{width: 120, height: 120, margin:'0 auto 14px', borderRadius: 24, background: `linear-gradient(135deg, ${p.c}, color-mix(in srgb, ${p.c} 55%, black))`, color:'white', display:'grid', placeItems:'center', fontWeight: 700, fontSize: 36, letterSpacing:'-0.03em', boxShadow:'var(--shadow)'}}>
                {p.init}
              </div>
              <div style={{fontWeight: 700, fontSize: 15}}>{p.name}</div>
              <div style={{fontSize: 12.5, color:'var(--ink-500)', marginTop: 3}}>{p.role}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center', marginTop: 24, fontSize: 13, color:'var(--ink-500)'}} className="mono">// placeholder · nombres, cargos y fotos del equipo pendientes de datos reales</div>
      </div>
    </section>

    {/* Datos de constitución */}
    <section className="section-alt">
      <div className="container" style={{maxWidth: 900}}>
        <SectionHeader eyebrow="Transparencia" title="Datos de constitución"/>
        <div className="card" style={{padding: 32, borderRadius: 18}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 24}}>
            {[
              {l:'Razón social', v:'DGD Enterprise · pendiente'},
              {l:'RUC', v:'Pendiente de dato real'},
              {l:'Partida registral', v:'Pendiente'},
              {l:'Fecha de constitución', v:'Pendiente'},
              {l:'Domicilio fiscal', v:'Pendiente'},
              {l:'Representante legal', v:'Pendiente'},
            ].map((r,i)=>(
              <div key={i}>
                <div style={{fontSize: 12, color:'var(--ink-500)', fontWeight: 600, textTransform:'uppercase', letterSpacing:'.06em', marginBottom: 4}}>{r.l}</div>
                <div style={{fontSize: 15, color:'var(--ink-900)', fontWeight: 500}}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <CTAPanel title="¿Hablamos?" desc="Conoce al equipo, entiende cómo trabajamos y decide si somos el partner correcto para tu empresa." primary="Agendar conversación" onPrimary={()=>nav('contacto')}/>
  </div>
);

window.NosotrosPage = NosotrosPage;
