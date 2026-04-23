# Grupo DGD — Guía de assets y librerías

## Assets que debes colocar tú (archivos binarios)

El agente no puede guardar archivos binarios desde el chat. Por favor guarda:

1. **`public/logo.png`** — el logo oficial de Grupo DGD (el que me enviaste).
   Recomendado: PNG con fondo transparente, 400px de alto mínimo.
   Si falta, el componente `Logo.astro` cae en un SVG fallback generado con
   los colores de marca (navy + dorado).

2. **`public/favicon.png`** — ícono 512×512 de la marca (recorte de la parte
   circular del logo). Si falta, el navegador mostrará el favicon por defecto.

3. **(opcional) `public/videos/hero.mp4`** — si quieres un video propio en el
   hero. Ahora uso un video libre-de-derechos de Pexels (cdn público). Para
   reemplazarlo, cambia la variable `heroVideo` en
   `src/componentes/inicio/Hero.astro`.

---

## Paleta de colores (tokens CSS)

Editables en `src/estilos/global.css`:

- **Navy 900** `#041A2E` · **Navy 800** `#072540` · **Navy 700** `#0E3A5F` (primario)
- **Gold 500** `#D4AF37` · **Gold 700** `#B78B2B` · **Gold 400** `#E8C873` (acento dorado sutil)

Dark mode: automático por `prefers-color-scheme`, persiste en `localStorage`
con toggle en el navbar.

---

## Librerías y técnicas integradas (todas de CDN, sin npm extra)

| Feature | Librería / técnica | Archivo |
|---|---|---|
| Transiciones entre páginas | **Astro View Transitions** (`<ClientRouter />`, nativo) | `Principal.astro` |
| Smooth scroll | **Lenis** (Studio Freight, MIT) · via Skypack CDN | `Principal.astro` |
| Scroll reveal | `IntersectionObserver` vanilla + `[data-reveal]` | `global.css` + `Principal.astro` |
| Dark/Light mode | Toggle vanilla + `localStorage` + CSS vars | `BarraNavegacion.astro` |
| Glass morphism | `backdrop-filter: blur(18px) saturate(160%)` | clase `.glass` |
| Gradient border animado | Inspirado en Aceternity UI | clase `.gradient-border` |
| Marquee infinito | CSS keyframes + mask | clase `.marquee` |
| Button shine | Inspirado en Magic UI `ShinyButton` | clase `.btn-shine` |
| Video de fondo | Pexels (license: free for commercial use) | `Hero.astro` |
| Tipografía serif acento | **Fraunces** (Google Fonts, OFL) | `Principal.astro` |

### Motion respetado
Todos los efectos se desactivan automáticamente con
`@media (prefers-reduced-motion: reduce)`.

---

## Datos y fuentes

Todo lo que se muestra en el sitio viene de:

- **`src/datos/{es,en}/*.json`** — contenido editorial
- **Fuente única para data de producto**: `codeplex.pe`
  - Precios ContaPlex/GestiónPlex/Facturación
  - Feature lists por tier (módulos)
  - Resultados documentados (40% / 35% / 70% / 60%)
  - Teléfonos: +51 936 343 607 (ventas) · +51 905 463 261 (soporte)
  - Email: ventas@codeplex.pe · soporte@codeplex.pe
  - Dirección: Av. Los Próceres Mza. G3 Lote 11, Los Olivos, Lima
  - Horario: Lun–Vie 8–18 · Sáb 8–14

**Grupo DGD Enterprises & Systems Perú SAC** figura como
*partner autorizado / reseller* de Codeplex en Perú. No se inventan años de
fundación, testimonios, clientes, ni métricas propias. El dashboard del hero
está explícitamente etiquetado como "Vista demo".

---

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # build producción
npm run preview  # preview local del build
```
