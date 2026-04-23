// Mock data + dashboard mocks

const PRODUCTS = {
  contaplex: {
    slug: 'contaplex',
    name: 'ContaPlex',
    tagline: 'Contabilidad cloud integrada con SUNAT',
    icon: 'calc',
    color: '#14B8A6',
    bullets: ['SIRE · PLE · libros electrónicos', 'Estados financieros y análisis', 'Multi-empresa y multi-usuario'],
    hero: 'La contabilidad de tu PYME, ordenada y al día con SUNAT',
    heroDesc: 'Automatiza registros, genera libros electrónicos válidos y presenta tus reportes sin tocar un Excel. ContaPlex hace el trabajo pesado; tú decides.',
    features: [
      {icon:'sync', title:'Automatización ingresos/gastos', desc:'Conciliación bancaria automática con bancos peruanos.'},
      {icon:'chart', title:'Reportes en tiempo real', desc:'KPIs financieros actualizados al segundo.'},
      {icon:'shield', title:'Integración SUNAT', desc:'SIRE, RCE y RVIE — envíos y validaciones en un clic.'},
      {icon:'book', title:'Libros electrónicos', desc:'Compras, Ventas, Caja, Diario y Mayor listos.'},
      {icon:'check', title:'Validación PLE', desc:'Revisa y corrige antes de presentar a SUNAT.'},
      {icon:'file', title:'Estados financieros', desc:'Balance, EE.RR. y flujo de caja automáticos.'},
      {icon:'target', title:'Análisis de rentabilidad', desc:'Por centro de costo, línea o proyecto.'},
      {icon:'lock', title:'Cifrado bancario', desc:'Tu data protegida con cifrado AES-256.'},
    ],
    plans: [
      {name:'Estándar', price:50, empresas:5, desc:'Registros básicos, PLE, generación de diario', features:['Voucher contable','Registros ilimitados','Usuarios ilimitados','Parametrización base','Soporte email']},
      {name:'Business', price:100, empresas:15, desc:'Validación PLE, saldos iniciales, consultas avanzadas', popular: true, features:['Todo lo de Estándar','Validación PLE','Saldos iniciales','Consultas avanzadas','Soporte WhatsApp']},
      {name:'Gold', price:300, empresas:50, desc:'Activos fijos, retenciones, estados financieros completos', features:['Todo lo de Business','Activos fijos','Retenciones','EE.FF. completos','Soporte dedicado']},
    ],
    faq: [
      {q:'¿ContaPlex está autorizado ante SUNAT?', a:'Sí. ContaPlex cumple con todas las especificaciones de SUNAT para libros electrónicos, SIRE, RCE y RVIE. Está en la lista oficial de software homologado.'},
      {q:'¿Puedo migrar mi información desde otro sistema?', a:'Sí. Nuestro equipo hace la migración contigo: traemos tus saldos, registros históricos, maestro de cuentas y configuración. Sin costo adicional en los planes Business y Gold.'},
      {q:'¿Incluye capacitación para mi equipo?', a:'Siempre. Toda implementación incluye 3 sesiones de capacitación en vivo con tu contador y personal administrativo, más acceso ilimitado a la DGD Academy online.'},
      {q:'¿Qué pasa si SUNAT saca una nueva normativa?', a:'Codeplex actualiza el sistema automáticamente. Tú no tienes que hacer nada — las actualizaciones se despliegan en la nube sin interrumpir tu operación.'},
      {q:'¿Cómo protegen mi información contable?', a:'Servidores en AWS región Perú/Brasil, cifrado AES-256 en tránsito y en reposo, backups automáticos cada 6 horas y retención de 90 días.'},
      {q:'¿Hacen backups automáticos?', a:'Sí. Backups cada 6 horas con retención de 90 días. Puedes descargar tus respaldos cuando quieras desde tu panel.'},
      {q:'¿Cómo se cobran las actualizaciones?', a:'Incluidas. Todas las actualizaciones de ContaPlex, incluyendo cambios normativos y nuevas funcionalidades, están cubiertas por tu plan mensual.'},
      {q:'¿Puedo cancelar cuando quiera?', a:'Sí, sin letra chica. Cancelas con 30 días de aviso y puedes exportar toda tu información en formatos estándar (Excel, XML, PDF).'},
    ],
  },
  gestionplex: {
    slug: 'gestionplex',
    name: 'GestiónPlex',
    tagline: 'Logística, inventarios, POS y restaurante',
    icon: 'box',
    color: '#3B82F6',
    bullets: ['Inventarios multi-almacén', 'POS y módulo restaurante', 'App móvil para vendedores'],
    hero: 'Tu operación entera, desde el almacén hasta la caja',
    heroDesc: 'Inventarios, compras, ventas, producción y restaurante en una sola plataforma. Desde la laptop del gerente hasta el celular del vendedor.',
    features: [
      {icon:'database', title:'Inventarios multi-almacén', desc:'Stock en tiempo real por almacén y sucursal.'},
      {icon:'building', title:'Almacenes y sucursales', desc:'Controla ubicaciones, bins y transferencias.'},
      {icon:'send', title:'Envíos en tiempo real', desc:'Guías de remisión electrónicas y tracking.'},
      {icon:'shop', title:'Compras, ventas, transferencias', desc:'Órdenes, recepciones y movimientos integrados.'},
      {icon:'users', title:'Vendedores', desc:'Metas, comisiones y rutas asignadas.'},
      {icon:'download', title:'Importación masiva', desc:'Sube tu catálogo desde Excel en minutos.'},
      {icon:'utensils', title:'Módulo restaurante', desc:'Salones, mesas, cocina y delivery integrados.'},
      {icon:'wallet', title:'Tesorería y cajas', desc:'Arqueos, flujo de caja y conciliación.'},
      {icon:'settings', title:'Producción', desc:'Recetas, órdenes de producción y costeo.'},
      {icon:'phoneSmall', title:'App móvil', desc:'iOS y Android para vendedores y supervisores.'},
    ],
    plans: [
      {name:'Estándar', price:100, empresas:'1 almacén', desc:'Configuración base, POS, vendedores', features:['Comprobantes con logo','Impresiones A4/A5/80mm/57mm','Importación de productos','Registro de vendedores','Importación de inventarios']},
      {name:'Business', price:150, empresas:'2 almacenes', desc:'Compras, ventas, transferencias', features:['Todo lo de Estándar','Compras y ventas','Transferencias entre almacenes','Multi-caja','Soporte WhatsApp']},
      {name:'Premium', price:200, empresas:'3 almacenes', desc:'Tesorería, restaurante, reportes', popular:true, features:['Todo lo de Business','Tesorería completa','Módulo restaurante','Reportes avanzados','App móvil']},
      {name:'Gold', price:300, empresas:'4 almacenes', desc:'Producción, rentabilidad, todo incluido', features:['Todo lo de Premium','Producción','Análisis de rentabilidad','Integraciones API','Soporte dedicado']},
    ],
    faq: [
      {q:'¿Funciona para restaurantes con varios salones?', a:'Sí. GestiónPlex soporta múltiples salones, mapa de mesas, envío a cocina por estación y delivery integrado.'},
      {q:'¿Puedo usarlo sin internet en el POS?', a:'El POS tiene modo offline para ventas. Sincroniza automáticamente cuando vuelve la conexión.'},
      {q:'¿Cuántos usuarios puedo tener?', a:'Todos los planes incluyen usuarios ilimitados. Solo pagas por almacenes activos.'},
      {q:'¿Maneja series y lotes para productos?', a:'Sí, GestiónPlex maneja series, lotes, fechas de vencimiento y trazabilidad completa.'},
      {q:'¿Se integra con mi ContaPlex?', a:'Integración nativa. Las ventas generan asientos contables automáticamente.'},
      {q:'¿Funciona con código de barras?', a:'Sí, lectores USB, Bluetooth e integrados en la app móvil.'},
      {q:'¿Hacen la migración desde mi sistema actual?', a:'Sí. Migración de catálogo, stock inicial, clientes y proveedores sin costo en Premium y Gold.'},
      {q:'¿Puedo cancelar cuando quiera?', a:'Sí, con 30 días de aviso. Te exportamos toda tu data en Excel.'},
    ],
  },
  'facturacion-sunat': {
    slug: 'facturacion-sunat',
    name: 'Facturación SUNAT',
    tagline: 'Boletas, facturas y guías válidas',
    icon: 'receipt',
    color: '#8B5CF6',
    bullets: ['Certificado digital incluido', 'Envío automático XML/PDF/CDR', 'Integra con ContaPlex y GestiónPlex'],
    hero: 'Facturación electrónica SUNAT, sin dramas',
    heroDesc: 'Emite, envía y archiva boletas, facturas y guías válidas. Con certificado digital incluido y envío automático al cliente por email o WhatsApp.',
    features: [
      {icon:'receipt', title:'Boletas y facturas', desc:'Electrónicas, válidas ante SUNAT al instante.'},
      {icon:'send', title:'Guías de remisión', desc:'Electrónicas, con tracking y validación automática.'},
      {icon:'file', title:'Notas de crédito y débito', desc:'Emisión y rectificativas guiadas.'},
      {icon:'sync', title:'Envío automático SUNAT', desc:'XML, PDF y CDR enviados en segundos.'},
      {icon:'shield', title:'Certificado digital incluido', desc:'Sin trámites extra — lo gestionamos por ti.'},
      {icon:'mail', title:'Distribución al cliente', desc:'Email y WhatsApp con XML, PDF y CDR.'},
      {icon:'link', title:'Integra con tu stack', desc:'ContaPlex, GestiónPlex o tu ERP por API.'},
      {icon:'bars', title:'Reportes y conciliación', desc:'Todo tu libro de ventas en tiempo real.'},
    ],
    plans: [
      {name:'Business', price:50, empresas:'1 sucursal', desc:'Facturación base con certificado digital', features:['Comprobantes con logo','Impresiones A4/A5/80mm/57mm','Importación de productos','Importación de precios','Registro de vendedores']},
      {name:'Premium', price:150, empresas:'2 sucursales', desc:'Ventas avanzadas, soporte extendido', popular:true, features:['Todo lo de Business','Características de ventas','Características de soporte','Multi-usuario','Soporte WhatsApp']},
      {name:'Gold', price:200, empresas:'4 sucursales', desc:'Todo incluido, ventas y soporte completos', features:['Todo lo de Premium','Usuarios ilimitados','Multi-sucursal','Implementación prioritaria','Soporte dedicado']},
    ],
    faq: [
      {q:'¿Cómo funciona el certificado digital?', a:'Lo gestionamos por ti ante una entidad certificadora autorizada. Está incluido en todos los planes sin cargo adicional.'},
      {q:'¿Qué pasa si SUNAT rechaza un comprobante?', a:'El sistema te notifica inmediatamente con el motivo y te guía para corregir y reenviar.'},
      {q:'¿Puedo enviar por WhatsApp?', a:'Sí. Cada emisión puede dispararse automáticamente por email y WhatsApp al cliente con XML, PDF y CDR.'},
      {q:'¿Se integra con mi ERP?', a:'Tenemos API REST completa. También integración nativa con ContaPlex y GestiónPlex.'},
      {q:'¿Guarda los comprobantes por 5 años?', a:'Sí. Almacenamiento permanente de XML, PDF y CDR cumpliendo los requisitos tributarios.'},
      {q:'¿Tienen plan para alto volumen?', a:'Gold soporta emisión masiva sin límite. Para casos especiales (más de 500k/mes) ofrecemos planes enterprise.'},
      {q:'¿Puedo emitir desde el celular?', a:'Sí, la app móvil permite emisión, consulta y reenvío desde iOS y Android.'},
      {q:'¿Puedo cancelar cuando quiera?', a:'Sí, con 30 días de aviso. Exportamos todos tus comprobantes históricos.'},
    ],
  },
};

// Solo contenido verificable o anónimo-por-industria.
// Las métricas numéricas provienen del sitio oficial codeplex.pe (vendor claims).
// Los "casos" son anónimos por industria hasta que DGD sume clientes reales con autorización.

const CASOS = [
  {industry:'Distribución mayorista', company:'Caso por industria', metric:'—', kpi:'Próximamente con cliente real', desc:'Estamos preparando un caso documentado con una empresa de distribución que migró a ContaPlex + GestiónPlex. Publicaremos métricas reales con autorización escrita del cliente.', size:'PYME', city:'Perú', tag:'Próximamente'},
  {industry:'Servicios generales y transporte', company:'Caso académico publicado', metric:'Estudio', kpi:'Universidad Privada del Norte (2023)', desc:'Investigación académica sobre uso del software contable Codeplex y desempeño de tareas en una empresa de servicios generales y transportes. Publicación disponible en Dialnet/UPN.', size:'N/D', city:'Perú', tag:'Investigación', link:'https://dialnet.unirioja.es/servlet/articulo?codigo=10013945'},
  {industry:'Retail · multi-mercado', company:'Caso público Codeplex', metric:'—', kpi:'Testimonio Harris Ubal · Gago Multimercado', desc:'Testimonio público de gerencia general sobre simplificación del proceso de facturación y seguimiento de pagos tras implementar el sistema. Fuente: contaplex.com.', size:'N/D', city:'Perú', tag:'Testimonio público', link:'https://contaplex.com/'},
];

// Único testimonio VERIFICABLE: publicado por Codeplex/Contaplex en su web oficial.
const TESTIMONIALS = [
  {name:'Harris Ubal', role:'Gerente General', company:'Gago Multimercado', quote:'El sistema simplificó por completo la creación y seguimiento de facturas. La interfaz es intuitiva y el seguimiento de pagos ayuda al control del flujo de efectivo.', init:'HU', source:'contaplex.com', sourceUrl:'https://contaplex.com/'},
];

// Blog vacío a propósito. DGD publicará artículos propios.
const BLOG_POSTS = [];

// Dashboard mock — renders a fake ContaPlex dashboard UI
const DashMock = ({variant='contaplex'}) => {
  if (variant === 'gestionplex') return <GestionDash/>;
  if (variant === 'facturacion') return <FacturacionDash/>;
  return <ContaDash/>;
};

const ContaDash = () => (
  <div className="dash" style={{fontFamily:'var(--font)'}}>
    <div className="dash-chrome">
      <div className="dash-dot r"/><div className="dash-dot y"/><div className="dash-dot g"/>
      <div className="dash-url">app.contaplex.pe/dashboard</div>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'180px 1fr', minHeight: 420, background:'var(--bg)'}}>
      <aside style={{background:'var(--ink-50)', borderRight:'1px solid var(--ink-200)', padding: 16}}>
        <div style={{display:'flex', alignItems:'center', gap: 8, marginBottom: 24}}>
          <div style={{width: 24, height: 24, borderRadius: 6, background:'var(--brand-accent)', display:'grid', placeItems:'center', color:'white', fontSize: 12, fontWeight: 800}}>C</div>
          <span style={{fontWeight: 700, fontSize: 14}}>ContaPlex</span>
        </div>
        {['Dashboard','Ingresos','Gastos','Libros electrónicos','SIRE','PLE','Reportes','Empresas'].map((x,i)=>(
          <div key={x} style={{padding:'8px 10px', fontSize: 13, borderRadius: 6, marginBottom: 2, background: i===0?'var(--bg)':'transparent', color: i===0?'var(--ink-900)':'var(--ink-500)', fontWeight: i===0?600:500, display:'flex', alignItems:'center', gap: 8}}>
            <div style={{width: 6, height: 6, borderRadius: 2, background: i===0?'var(--brand-accent)':'var(--ink-300)'}}/>
            {x}
          </div>
        ))}
      </aside>
      <main style={{padding: 20}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 16}}>
          <div>
            <div style={{fontSize: 11, color:'var(--ink-500)', textTransform:'uppercase', letterSpacing:'.08em', fontWeight: 600}}>Vista demo · Panel contable</div>
            <div style={{fontSize: 18, fontWeight: 700, marginTop: 2}}>Panel contable</div>
          </div>
          <div style={{display:'flex', gap: 6}}>
            <div style={{padding:'5px 10px', background:'color-mix(in srgb, var(--brand-accent) 15%, transparent)', color:'var(--brand-accent-2)', borderRadius: 6, fontSize: 11, fontWeight: 600}}>✓ PLE validado</div>
            <div style={{padding:'5px 10px', background:'var(--ink-100)', color:'var(--ink-700)', borderRadius: 6, fontSize: 11, fontWeight: 600}}>SIRE listo</div>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 10, marginBottom: 14}}>
          {[
            {label:'Ingresos', val:'S/ 485,230', delta:'+12.4%'},
            {label:'Gastos', val:'S/ 312,180', delta:'-3.1%'},
            {label:'Utilidad', val:'S/ 173,050', delta:'+28.7%'},
          ].map(s=>(
            <div key={s.label} style={{padding: 12, border:'1px solid var(--ink-200)', borderRadius: 8}}>
              <div style={{fontSize: 10, color:'var(--ink-500)', textTransform:'uppercase', fontWeight: 600, letterSpacing:'.06em'}}>{s.label}</div>
              <div style={{fontSize: 18, fontWeight: 700, margin: '4px 0'}}>{s.val}</div>
              <div style={{fontSize: 11, color: s.delta.startsWith('+')?'var(--brand-accent-2)':'#EF4444', fontWeight: 600}}>{s.delta} vs marzo</div>
            </div>
          ))}
        </div>
        {/* Mini chart */}
        <div style={{padding: 14, border:'1px solid var(--ink-200)', borderRadius: 8}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom: 10}}>
            <div style={{fontSize: 12, fontWeight: 600}}>Flujo mensual · S/</div>
            <div style={{fontSize: 11, color:'var(--ink-500)'}}>Últimos 6 meses</div>
          </div>
          <svg viewBox="0 0 300 90" style={{width:'100%', height: 90}}>
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#14B8A6" stopOpacity=".35"/>
                <stop offset="1" stopColor="#14B8A6" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,70 L50,55 L100,60 L150,40 L200,45 L250,25 L300,30 L300,90 L0,90 Z" fill="url(#g1)"/>
            <path d="M0,70 L50,55 L100,60 L150,40 L200,45 L250,25 L300,30" fill="none" stroke="#14B8A6" strokeWidth="2"/>
            {[70,55,60,40,45,25,30].map((y,i)=>(<circle key={i} cx={i*50} cy={y} r="3" fill="white" stroke="#14B8A6" strokeWidth="2"/>))}
          </svg>
          <div style={{display:'flex', justifyContent:'space-between', fontSize: 10, color:'var(--ink-500)', marginTop: 6}}>
            <span>Nov</span><span>Dic</span><span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span>
          </div>
        </div>
      </main>
    </div>
  </div>
);

const GestionDash = () => (
  <div className="dash" style={{fontFamily:'var(--font)'}}>
    <div className="dash-chrome">
      <div className="dash-dot r"/><div className="dash-dot y"/><div className="dash-dot g"/>
      <div className="dash-url">app.gestionplex.pe/inventarios</div>
    </div>
    <div style={{padding: 24, background:'var(--bg)'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 18}}>
        <div>
          <div style={{fontSize: 11, color:'var(--ink-500)', textTransform:'uppercase', letterSpacing:'.08em', fontWeight: 600}}>Vista demo · Almacén Central</div>
          <div style={{fontSize: 18, fontWeight: 700, marginTop: 2}}>Inventario en tiempo real</div>
        </div>
        <div style={{padding:'6px 12px', background:'color-mix(in srgb, #3B82F6 15%, transparent)', color:'#1D4ED8', borderRadius: 6, fontSize: 12, fontWeight: 600}}>3 almacenes · 1,248 SKUs</div>
      </div>
      <div style={{border:'1px solid var(--ink-200)', borderRadius: 8, overflow:'hidden'}}>
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'10px 14px', background:'var(--ink-50)', fontSize: 11, fontWeight: 700, color:'var(--ink-500)', textTransform:'uppercase', letterSpacing:'.06em'}}>
          <div>Producto</div><div>Stock</div><div>Mínimo</div><div>Estado</div>
        </div>
        {[
          {p:'Pescado fresco · kg', s:'48.2 kg', m:'20 kg', ok:true},
          {p:'Limón · cajas', s:'12 cajas', m:'8 cajas', ok:true},
          {p:'Cebolla roja · kg', s:'6.5 kg', m:'15 kg', ok:false},
          {p:'Camote · cajas', s:'9 cajas', m:'5 cajas', ok:true},
          {p:'Choclo · unid', s:'145 unid', m:'50 unid', ok:true},
          {p:'Ají limo · kg', s:'1.8 kg', m:'4 kg', ok:false},
        ].map((r,i)=>(
          <div key={i} style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'10px 14px', borderTop:'1px solid var(--ink-100)', fontSize: 13, alignItems:'center'}}>
            <div style={{fontWeight: 500}}>{r.p}</div>
            <div className="mono">{r.s}</div>
            <div className="mono" style={{color:'var(--ink-500)'}}>{r.m}</div>
            <div><span style={{padding:'2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: r.ok?'color-mix(in srgb, var(--brand-accent) 15%, transparent)':'#FEE2E2', color: r.ok?'var(--brand-accent-2)':'#B91C1C'}}>{r.ok?'OK':'Reponer'}</span></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FacturacionDash = () => (
  <div className="dash" style={{fontFamily:'var(--font)'}}>
    <div className="dash-chrome">
      <div className="dash-dot r"/><div className="dash-dot y"/><div className="dash-dot g"/>
      <div className="dash-url">app.facturacion.pe/emitir</div>
    </div>
    <div style={{padding: 24, background:'var(--bg)', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20}}>
      <div>
        <div style={{fontSize: 11, color:'var(--ink-500)', textTransform:'uppercase', letterSpacing:'.08em', fontWeight: 600, marginBottom: 4}}>Nueva factura</div>
        <div style={{fontSize: 16, fontWeight: 700, marginBottom: 14}}>F001-00284</div>
        <div style={{display:'flex', flexDirection:'column', gap: 10}}>
          {[
            {l:'Cliente', v:'DEMO S.A.C.', sub:'RUC 20XXXXXXXXX'},
            {l:'Fecha emisión', v:'14/04/2026', sub:'Vence: 14/05/2026'},
            {l:'Moneda', v:'Soles · PEN', sub:'Tipo cambio: 3.72'},
          ].map(f=>(
            <div key={f.l} style={{padding: 10, border:'1px solid var(--ink-200)', borderRadius: 6}}>
              <div style={{fontSize: 11, color:'var(--ink-500)', fontWeight: 600, marginBottom: 2}}>{f.l}</div>
              <div style={{fontSize: 13, fontWeight: 600}}>{f.v}</div>
              <div style={{fontSize: 11, color:'var(--ink-500)'}}>{f.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{padding: 16, border:'2px solid var(--brand-accent)', borderRadius: 8, background:'color-mix(in srgb, var(--brand-accent) 6%, transparent)'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom: 12}}>
            <div>
              <div style={{fontSize: 10, color:'var(--ink-500)', fontWeight: 600, textTransform:'uppercase'}}>Total a facturar</div>
              <div style={{fontSize: 28, fontWeight: 800, color:'var(--brand-accent-2)'}}>S/ 14,580.00</div>
            </div>
            <div style={{padding:'4px 10px', background:'var(--brand-accent-2)', color:'white', borderRadius: 4, fontSize: 11, fontWeight: 700, height: 'fit-content'}}>✓ SUNAT OK</div>
          </div>
          <div style={{borderTop:'1px dashed var(--ink-300)', paddingTop: 10, fontSize: 12, color:'var(--ink-500)'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom: 3}}><span>Subtotal</span><span className="mono">S/ 12,355.93</span></div>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom: 3}}><span>IGV 18%</span><span className="mono">S/ 2,224.07</span></div>
            <div style={{display:'flex', justifyContent:'space-between', fontWeight: 700, color:'var(--ink-900)', marginTop: 6}}><span>Total</span><span className="mono">S/ 14,580.00</span></div>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 6, marginTop: 10}}>
          {['XML','PDF','CDR'].map(x=>(
            <div key={x} style={{padding: 8, border:'1px solid var(--ink-200)', borderRadius: 6, textAlign:'center', fontSize: 11, fontWeight: 600, color:'var(--ink-700)'}}>
              <div style={{fontSize: 16, color:'var(--brand-accent)'}}>✓</div>{x} enviado
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, {PRODUCTS, CASOS, TESTIMONIALS, BLOG_POSTS, DashMock, ContaDash, GestionDash, FacturacionDash});
