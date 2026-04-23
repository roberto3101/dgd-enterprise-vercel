// Tweaks panel

const TweaksPanel = ({tweaks, setTweak, onClose}) => {
  const Row = ({label, children}) => (
    <div style={{display:'flex', flexDirection:'column', gap: 8, paddingBottom: 14, borderBottom:'1px solid var(--ink-200)', marginBottom: 14}}>
      <label style={{fontSize: 12, fontWeight: 700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--ink-500)'}}>{label}</label>
      {children}
    </div>
  );
  const colorRow = (key, opts) => (
    <div style={{display:'flex', gap: 6}}>
      {opts.map(c => (
        <button key={c} onClick={()=>setTweak(key, c)} style={{width: 30, height: 30, borderRadius: 8, background: c, border: tweaks[key]===c?'2px solid var(--ink-900)':'2px solid var(--ink-200)', cursor:'pointer'}}/>
      ))}
    </div>
  );
  return (
    <div style={{position:'fixed', right: 24, bottom: 100, zIndex: 95, width: 320, background:'var(--bg)', border:'1px solid var(--ink-200)', borderRadius: 16, boxShadow:'var(--shadow-xl)', padding: 20, maxHeight:'78vh', overflow:'auto'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 16}}>
        <h4 style={{fontSize: 15, fontWeight: 700}}>Tweaks</h4>
        <button onClick={onClose} style={{width: 28, height: 28, borderRadius: 8, background:'var(--ink-100)'}}><Icon name="x" size={14}/></button>
      </div>
      <Row label="Primary color">{colorRow('primaryColor', ['#0A2540','#0B2A4A','#1E3A8A','#0F172A','#111827'])}</Row>
      <Row label="Accent color">{colorRow('accentColor', ['#14B8A6','#10B981','#059669','#F59E0B','#6366F1'])}</Row>
      <Row label="Font">
        <div style={{display:'flex', flexDirection:'column', gap: 6}}>
          {['Inter','IBM Plex Sans','Space Grotesk','JetBrains Mono'].map(f=>(
            <button key={f} onClick={()=>setTweak('fontFamily', f)} style={{padding:'8px 12px', borderRadius: 8, textAlign:'left', fontFamily: f, fontSize: 14, background: tweaks.fontFamily===f?'var(--ink-900)':'var(--bg)', color: tweaks.fontFamily===f?'var(--bg)':'var(--ink-700)', border:'1px solid var(--ink-200)'}}>{f}</button>
          ))}
        </div>
      </Row>
      <Row label={`Radius · ${tweaks.radius}px`}>
        <input type="range" min="0" max="24" value={tweaks.radius} onChange={e=>setTweak('radius', +e.target.value)} style={{width:'100%'}}/>
      </Row>
      <Row label="Density">
        <div style={{display:'flex', gap: 6}}>
          {['compact','comfortable','spacious'].map(d=>(
            <button key={d} onClick={()=>setTweak('density', d)} style={{flex: 1, padding:'8px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: tweaks.density===d?'var(--ink-900)':'var(--bg)', color: tweaks.density===d?'var(--bg)':'var(--ink-700)', border:'1px solid var(--ink-200)'}}>{d}</button>
          ))}
        </div>
      </Row>
      <Row label="Hero variant">
        <div style={{display:'flex', gap: 6}}>
          {['dashboard','abstract'].map(d=>(
            <button key={d} onClick={()=>setTweak('heroVariant', d)} style={{flex: 1, padding:'8px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: tweaks.heroVariant===d?'var(--ink-900)':'var(--bg)', color: tweaks.heroVariant===d?'var(--bg)':'var(--ink-700)', border:'1px solid var(--ink-200)'}}>{d}</button>
          ))}
        </div>
      </Row>
      <Row label="Theme">
        <Toggle checked={tweaks.dark} onChange={v=>setTweak('dark', v)} label="Light" labelRight="Dark"/>
      </Row>
    </div>
  );
};

window.TweaksPanel = TweaksPanel;
