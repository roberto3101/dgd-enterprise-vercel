// Shared UI primitives

const Btn = ({ children, variant='primary', size, className='', onClick, href, type, ...rest }) => {
  const cls = `btn btn-${variant}${size==='lg'?' btn-lg':''}${size==='sm'?' btn-sm':''} ${className}`;
  if (href) return <a href={href} className={cls} onClick={onClick} {...rest}>{children}</a>;
  return <button type={type||'button'} className={cls} onClick={onClick} {...rest}>{children}</button>;
};

const Badge = ({children, variant='accent', className=''}) => (
  <span className={`badge ${variant==='primary'?'badge-primary':''} ${variant==='warn'?'badge-warn':''} ${variant==='pop'?'badge-pop':''} ${className}`}>{children}</span>
);

const Eyebrow = ({children}) => <div className="eyebrow">{children}</div>;

const SectionHeader = ({eyebrow, title, desc, align='center', style={}}) => (
  <div className="section-header" style={{textAlign: align, margin: align==='left'?'0 0 48px':'0 auto 56px', ...style}}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2>{title}</h2>
    {desc && <p>{desc}</p>}
  </div>
);

// Accordion FAQ
const FAQ = ({items}) => {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{display:'flex', flexDirection:'column', gap: 10}}>
      {items.map((it, i) => (
        <div key={i} className="card" style={{padding: 0, borderRadius: 14, overflow:'hidden'}}>
          <button onClick={()=>setOpen(open===i?-1:i)} style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding: '20px 24px', textAlign:'left', fontWeight: 600, fontSize: 16, color: 'var(--ink-900)'}}>
            <span>{it.q}</span>
            <Icon name="plus" size={18} style={{transition:'transform .2s', transform: open===i?'rotate(45deg)':'none', color:'var(--brand-accent)'}} />
          </button>
          <div style={{maxHeight: open===i?400:0, overflow:'hidden', transition:'max-height .3s ease'}}>
            <div style={{padding: '0 24px 22px', color: 'var(--ink-500)', fontSize: 15, lineHeight: 1.7}}>{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Simple toggle
const Toggle = ({checked, onChange, label, labelRight}) => (
  <label style={{display:'inline-flex', alignItems:'center', gap: 12, cursor:'pointer', userSelect:'none'}}>
    {label && <span style={{fontSize: 14, fontWeight: 600, color: checked?'var(--ink-500)':'var(--ink-900)'}}>{label}</span>}
    <button type="button" role="switch" aria-checked={checked} onClick={()=>onChange(!checked)} style={{
      width: 44, height: 26, borderRadius: 999, background: checked?'var(--brand-accent)':'var(--ink-300)',
      position:'relative', transition:'all .2s', padding: 0
    }}>
      <span style={{position:'absolute', top: 3, left: checked?21:3, width: 20, height: 20, borderRadius: '50%', background:'white', transition: 'left .2s', boxShadow:'0 1px 3px rgba(0,0,0,.2)'}}/>
    </button>
    {labelRight && <span style={{fontSize: 14, fontWeight: 600, color: checked?'var(--ink-900)':'var(--ink-500)'}}>{labelRight}</span>}
  </label>
);

// Toast
const ToastContext = React.createContext(null);
const ToastProvider = ({children}) => {
  const [toasts, setToasts] = React.useState([]);
  const push = (msg, type='success') => {
    const id = Math.random();
    setToasts(t => [...t, {id, msg, type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)), 3800);
  };
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div style={{position:'fixed', top: 88, right: 24, zIndex: 150, display:'flex', flexDirection:'column', gap: 10}}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background:'var(--bg)', border:'1px solid var(--ink-200)', borderRadius: 12,
            padding:'12px 18px', boxShadow:'var(--shadow-lg)', display:'flex', alignItems:'center', gap: 10,
            animation:'slideInR .25s ease-out', minWidth: 260
          }}>
            <div style={{width: 28, height: 28, borderRadius:'50%', background: t.type==='success'?'var(--brand-accent)':'#EF4444', color:'white', display:'grid', placeItems:'center'}}>
              <Icon name={t.type==='success'?'check':'x'} size={16} strokeWidth={2.5}/>
            </div>
            <span style={{fontSize: 14, fontWeight: 500}}>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
const useToast = () => React.useContext(ToastContext);

// CTA panel (reusable bottom CTA)
const CTAPanel = ({title, desc, primary='Solicitar demo gratis', onPrimary, secondary, onSecondary}) => (
  <section style={{padding: '72px 0'}}>
    <div className="container">
      <div style={{
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, var(--brand-primary) 0%, #1E3A5F 60%, var(--brand-accent-2) 120%)',
        padding: '72px 48px', color: 'white', position:'relative', overflow:'hidden'
      }}>
        <div style={{position:'absolute', right: -80, top: -80, width: 360, height: 360, borderRadius:'50%', background:'radial-gradient(circle, color-mix(in srgb, var(--brand-accent) 50%, transparent) 0%, transparent 70%)'}}/>
        <div style={{position:'absolute', left: -40, bottom: -40, width: 220, height: 220, borderRadius:'50%', border: '1px solid rgba(255,255,255,.15)'}}/>
        <div style={{position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap: 32}}>
          <div style={{maxWidth: 560}}>
            <h2 style={{color:'white', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)'}}>{title}</h2>
            {desc && <p style={{color:'rgba(255,255,255,.82)', marginTop: 14, fontSize: 17}}>{desc}</p>}
          </div>
          <div className="row">
            <Btn variant="primary" size="lg" onClick={onPrimary}>{primary} <Icon name="arrow" size={18}/></Btn>
            {secondary && <Btn variant="outline" size="lg" onClick={onSecondary} style={{background:'transparent', color:'white', borderColor:'rgba(255,255,255,.3)'}}>{secondary}</Btn>}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Logo
const Logo = ({size=32}) => (
  <div className="logo">
    <div className="logo-mark" style={{width: size, height: size, fontSize: size*0.47}}>D</div>
    <span>DGD<span style={{color:'var(--brand-accent)'}}>.</span>enterprise</span>
  </div>
);

// Stripe pattern placeholder (for images we can't draw)
const StripePlaceholder = ({label, ratio='16/9', style={}}) => (
  <div style={{
    aspectRatio: ratio, borderRadius: 12, position:'relative', overflow:'hidden',
    background: 'repeating-linear-gradient(135deg, var(--ink-100) 0 10px, var(--ink-50) 10px 20px)',
    display:'grid', placeItems:'center',
    ...style
  }}>
    {label && <span className="mono" style={{fontSize: 12, color:'var(--ink-500)', padding:'6px 12px', background:'var(--bg)', borderRadius: 8, border:'1px solid var(--ink-200)'}}>{label}</span>}
  </div>
);

// Animated counter
const Counter = ({end, suffix='', prefix='', duration=1600}) => {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(()=>{
    let started = false;
    const io = new IntersectionObserver(([e])=>{
      if (e.isIntersecting && !started) {
        started = true;
        const t0 = performance.now();
        const step = (now) => {
          const p = Math.min(1, (now-t0)/duration);
          setVal(Math.floor(end * (1 - Math.pow(1-p, 3))));
          if (p<1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, {threshold: .3});
    if (ref.current) io.observe(ref.current);
    return ()=>io.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{val.toLocaleString('es-PE')}{suffix}</span>;
};

Object.assign(window, {Btn, Badge, Eyebrow, SectionHeader, FAQ, Toggle, ToastProvider, useToast, CTAPanel, Logo, StripePlaceholder, Counter});

// small animations CSS
const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes slideInR { from {opacity:0; transform: translateX(20px);} to {opacity:1; transform: translateX(0);} }
@keyframes floatY { 0%,100%{transform: translateY(0);} 50%{transform: translateY(-8px);} }
`;
document.head.appendChild(styleEl);
