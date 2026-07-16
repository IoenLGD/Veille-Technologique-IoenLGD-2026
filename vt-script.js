'use strict';

/* ── Lang (FR/EN uniquement) ── */
let lang = localStorage.getItem('vt-lang') || 'fr';

function applyLang(l) {
  lang = l;
  localStorage.setItem('vt-lang', l);
  const select = document.getElementById('langSelect');
  if (select) select.value = l;

  document.querySelectorAll('[data-fr]').forEach(el => {
    el.textContent = l === 'fr' ? el.dataset.fr : (el.dataset.en != null ? el.dataset.en : el.dataset.fr);
  });
  document.querySelectorAll('[data-ph-fr]').forEach(el => {
    el.placeholder = l === 'fr' ? el.dataset.phFr : (el.dataset.phEn != null ? el.dataset.phEn : el.dataset.phFr);
  });

  document.documentElement.lang = l;
}

const langSelect = document.getElementById('langSelect');
if (langSelect) langSelect.addEventListener('change', () => applyLang(langSelect.value));
applyLang(lang);

/* ── Theme (clair/sombre) ── */
let theme = localStorage.getItem('vt-theme') || 'light';

function applyTheme(t) {
  theme = t;
  localStorage.setItem('vt-theme', t);
  document.documentElement.setAttribute('data-theme', t);
  const checkbox = document.getElementById('themeCheckbox');
  if (checkbox) checkbox.checked = (t === 'dark');
}

const themeCheckbox = document.getElementById('themeCheckbox');
if (themeCheckbox) {
  themeCheckbox.addEventListener('change', () => {
    applyTheme(themeCheckbox.checked ? 'dark' : 'light');
  });
}
applyTheme(theme);

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.querySelector('.nav-pill').style.background = window.scrollY > 30 ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.6)';
}, { passive: true });

/* ── Burger ── */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
if (burger && drawer) {
  burger.addEventListener('click', () => { const o = drawer.classList.toggle('open'); burger.classList.toggle('open', o); });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { drawer.classList.remove('open'); burger.classList.remove('open'); }));
}

/* ── iOS scroll anim ── */
const ioEls = document.querySelectorAll('.ios-anim');
if (ioEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (!e.isIntersecting) return; const d = parseInt(e.target.dataset.d || '0', 10); setTimeout(() => e.target.classList.add('in'), d); obs.unobserve(e.target); });
  }, { threshold: 0.08 });
  ioEls.forEach(el => obs.observe(el));
}
