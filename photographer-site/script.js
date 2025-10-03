// год в подвале
document.getElementById('year').textContent = new Date().getFullYear();

// бургер
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => navLinks.classList.toggle('show'));
document.querySelectorAll('.nav__links a').forEach(a=>{
  a.addEventListener('click', ()=>navLinks.classList.remove('show'));
});

// фильтр портфолио
const filters = document.getElementById('filters');
const grid = document.getElementById('grid');
filters?.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-filter]');
  if(!btn) return;
  filters.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  grid.querySelectorAll('.item').forEach(it=>{
    const show = f === 'all' || it.dataset.cat === f;
    it.style.display = show ? '' : 'none';
  });
});

// лайтбокс
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');

grid?.addEventListener('click', (e)=>{
  const img = e.target.closest('.item img');
  if(!img) return;
  lbImg.src = img.src.replace('w=1200','w=1600'); // чуть крупнее
  lb.classList.add('show');
});
lbClose?.addEventListener('click', ()=>lb.classList.remove('show'));
lb?.addEventListener('click', (e)=>{ if(e.target === lb) lb.classList.remove('show'); });

// форма (демо / Formspree)
document.getElementById('contactForm')?.addEventListener('submit', (e)=>{
  if(!e.target.action) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    alert(`Спасибо, ${data.name}! Я свяжусь по почте: ${data.email}.`);
    e.target.reset();
  }
});
 
