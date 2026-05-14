'use strict';
let lang = localStorage.getItem('vt-lang') || 'fr';

function applyLang(l){
  lang=l;localStorage.setItem('vt-lang',l);
  const b=document.getElementById('langBtn');if(b)b.textContent=l==='fr'?'EN':'FR';
  document.querySelectorAll('[data-fr]').forEach(el=>{el.textContent=l==='fr'?el.dataset.fr:el.dataset.en;});
  document.querySelectorAll('[data-ph-fr]').forEach(el=>{el.placeholder=l==='fr'?el.dataset.phFr:el.dataset.phEn;});
}
const lb=document.getElementById('langBtn');
if(lb)lb.addEventListener('click',()=>applyLang(lang==='fr'?'en':'fr'));
applyLang(lang);

const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  if(!nav)return;
  nav.querySelector('.nav-pill').style.background=window.scrollY>30?'rgba(255,255,255,0.75)':'rgba(255,255,255,0.6)';
},{passive:true});

const burger=document.getElementById('burger');
const drawer=document.getElementById('drawer');
if(burger&&drawer){
  burger.addEventListener('click',()=>{const o=drawer.classList.toggle('open');burger.classList.toggle('open',o);});
  drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{drawer.classList.remove('open');burger.classList.remove('open');}));
}

const ioEls=document.querySelectorAll('.ios-anim');
if(ioEls.length){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(!e.isIntersecting)return;const d=parseInt(e.target.dataset.d||'0',10);setTimeout(()=>e.target.classList.add('in'),d);obs.unobserve(e.target);});
  },{threshold:0.08});
  ioEls.forEach(el=>obs.observe(el));
}