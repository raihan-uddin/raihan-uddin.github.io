/* ============================================================
   RAIHAN UDDIN SUFAL — PORTFOLIO JS
   ============================================================ */

'use strict';

/* ---------- THEME TOGGLE ---------- */
(function initTheme() {
  const btn      = document.getElementById('theme-toggle');
  const iconMoon = document.getElementById('icon-moon');
  const iconSun  = document.getElementById('icon-sun');

  function applyTheme(light) {
    document.body.classList.toggle('light', light);
    iconMoon.style.display = light ? 'none'  : '';
    iconSun.style.display  = light ? ''      : 'none';
    btn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  }

  // Initialise from localStorage, falling back to OS preference
  const stored = localStorage.getItem('theme');
  const preferLight = stored
    ? stored === 'light'
    : window.matchMedia('(prefers-color-scheme: light)').matches;

  applyTheme(preferLight);

  btn.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light');
    applyTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Sync if OS preference changes and user hasn't set a manual choice
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches);
  });
})();

/* ---------- TYPING ANIMATION ---------- */
(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Engineering systems that power real businesses.',
    'Building scalable B2B platforms.',
    'Designing pharmaceutical supply chains.',
    'Forecasting inventory with AI.',
    'Leading engineering teams.',
    'Solving hard problems with clean architecture.',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function tick() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      delay = 45;
    } else {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      delay = 75;
    }

    if (!isDeleting && charIndex === current.length) {
      // Full phrase typed — pause then delete
      isDeleting = true;
      delay = 1800;
    } else if (isDeleting && charIndex === 0) {
      // Fully deleted — move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 800);
})();

/* ---------- NAVBAR SCROLL EFFECT ---------- */
(function initNav() {
  const nav = document.querySelector('.nav-root');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
})();

/* ---------- MOBILE MENU ---------- */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-close');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ---------- SCROLL REVEAL ---------- */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .stagger-children');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach(el => observer.observe(el));
})();

/* ---------- SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ---------- ACTIVE NAV LINK ---------- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text-1)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
})();

/* ---------- COUNTER ANIMATION ---------- */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();

      const easeOut = (t) => 1 - Math.pow(1 - t, 3);

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.round(easeOut(progress) * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ---------- CARD TILT EFFECT (subtle, desktop only) ---------- */
(function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.sys-card, .next-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((y - centerY) / centerY) * -4;
      const rotY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
      setTimeout(() => { card.style.transition = ''; }, 400);
    });
  });
})();

/* ---------- COPY EMAIL ---------- */
(function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = copyBtn.dataset.email;
    navigator.clipboard.writeText(email).then(() => {
      const orig = copyBtn.innerHTML;
      copyBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
      copyBtn.style.color = 'var(--accent-3)';
      setTimeout(() => {
        copyBtn.innerHTML = orig;
        copyBtn.style.color = '';
      }, 2200);
    });
  });
})();
