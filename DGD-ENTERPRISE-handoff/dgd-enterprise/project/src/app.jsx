// Main App

const { useState, useEffect } = React;

const useRoute = () => {
  const [route, setRoute] = useState(window.location.hash.replace(/^#\/?/, '') || '');
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#\/?/, ''));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const nav = (r) => {
    window.location.hash = `/${r}`;
    window.scrollTo({top: 0, behavior: 'instant'});
  };
  return [route, nav];
};

const applyTweaks = (t) => {
  const r = document.documentElement;
  r.style.setProperty('--brand-primary', t.primaryColor);
  // accent w/ darker variant
  r.style.setProperty('--brand-accent', t.accentColor);
  r.style.setProperty('--radius', `${t.radius}px`);
  r.style.setProperty('--radius-sm', `${Math.max(0, t.radius-4)}px`);
  r.style.setProperty('--radius-lg', `${t.radius+8}px`);
  r.style.setProperty('--radius-xl', `${t.radius+16}px`);
  r.style.setProperty('--font', `'${t.fontFamily}', -apple-system, sans-serif`);
  r.dataset.theme = t.dark ? 'dark' : 'light';
  const dens = t.density==='compact'?0.75: t.density==='spacious'?1.2: 1;
  r.style.setProperty('--density', dens);
};

const App = () => {
  const [route, nav] = useRoute();
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweakMode, setTweakMode] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showSTT, setShowSTT] = useState(false);
  const [pageKey, setPageKey] = useState(0);

  useEffect(() => { applyTweaks(tweaks); }, [tweaks]);

  useEffect(() => {
    setPageKey(k => k+1);
  }, [route]);

  useEffect(() => {
    const seen = localStorage.getItem('dgd_cookies');
    if (!seen) setTimeout(() => setShowCookies(true), 1200);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowSTT(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tweaks protocol
  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweakMode(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweakMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({type:'__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setTweak = (k, v) => {
    const next = {...tweaks, [k]: v};
    setTweaks(next);
    window.parent.postMessage({type:'__edit_mode_set_keys', edits: {[k]: v}}, '*');
  };

  const acceptCookies = () => {
    localStorage.setItem('dgd_cookies', '1');
    setShowCookies(false);
  };

  const renderPage = () => {
    if (route.startsWith('productos/')) {
      return <ProductPage slug={route.split('/')[1]} nav={nav} />;
    }
    if (route.startsWith('blog/')) {
      return <BlogPost slug={route.split('/')[1]} nav={nav} />;
    }
    if (route === 'planes') return <PlanesPage nav={nav} />;
    if (route === 'casos-de-exito') return <CasosPage nav={nav} />;
    if (route === 'blog') return <BlogPage nav={nav} />;
    if (route === 'nosotros') return <NosotrosPage nav={nav} />;
    if (route === 'contacto') return <ContactoPage nav={nav} />;
    return <HomePage nav={nav} heroVariant={tweaks.heroVariant} />;
  };

  return (
    <ToastProvider>
      <Nav route={route} nav={nav} />
      <div key={pageKey} className="page-loading" />
      <main key={`p${pageKey}`}>
        {renderPage()}
      </main>
      <Footer nav={nav} />

      {/* WhatsApp float */}
      <a className="wa-float" href="#" onClick={(e) => e.preventDefault()} aria-label="WhatsApp">
        <Icon name="whatsapp" size={28} />
        <span className="wa-tooltip">¿Hablamos por WhatsApp?</span>
      </a>

      {/* Scroll to top */}
      <button className={`stt ${showSTT ? 'visible' : ''}`} onClick={() => window.scrollTo({top: 0, behavior:'smooth'})} aria-label="Volver arriba">
        <Icon name="arrowUp" size={18} />
      </button>

      {/* Cookies */}
      <div className={`cookies ${showCookies ? 'visible' : ''}`}>
        <div style={{display:'flex', alignItems:'flex-start', gap: 12, marginBottom: 14}}>
          <div style={{fontSize: 22}}>🍪</div>
          <div>
            <div style={{fontWeight: 700, fontSize: 14, marginBottom: 4}}>Usamos cookies</div>
            <div style={{fontSize: 13, color:'var(--ink-500)', lineHeight: 1.5}}>Para mejorar tu experiencia y analizar el tráfico de nuestro sitio.</div>
          </div>
        </div>
        <div style={{display:'flex', gap: 8}}>
          <Btn variant="dark" size="sm" onClick={acceptCookies} style={{flex: 1, justifyContent:'center'}}>Aceptar todas</Btn>
          <Btn variant="outline" size="sm" onClick={acceptCookies} style={{flex: 1, justifyContent:'center'}}>Solo esenciales</Btn>
        </div>
      </div>

      {/* Tweaks panel */}
      {tweakMode && <TweaksPanel tweaks={tweaks} setTweak={setTweak} onClose={() => setTweakMode(false)} />}
    </ToastProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
