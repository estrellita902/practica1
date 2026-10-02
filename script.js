const track = document.getElementById("track");
const barra = document.getElementById("barra");
const enlaces = [...document.querySelectorAll(".nav a")];
const paneles = enlaces.map((a) => document.querySelector(a.getAttribute("href")));

// La rueda del mouse (vertical) desplaza el sitio en horizontal
track.addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollBy({ left: e.deltaY });
    }
  },
  { passive: false }
);

// Flechas del teclado
document.addEventListener("keydown", (e) => {
  const paso = window.innerWidth * 0.8;
  if (e.key === "ArrowRight") track.scrollBy({ left: paso, behavior: "smooth" });
  if (e.key === "ArrowLeft") track.scrollBy({ left: -paso, behavior: "smooth" });
});

// Navegación del menú
enlaces.forEach((a, i) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    track.scrollTo({ left: paneles[i].offsetLeft, behavior: "smooth" });
  });
});

document.getElementById("volver").addEventListener("click", () => {
  track.scrollTo({ left: 0, behavior: "smooth" });
});

// Barra de progreso y enlace activo
function actualizar() {
  const max = track.scrollWidth - track.clientWidth;
  barra.style.width = (max > 0 ? (track.scrollLeft / max) * 100 : 0) + "%";

  const centro = track.scrollLeft + track.clientWidth / 2;
  let activo = 0;
  paneles.forEach((p, i) => {
    if (centro >= p.offsetLeft) activo = i;
  });
  enlaces.forEach((a, i) => a.classList.toggle("activo", i === activo));
}

track.addEventListener("scroll", actualizar, { passive: true });
window.addEventListener("resize", actualizar);
actualizar();
