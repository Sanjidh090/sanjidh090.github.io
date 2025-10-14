// year
document.getElementById('year').textContent = new Date().getFullYear();

// theme toggle (persist)
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme') || 'dark';
if (saved === 'light') root.classList.add('light');

function setIcon(){
  themeToggle.textContent = root.classList.contains('light') ? '🌞' : '🌙';
}
setIcon();

themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  setIcon();
});

// smooth scroll (native CSS works, but ensure hash focus)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth', block:'start'});
    history.pushState(null, '', `#${id}`);
  });
});

// reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.15});

document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
