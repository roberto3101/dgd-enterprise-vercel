// ===== GSAP + ScrollTrigger + SplitType + CountUp + vanilla-tilt =====
// Sistema de animaciones unificado para Grupo DGD
// Se respeta prefers-reduced-motion en cada bloque.

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const loadScript = (src) => new Promise((res, rej) => {
  if (document.querySelector(`script[data-src="${src}"]`)) return res();
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  s.dataset.src = src;
  s.onload = () => res();
  s.onerror = () => rej(new Error('No load: ' + src));
  document.head.appendChild(s);
});

async function bootAnimations() {
  if (REDUCED) {
    document.querySelectorAll('[data-anim]').forEach(el => el.classList.add('anim-done'));
    return;
  }

  try {
    await Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/countup.js@2.8.0/dist/countUp.umd.js'),
      loadScript('https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js'),
    ]);
  } catch (e) {
    console.warn('Anim CDN fail, fallback:', e);
    document.querySelectorAll('[data-anim]').forEach(el => el.classList.add('anim-done'));
    return;
  }

  const { gsap } = window;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  // Sync con Lenis si existe
  if (window.__lenis) {
    window.__lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => window.__lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // ===== 1. HERO TITLE (slide sutil por palabras — sin blur, restraint) =====
  document.querySelectorAll('[data-anim="hero-title"]').forEach(el => {
    if (el.classList.contains('anim-done')) return;
    const split = new SplitType(el, { types: 'words', tagName: 'span' });
    gsap.set(split.words, { y: 18, opacity: 0 });
    gsap.to(split.words, {
      y: 0, opacity: 1,
      duration: 0.7, stagger: 0.04, ease: 'power2.out',
      delay: 0.1,
      onComplete: () => el.classList.add('anim-done'),
    });
  });

  // ===== 2. REVEAL UP (fade + slide desde abajo) =====
  document.querySelectorAll('[data-anim="reveal"], [data-anim="reveal-up"]').forEach(el => {
    if (el.classList.contains('anim-done')) return;
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onComplete: () => el.classList.add('anim-done'),
      }
    );
  });

  // ===== 3. REVEAL LEFT / RIGHT =====
  document.querySelectorAll('[data-anim="reveal-left"]').forEach(el => {
    gsap.fromTo(el, { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
  document.querySelectorAll('[data-anim="reveal-right"]').forEach(el => {
    gsap.fromTo(el, { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  // ===== 4. REVEAL SCALE (sutil, sin bounce) =====
  document.querySelectorAll('[data-anim="reveal-scale"]').forEach(el => {
    gsap.fromTo(el,
      { scale: 0.96, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });

  // ===== 5. STAGGER CHILDREN (lista que cae en cascada) =====
  document.querySelectorAll('[data-anim="stagger"]').forEach(el => {
    const children = el.querySelectorAll(':scope > *');
    gsap.fromTo(children,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });

  // ===== 6. COUNTERS (números animados) =====
  document.querySelectorAll('[data-counter]').forEach(el => {
    const end = parseFloat(el.dataset.counter);
    const decimals = parseInt(el.dataset.counterDecimals || '0', 10);
    const prefix = el.dataset.counterPrefix || '';
    const suffix = el.dataset.counterSuffix || '';
    const duration = parseFloat(el.dataset.counterDuration || '2.2');
    if (isNaN(end)) return;

    const counter = new window.countUp.CountUp(el, end, {
      duration, decimalPlaces: decimals, prefix, suffix,
      separator: ',', useEasing: true,
    });

    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => { if (!counter.error) counter.start(); },
    });
  });

  // ===== 7. PARALLAX (movimiento sutil al scrollear) =====
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax || '0.3');
    gsap.to(el, {
      y: () => -ScrollTrigger.maxScroll(window) * speed * 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6,
      },
    });
  });

  // ===== 8. TILT 3D — desactivado por restraint. Si lo quieres puntual, agrega data-tilt-strong =====
  if (window.VanillaTilt && !window.matchMedia('(pointer: coarse)').matches) {
    const tiltEls = document.querySelectorAll('[data-tilt-strong]');
    if (tiltEls.length) {
      window.VanillaTilt.init(tiltEls, {
        max: 4, speed: 800, glare: true, 'max-glare': 0.08,
        scale: 1.005, perspective: 1500,
      });
    }
  }

  // ===== 9. PIN + REVEAL (sección que se queda fija mientras se anima) =====
  document.querySelectorAll('[data-anim="pin-reveal"]').forEach(el => {
    const items = el.querySelectorAll('[data-pin-item]');
    if (!items.length) return;
    gsap.fromTo(items,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: {
          trigger: el, start: 'top 75%', end: '+=400', scrub: 0.5,
        },
      }
    );
  });

  // ===== 10. MAGNETIC BUTTONS — desactivado (gimmicky para B2B). Marcador queda por compat =====

  // ===== 11. FADE IMAGE ZOOM (sutil) =====
  document.querySelectorAll('[data-anim="img-zoom"]').forEach(el => {
    gsap.fromTo(el,
      { scale: 1.04, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    );
  });

  // Refresh ScrollTrigger después de carga de imágenes
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

// Boot inicial + en cada navegación View Transitions
bootAnimations();
document.addEventListener('astro:page-load', () => {
  // Limpiar ScrollTriggers previos antes de re-inicializar
  if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill());
  bootAnimations();
});
