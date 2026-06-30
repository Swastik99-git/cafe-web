
gsap.registerPlugin(ScrollTrigger);

/* ============ DATA ============ */
const dishes = [
  {cat:'espresso', name:'Classic Espresso', desc:'Double shot, dark cocoa and stone fruit notes.', price:'₹180', img:'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=600&auto=format&fit=crop'},
  {cat:'espresso', name:'Ristretto', desc:'Short, syrupy pull with a velvet finish.', price:'₹190', img:'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=600&auto=format&fit=crop'},
  {cat:'latte', name:'Vanilla Bean Latte', desc:'Steamed milk, Madagascar vanilla, soft foam.', price:'₹260', img:'https://images.unsplash.com/photo-1561882468-9110e03e0f78?q=80&w=600&auto=format&fit=crop'},
  {cat:'latte', name:'Honey Oat Latte', desc:'Oat milk, wild honey, cinnamon dust.', price:'₹270', img:'https://images.unsplash.com/photo-1572286258217-215a8b1d10fc?q=80&w=600&auto=format&fit=crop'},
  {cat:'cappuccino', name:'Signature Cappuccino', desc:'Equal thirds espresso, milk and microfoam.', price:'₹240', img:'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop'},
  {cat:'cappuccino', name:'Cardamom Cappuccino', desc:'House blend with whole cardamom pods.', price:'₹250', img:'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop'},
  {cat:'coldbrew', name:'Slow Cold Brew', desc:'18-hour steep, served over hand-cut ice.', price:'₹230', img:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop'},
  {cat:'coldbrew', name:'Nitro Cold Brew', desc:'Cascading texture, naturally sweet and creamy.', price:'₹280', img:'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop'},
  {cat:'desserts', name:'Burnt Basque Cheesecake', desc:'Caramelised top, soft molten centre.', price:'₹320', img:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop'},
  {cat:'desserts', name:'Espresso Tiramisu', desc:'Mascarpone, cocoa, soaked ladyfingers.', price:'₹300', img:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop'},
];

const galleryImgs = [
  {src:'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=700&auto=format&fit=crop', cap:'The Roasting Bench'},
  {src:'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=700&auto=format&fit=crop', cap:'Window Seat, 8AM'},
  {src:'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=500&auto=format&fit=crop', cap:'Pour Over Ritual'},
  {src:'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=700&auto=format&fit=crop', cap:'Latte Art Study'},
  {src:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=700&auto=format&fit=crop', cap:'The Bar at Dusk'},
  {src:'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=500&auto=format&fit=crop', cap:'Single Origin Lot'},
  {src:'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=700&auto=format&fit=crop', cap:'Slow Mornings'},
  {src:'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=700&auto=format&fit=crop', cap:'Evening Crowd'},
];

const testimonials = [
  {q:'AMBRE feels like the only café in the city that isn’t in a hurry. The cardamom cappuccino is reason enough to come back.', name:'Ritika Sahoo', role:'Regular, 3 years', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'},
  {q:'Every visit feels considered — the lighting, the playlist, the pour. It’s the kind of place you bring people you actually like.', name:'Aniket Rao', role:'Local Designer', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'},
  {q:'Their cold brew ruined every other cold brew for me. Eighteen hours well spent.', name:'Meher Das', role:'Food Writer', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'},
];

/* ============ THEME TOGGLE ============ */
const themeToggle = document.getElementById('themeToggle');
const rootEl = document.documentElement;
let currentTheme = 'dark';
themeToggle.addEventListener('click', ()=>{
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  gsap.to('body', { opacity:0.55, duration:0.22, ease:'power1.in', onComplete:()=>{
    rootEl.setAttribute('data-theme', currentTheme);
    gsap.to('body', { opacity:1, duration:0.45, ease:'power1.out' });
  }});
});

/* ============ LOADER ============ */
const loaderTl = gsap.timeline({
  onComplete: () => {
    document.getElementById('loader').style.pointerEvents = 'none';
    initReveals();
  }
});
loaderTl.to('.steam-path', { opacity:1, duration:1, stagger:0.15, ease:'sine.out' })
  .to('.steam-path', { attr:{d: (i)=> ['M50 90 Q40 60 50 35 Q60 10 50 -10','M65 90 Q55 60 65 35 Q75 10 65 -10','M80 90 Q70 60 80 35 Q90 10 80 -10'][i]}, duration:2.2, ease:'sine.inOut' }, '-=0.3')
  .to('.loader-word', { opacity:1, y:-6, duration:0.8, ease:'power2.out' }, '-=1.8')
  .to('.loader-bar i', { width:'100%', duration:1.6, ease:'power1.inOut' }, '-=1.6')
  .to('#loader', { autoAlpha:0, duration:0.9, ease:'power2.inOut' }, '+=0.2')
  .from('header', { y:-30, opacity:0, duration:0.9, ease:'power2.out' }, '-=0.5')
  .from(['.hero-eyebrow','.hero h1','.hero-side'], { y:40, opacity:0, filter:'blur(8px)', stagger:0.15, duration:1.1, ease:'power3.out' }, '-=0.5');

/* ============ LENIS SMOOTH SCROLL ============ */
let lenis;
try{
  lenis = new Lenis({ duration:1.15, easing:(t)=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time)=>{ lenis.raf(time*1000); });
  gsap.ticker.lagSmoothing(0);
}catch(e){ console.warn('Lenis unavailable', e); }

/* ============ CUSTOM CURSOR ============ */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx=innerWidth/2,my=innerHeight/2, rx=mx, ry=my;
window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
gsap.ticker.add(()=>{ rx += (mx-rx)*0.16; ry += (my-ry)*0.16; ring.style.left=rx+'px'; ring.style.top=ry+'px'; });
document.querySelectorAll('a,button,.dish,.masonry figure').forEach(el=>{
  el.addEventListener('mouseenter', ()=>ring.classList.add('active'));
  el.addEventListener('mouseleave', ()=>ring.classList.remove('active'));
});

/* ============ MAGNETIC BUTTONS ============ */
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    gsap.to(btn, { x:x*0.35, y:y*0.45, duration:0.5, ease:'power3.out' });
  });
  btn.addEventListener('mouseleave', ()=>{ gsap.to(btn, { x:0, y:0, duration:0.6, ease:'elastic.out(1,0.4)' }); });
});

/* ============ NAV ============ */
const header = document.querySelector('header');
ScrollTrigger.create({ start:50, end:99999, onUpdate:(self)=> header.classList.toggle('scrolled', self.scroll()>50) });
const burger = document.getElementById('burger'), nav = document.getElementById('nav');
burger.addEventListener('click', ()=> nav.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click', ()=> nav.classList.remove('open'));
});
const sections = ['hero','menu','about','gallery','testimonials','reserve'];
sections.forEach(id=>{
  ScrollTrigger.create({
    trigger: '#'+id, start:'top 50%', end:'bottom 50%',
    onEnter: ()=>setActive(id), onEnterBack: ()=>setActive(id)
  });
});
function setActive(id){
  document.querySelectorAll('.nav-link').forEach(a=> a.classList.toggle('active', a.getAttribute('href')==='#'+id));
}

/* ============ SCROLL PROGRESS ============ */
gsap.to('#progress-fill', {
  height:'100%', ease:'none',
  scrollTrigger:{ trigger:document.body, start:'top top', end:'bottom bottom', scrub:0.3 }
});

/* ============ BEANS PARALLAX (HERO) ============ */
const beansLayer = document.getElementById('beans-layer');
const beanCount = window.innerWidth < 700 ? 9 : 16;
for(let i=0;i<beanCount;i++){
  const b = document.createElement('div');
  b.className='bean';
  const size = 10+Math.random()*16;
  b.style.left = Math.random()*100+'%';
  b.style.top = Math.random()*100+'%';
  b.style.width = size+'px'; b.style.height=(size*1.3)+'px';
  b.innerHTML = `<svg viewBox="0 0 24 30" width="100%" height="100%"><path d="M12 1C6 1 1 8 1 16c0 8 5 13 11 13s11-5 11-13C23 8 18 1 12 1z" fill="#3a2a1d" stroke="#6F4E37" stroke-width="0.6"/><path d="M12 4c-3 4-3 18 0 22" stroke="#1a120c" stroke-width="1" fill="none"/></svg>`;
  beansLayer.appendChild(b);
  gsap.to(b, { y: '+=' + (20+Math.random()*30), x:'+='+(Math.random()*20-10), rotation: Math.random()*40-20, duration: 6+Math.random()*6, repeat:-1, yoyo:true, ease:'sine.inOut', delay:Math.random()*3 });
}

/* hero mouse depth */
const heroBg = document.getElementById('hero-bg');
document.getElementById('hero').addEventListener('mousemove', (e)=>{
  const x = (e.clientX/innerWidth - 0.5)*22;
  const y = (e.clientY/innerHeight - 0.5)*16;
  gsap.to(heroBg, { x:x, y:y, duration:1.2, ease:'power3.out' });
  gsap.to(beansLayer, { x:x*1.8, y:y*1.8, duration:1.4, ease:'power3.out' });
});
gsap.to(heroBg, { scale:1.0, y:'-6%', ease:'none', scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:true } });

/* ============ STATS COUNT ============ */
document.querySelectorAll('.stat-num').forEach(el=>{
  const target = +el.dataset.count;
  const num = el.querySelector('.num');
  ScrollTrigger.create({
    trigger: el, start:'top 85%', once:true,
    onEnter: ()=> gsap.to({v:0}, { v:target, duration:2, ease:'power2.out', onUpdate:function(){ num.textContent = Math.floor(this.targets()[0].v).toLocaleString(); } })
  });
});

/* ============ MENU RENDER + FILTER ============ */
const menuGrid = document.getElementById('menuGrid');
function renderDishes(filter){
  menuGrid.innerHTML='';
  dishes.filter(d=> filter==='all' || d.cat===filter).forEach((d, i)=>{
    const el = document.createElement('div');
    el.className='dish reveal';
    el.innerHTML = `<div class="dish-imgwrap"><img src="${d.img}" alt="${d.name}" loading="lazy"></div>
      <div class="dish-top"><h3>${d.name}</h3><span class="dish-price">${d.price}</span></div>
      <p>${d.desc}</p>`;
    menuGrid.appendChild(el);
  });
  gsap.fromTo(menuGrid.children, { y:30, opacity:0 }, { y:0, opacity:1, duration:0.7, stagger:0.06, ease:'power3.out' });
}
renderDishes('all');
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderDishes(btn.dataset.filter);
  });
});

/* ============ GALLERY MASONRY ============ */
const masonry = document.getElementById('masonry');
galleryImgs.forEach(g=>{
  const fig = document.createElement('figure');
  fig.className='reveal';
  fig.innerHTML = `<img src="${g.src}" alt="${g.cap}" loading="lazy"><figcaption>${g.cap}</figcaption>`;
  fig.addEventListener('click', ()=> openLightbox(g.src, g.cap));
  masonry.appendChild(fig);
});
const lightbox = document.getElementById('lightbox');
function openLightbox(src, alt){
  lightbox.querySelector('img').src = src;
  lightbox.querySelector('img').alt = alt;
  lightbox.classList.add('show');
}
lightbox.addEventListener('click', ()=> lightbox.classList.remove('show'));

/* ============ TESTIMONIALS SLIDER ============ */
const tStage = document.getElementById('tStage');
const tDots = document.getElementById('tDots');
testimonials.forEach((t,i)=>{
  const card = document.createElement('div');
  card.className = 't-card' + (i===0?' active':'');
  card.innerHTML = `<div class="stars">★★★★★</div><p class="t-quote">“${t.q}”</p>
    <div class="t-person"><img src="${t.img}" alt="${t.name}"><div><div class="name">${t.name}</div><div class="role">${t.role}</div></div></div>`;
  tStage.appendChild(card);
  const dot = document.createElement('button');
  if(i===0) dot.classList.add('active');
  dot.addEventListener('click', ()=> showTestimonial(i));
  tDots.appendChild(dot);
});
let tIndex=0;
function showTestimonial(i){
  const cards = tStage.querySelectorAll('.t-card');
  const dots = tDots.querySelectorAll('button');
  gsap.to(cards[tIndex], { opacity:0, y:-14, duration:0.5, ease:'power2.in', onComplete:()=>{
    cards[tIndex].classList.remove('active');
    cards[i].classList.add('active');
    gsap.fromTo(cards[i], { opacity:0, y:14 }, { opacity:1, y:0, duration:0.7, ease:'power2.out' });
  }});
  dots[tIndex].classList.remove('active'); dots[i].classList.add('active');
  tIndex = i;
}
setInterval(()=> showTestimonial((tIndex+1)%testimonials.length), 5500);

/* ============ FORM INPUTS (label float for date/time always-filled look) ============ */
document.querySelectorAll('.field input, .field select').forEach(inp=>{
  inp.addEventListener('focus', ()=> inp.closest('.field').classList.add('filled'));
  inp.addEventListener('blur', ()=> { if(!inp.value) inp.closest('.field').classList.remove('filled'); });
  if(inp.type==='date' || inp.type==='time') inp.closest('.field').classList.add('filled');
});
document.getElementById('resForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const btn = e.target.querySelector('.submit-btn');
  btn.textContent = 'Table Reserved ✓';
  setTimeout(()=> btn.textContent = 'Confirm Reservation', 2800);
});
document.getElementById('newsForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Subscribed ✓';
  setTimeout(()=> btn.textContent = 'Subscribe →', 2600);
});

/* ============ SCROLL REVEALS ============ */
function initReveals(){
  gsap.utils.toArray('.reveal').forEach(el=>{
    if(el.closest('#hero')) return; // hero handled by loader timeline
    gsap.fromTo(el, { y:46, opacity:0, filter:'blur(10px)' }, {
      y:0, opacity:1, filter:'blur(0px)', duration:1.1, ease:'power3.out',
      scrollTrigger:{ trigger:el, start:'top 88%' }
    });
  });
  // stagger groups
  gsap.utils.toArray('.stats .reveal').forEach((el,i)=>{
    gsap.to(el, { delay:i*0.12, scrollTrigger:{ trigger:el, start:'top 90%' } });
  });

  // image scale-on-scroll
  gsap.utils.toArray('.about-imgwrap img, .featured-bg img').forEach(img=>{
    gsap.fromTo(img, { scale:1.18 }, { scale:1, ease:'none', scrollTrigger:{ trigger:img, start:'top bottom', end:'bottom top', scrub:true } });
  });

  // divider sweep
  gsap.utils.toArray('.divider i').forEach(i=>{
    gsap.to(i, { left:'100%', duration:1.6, ease:'power2.inOut', scrollTrigger:{ trigger:i, start:'top 90%' } });
  });

  ScrollTrigger.refresh();
}

/* float hero image gently (in case of supplemental art) */
gsap.to('.about-tag', { y:-14, duration:3.2, repeat:-1, yoyo:true, ease:'sine.inOut' });
