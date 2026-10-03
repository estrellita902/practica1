const links = [...document.querySelectorAll('.nav nav a')];
const sections = links.map(link => document.querySelector(link.getAttribute('href')));
const progress = document.getElementById('barra');
const topButton = document.getElementById('topButton');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.remove('activo'));
    const active = links.find(link => link.getAttribute('href') === `#${entry.target.id}`);
    if (active) active.classList.add('activo');
  });
}, { threshold: 0.45 });

sections.forEach(section => observer.observe(section));

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${value}%`;
  topButton.classList.toggle('show', window.scrollY > 600);
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('load', updateProgress);

topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
