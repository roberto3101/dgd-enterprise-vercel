// ============================================================
//  DGD Enterprise — Animaciones GSAP de alto impacto
//  Patrón oficial GSAP: registerPlugin + gsap.context() + matchMedia
//  + ScrollTrigger.batch + scrub timelines + magnetic CTAs
//  Respeta prefers-reduced-motion en cada bloque.
// ============================================================

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

// ── Estado global (limpieza entre navegaciones View Transitions) ──
let dgdCtx = null;
let dgdMM = null;

async function bootAnimations() {
  // Marcar todo como done si reduced-motion (sin animaciones)
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
    ]);
  } catch (e) {
    console.warn('Anim CDN fail, fallback:', e);
    document.querySelectorAll('[data-anim]').forEach(el => el.classList.add('anim-done'));
    return;
  }

  const { gsap } = window;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  // ── Lenis sync (smooth scroll → ScrollTrigger) ──
  if (window.__lenis) {
    window.__lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => window.__lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // ── Defaults globales ──
  gsap.defaults({ ease: 'power3.out' });

  // ── Context para limpieza centralizada ──
  dgdCtx = gsap.context(() => {

    // ============================================================
    //  1.  HERO TITLE — char-by-char clip-path reveal
    //      Más cinemático que solo opacity. SplitText por chars.
    // ============================================================
    document.querySelectorAll('[data-anim="hero-title"]').forEach(el => {
      if (el.classList.contains('anim-done')) return;
      const split = new SplitType(el, { types: 'words,chars', tagName: 'span' });
      // Wrap each char so clip-path works without breaking layout
      split.chars.forEach(c => {
        c.style.display = 'inline-block';
        c.style.willChange = 'transform, clip-path';
      });
      gsap.set(split.chars, { yPercent: 100, opacity: 0 });
      gsap.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        stagger: { each: 0.018, from: 'start' },
        ease: 'expo.out',
        delay: 0.05,
        onComplete: () => {
          el.classList.add('anim-done');
          split.chars.forEach(c => c.style.willChange = '');
        },
      });
    });

    // ============================================================
    //  2.  REVEAL UP — clip-path + slide (sofisticado)
    //      Usa ScrollTrigger.batch para mejor perf en bloques.
    // ============================================================
    const revealEls = document.querySelectorAll('[data-anim="reveal"], [data-anim="reveal-up"]');
    if (revealEls.length) {
      gsap.set(revealEls, { y: 32, opacity: 0 });
      ScrollTrigger.batch(revealEls, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'expo.out',
          overwrite: 'auto',
          onComplete: () => batch.forEach(el => el.classList.add('anim-done')),
        }),
      });
    }

    // ============================================================
    //  3.  REVEAL LEFT / RIGHT — slide horizontal
    // ============================================================
    document.querySelectorAll('[data-anim="reveal-left"]').forEach(el => {
      gsap.fromTo(el,
        { x: -56, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    });
    document.querySelectorAll('[data-anim="reveal-right"]').forEach(el => {
      gsap.fromTo(el,
        { x: 56, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    });

    // ============================================================
    //  4.  REVEAL SCALE — sutil scale-up
    // ============================================================
    document.querySelectorAll('[data-anim="reveal-scale"]').forEach(el => {
      gsap.fromTo(el,
        { scale: 0.94, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    });

    // ============================================================
    //  5.  STAGGER CHILDREN — cascada con batch
    // ============================================================
    document.querySelectorAll('[data-anim="stagger"]').forEach(el => {
      const children = el.querySelectorAll(':scope > *');
      if (!children.length) return;
      gsap.set(children, { y: 28, opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => gsap.to(children, {
          y: 0, opacity: 1,
          duration: 0.75, stagger: 0.07, ease: 'expo.out',
        }),
      });
    });

    // ============================================================
    //  6.  COUNTERS — números que cuentan al entrar al viewport
    //      Mantiene CountUp para precisión, pero sincronizado con scroll.
    // ============================================================
    document.querySelectorAll('[data-counter]').forEach(el => {
      const end = parseFloat(el.dataset.counter);
      const decimals = parseInt(el.dataset.counterDecimals || '0', 10);
      const prefix = el.dataset.counterPrefix || '';
      const suffix = el.dataset.counterSuffix || '';
      const duration = parseFloat(el.dataset.counterDuration || '2.4');
      if (isNaN(end)) return;

      const counter = new window.countUp.CountUp(el, end, {
        duration, decimalPlaces: decimals, prefix, suffix,
        separator: ',', useEasing: true,
      });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => { if (!counter.error) counter.start(); },
      });
    });

    // ============================================================
    //  7.  HERO PARALLAX — capas que se mueven a distintas velocidades
    //      Hero video con ken-burns sutil + bg con offset al scrollear.
    // ============================================================
    const heroVideo = document.querySelector('.hero .hero-video');
    if (heroVideo) {
      // Ken Burns: zoom out + drift mientras se scrolle el hero
      gsap.fromTo(heroVideo,
        { scale: 1.08, yPercent: 0 },
        {
          scale: 1, yPercent: 8, ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    }
    const heroGridBg = document.querySelector('.hero .hero-grid-bg');
    if (heroGridBg) {
      gsap.to(heroGridBg, {
        yPercent: -20, ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top', end: 'bottom top', scrub: true,
        },
      });
    }

    // ── Hero dashboard mockup: entrada con perspective ──
    const heroDash = document.querySelector('.hero .gradient-border');
    if (heroDash) {
      gsap.set(heroDash, { transformPerspective: 1500, transformOrigin: 'right center' });
      gsap.from(heroDash, {
        rotationY: -10,
        rotationX: 4,
        scale: 0.92,
        opacity: 0,
        duration: 1.4,
        ease: 'expo.out',
        delay: 0.3,
      });
    }

    // ── Hero floating cards + dashboard: anular CSS floatY y usar GSAP yoyo ──
    document.querySelectorAll('.hero .glass, .hero .gradient-border').forEach(el => {
      el.style.animation = 'none'; // override inline CSS animation
    });
    document.querySelectorAll('.hero .glass').forEach((card, i) => {
      gsap.to(card, {
        y: -10,
        duration: 3 + i * 0.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.2 + i * 0.4, // espera a la entrada del dashboard
      });
    });
    const heroDashFloat = document.querySelector('.hero .gradient-border');
    if (heroDashFloat) {
      gsap.to(heroDashFloat, {
        y: -8,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }

    // ============================================================
    //  8.  GENERIC PARALLAX — data-parallax="0.3"
    // ============================================================
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

    // ============================================================
    //  9.  PIN + REVEAL — sección que ancla mientras se animan items
    // ============================================================
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

    // ============================================================
    //  10. IMAGE ZOOM — fade + sutil scale
    // ============================================================
    document.querySelectorAll('[data-anim="img-zoom"]').forEach(el => {
      gsap.fromTo(el,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.3, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      );
    });

    // ============================================================
    //  11. METRIC CARDS — entrada coordinada con batch + glow border
    //      Usa ScrollTrigger.batch para perf cuando hay muchas cards.
    // ============================================================
    const metricCards = document.querySelectorAll('.metric-card');
    if (metricCards.length) {
      gsap.set(metricCards, { y: 40, opacity: 0 });
      ScrollTrigger.batch(metricCards, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) => gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'expo.out',
          overwrite: 'auto',
        }),
      });
    }

    // ============================================================
    //  12. MARQUEE GSAP — infinite tween (reemplaza CSS animation)
    //      Pausa en hover, mejor perf + sin saltos.
    // ============================================================
    document.querySelectorAll('.marquee').forEach(wrap => {
      const track = wrap.querySelector('.marquee-track');
      if (!track) return;
      // Detener cualquier CSS animation existente
      track.style.animation = 'none';
      track.style.willChange = 'transform';

      // Como el track contiene contenido duplicado x2, animamos -50% para loop perfecto
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 32,
        ease: 'none',
        repeat: -1,
      });

      wrap.addEventListener('mouseenter', () => gsap.to(tween, { timeScale: 0.15, duration: 0.4 }));
      wrap.addEventListener('mouseleave', () => gsap.to(tween, { timeScale: 1, duration: 0.4 }));
    });

    // ============================================================
    //  13. MAGNETIC CTAs — botones .btn-primary.btn-lg siguen al mouse
    //      Solo en pointer:fine (no mobile). Usa quickTo para perf.
    // ============================================================
    if (window.matchMedia('(pointer: fine)').matches) {
      document.querySelectorAll('.btn-primary.btn-lg').forEach(btn => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
        const strength = 8;
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
          const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          xTo(dx * strength);
          yTo(dy * strength);
        });
        btn.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
      });
    }

    // ============================================================
    //  14. ECOSISTEMA ORBIT — entrada coreografiada
    //      Núcleo → módulos → beams. Núcleo respira en loop.
    // ============================================================
    const orbit = document.querySelector('.eco-visual');
    if (orbit) {
      const core = orbit.querySelector('.node-core');
      const nodes = orbit.querySelectorAll('.node');
      const beams = orbit.querySelectorAll('.p-beam');

      const tl = gsap.timeline({
        scrollTrigger: { trigger: orbit, start: 'top 80%', once: true },
        defaults: { ease: 'expo.out' },
        delay: 0.2, // espera al reveal-scale del padre
      });
      if (core) tl.from(core, { scale: 0.55, opacity: 0, duration: 0.9 }, 0);
      if (nodes.length) {
        tl.from(nodes, {
          scale: 0.6, opacity: 0,
          duration: 0.8, stagger: { each: 0.08, from: 'random' },
        }, 0.25);
      }
      if (beams.length) {
        tl.from(beams, {
          opacity: 0, duration: 0.6, stagger: 0.05,
        }, 0.6);
      }
      // Núcleo: respiración continua sutil
      if (core) {
        gsap.to(core, {
          scale: 1.04, duration: 2.6,
          ease: 'sine.inOut', yoyo: true, repeat: -1,
          delay: 1.5,
        });
      }
    }
  });

  // ── matchMedia para responsive (recomendación oficial GSAP) ──
  dgdMM = gsap.matchMedia();
  dgdMM.add('(min-width: 821px)', () => {
    // Aquí podrían ir efectos solo desktop (ej: pin sections agresivos)
  });
  dgdMM.add('(max-width: 820px)', () => {
    // Mobile: simplificar
  });

  // ── Refresh tras carga de imágenes y fonts ──
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

// ── Limpieza ligera entre transiciones de página ──
// IMPORTANTE: NO usar dgdCtx.revert() en astro:before-swap. Eso revierte
// SplitText/transforms del DOM saliente y causa un "flash" o efecto de
// recarga durante la View Transition. El swap de Astro reemplaza el DOM
// igual; sólo necesitamos matar ScrollTriggers para que no apunten a
// elementos huérfanos durante la animación de la mascarilla.
function cleanupAnimations() {
  if (window.ScrollTrigger) {
    window.ScrollTrigger.getAll().forEach(t => t.kill());
  }
  // Limpiamos referencias sin revert: el DOM ya será reemplazado.
  dgdCtx = null;
  dgdMM = null;
}

// Boot inicial + en cada navegación View Transitions
bootAnimations();
document.addEventListener('astro:page-load', () => {
  cleanupAnimations();
  bootAnimations();
});
