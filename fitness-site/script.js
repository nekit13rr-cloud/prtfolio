// Небольшой скрипт для UX — при клике на ссылки меню плавно скроллит
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
// -------- Карусель отзывов (простой и надёжный) --------
(function(){
  const track = document.getElementById("reviewsTrack");
  if (!track) return;

  const container = track.parentElement; // .carousel
  const slides = Array.from(track.querySelectorAll(".review"));
  const prev = document.getElementById("prevReview");
  const next = document.getElementById("nextReview");
  const dotsWrap = document.getElementById("reviewDots");

  let index = 0;

  // точки
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.addEventListener("click", ()=>{ index = i; render(); });
    dotsWrap && dotsWrap.appendChild(b);
    return b;
  });

  function slideWidth(){
    return container.clientWidth; // всегда ровно ширина видимой области
  }

  function render(){
    const offset = -index * slideWidth();
    track.style.transform = `translateX(${offset}px)`;
    dots.forEach((d,i)=>d.classList.toggle("active", i===index));
  }

  prev && prev.addEventListener("click", ()=>{
    index = (index - 1 + slides.length) % slides.length;
    render();
  });
  next && next.addEventListener("click", ()=>{
    index = (index + 1) % slides.length;
    render();
  });

  // свайп
  let startX = 0, dx = 0, swiping = false;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX; dx = 0; swiping = true;
    track.style.transition = "none";
  }, {passive:true});
  track.addEventListener("touchmove", (e) => {
    if (!swiping) return;
    dx = e.touches[0].clientX - startX;
    const base = -index * slideWidth();
    track.style.transform = `translateX(${ base + dx }px)`;
  }, {passive:true});
  track.addEventListener("touchend", () => {
    track.style.transition = "transform .3s ease";
    if (Math.abs(dx) > 40){
      index = dx < 0 ? (index + 1) % slides.length : (index - 1 + slides.length) % slides.length;
    }
    render();
    swiping = false;
  });

  // пересчёт при ресайзе
  window.addEventListener("resize", render);
  render();
})();
// === Reviews Carousel (rc-*) — изолированный JS ===
(function(){
  const viewport = document.getElementById('rcViewport');
  const track    = document.getElementById('rcTrack');
  if (!viewport || !track) return;

  const slides = Array.from(track.querySelectorAll('.rc__slide'));
  const prev   = document.getElementById('rcPrev');
  const next   = document.getElementById('rcNext');
  const dotsEl = document.getElementById('rcDots');

  let index = 0;
  let w = 0;

  // создаём точки
  const dots = slides.map((_,i)=>{
    const b = document.createElement('button');
    b.addEventListener('click', ()=>{ index=i; render(); });
    dotsEl.appendChild(b);
    return b;
  });

  function measure(){
    w = viewport.clientWidth;                // точная ширина видимой области
    slides.forEach(s => s.style.width = w+'px'); // фиксируем ширину слайдов
    render(false);
  }

  function render(withAnim=true){
    if(!withAnim){ track.style.transition='none'; }
    track.style.transform = `translateX(${-index*w}px)`;
    dots.forEach((d,i)=>d.classList.toggle('rc--active', i===index));
    if(!withAnim){
      track.getBoundingClientRect();         // reflow
      track.style.transition='transform .3s ease';
    }
  }

  prev?.addEventListener('click', ()=>{
    index = (index - 1 + slides.length) % slides.length;
    render();
  });
  next?.addEventListener('click', ()=>{
    index = (index + 1) % slides.length;
    render();
  });

  // свайп
  let startX=0, dx=0, swiping=false;
  track.addEventListener('touchstart', e=>{
    startX = e.touches[0].clientX; dx=0; swiping=true;
    track.style.transition='none';
  }, {passive:true});

  track.addEventListener('touchmove', e=>{
    if(!swiping) return;
    dx = e.touches[0].clientX - startX;
    track.style.transform = `translateX(${ -index*w + dx }px)`;
  }, {passive:true});

  track.addEventListener('touchend', ()=>{
    track.style.transition='transform .3s ease';
    if(Math.abs(dx)>40){
      index = dx<0 ? (index+1)%slides.length : (index-1+slides.length)%slides.length;
    }
    render();
    swiping=false;
  });

  // блокируем случайный горизонтальный скролл колёсиком
  viewport.addEventListener('wheel', (e)=>{
    if(Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault();
  }, {passive:false});

  // пересчёт при ресайзе
  const ro = new ResizeObserver(measure);
  ro.observe(viewport);
  measure();
})();
// фон при скролле
window.addEventListener("scroll", () => {
  document.querySelector(".nav").classList.toggle("scrolled", window.scrollY > 20);
});

// активные пункты меню
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 100;
    if(top >= offset) current = section.getAttribute("id");
  });

  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});
