// год в подвале
document.getElementById('year').textContent = new Date().getFullYear();

// бургер-меню
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', ()=> navLinks.classList.toggle('show'));
document.querySelectorAll('.links a').forEach(a=>{
  a.addEventListener('click', ()=> navLinks.classList.remove('show'));
});

// фильтр для masonry
const filters = document.getElementById('filters');
const masonry = document.getElementById('masonry');
filters?.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-filter]');
  if(!btn) return;
  filters.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  masonry.querySelectorAll('.ph').forEach(fig=>{
    const show = f === 'all' || fig.dataset.cat === f;
    fig.style.display = show ? '' : 'none';
  });
});

// лайтбокс
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');

masonry?.addEventListener('click', (e)=>{
  const img = e.target.closest('.ph img');
  if(!img) return;
  lbImg.src = img.src.replace('w=1400','w=2000');
  lb.classList.add('show');
});
lbClose?.addEventListener('click', ()=> lb.classList.remove('show'));
lb?.addEventListener('click', (e)=> { if(e.target === lb) lb.classList.remove('show'); });

// форма — демо
document.getElementById('contactForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  alert(`Спасибо, ${data.name}! Я свяжусь с вами на ${data.email}.`);
  e.target.reset();
});
