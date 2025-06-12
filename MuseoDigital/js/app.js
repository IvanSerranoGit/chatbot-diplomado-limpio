// Función para mostrar el popup
function mostrarPopup(contenido) {
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popup-content');
  popupContent.innerHTML = contenido;
  popup.classList.remove('hidden');
}

// Función para cerrar el popup
function cerrarPopup() {
  document.getElementById('popup').classList.add('hidden');
}

// Navegación de slides con hotspots únicos
let slideIndex = 0;
const slides = [
  {
    src: 'assets/renders/sala1.png',
    hotspots: [
      // { x: '25%', y: '30%', content: '<iframe src="/popups/info1.html" width="100%" height="300"></iframe>' },
      // { x: '70%', y: '50%', content: '<video src="/assets/videos/clip1.mp4" controls class="w-full"></video>' }
    ]
  },
  {
    src: 'assets/renders/sala2.jpg',
    hotspots: []
  },
  {
    src: 'assets/renders/sala3.jpg',
    hotspots: [
      // { x: '60%', y: '60%', content: '<img src="/assets/images/detalle.jpg" class="w-full" />' }
    ]
  },
    // ...salas anteriores
  {
    src: 'assets/renders/sala4.png',
    hotspots: []
  },
  {
    src: 'assets/renders/sala5.png',
    hotspots: []
  },
  {
    src: 'assets/renders/sala6.png',
    hotspots: []
  },
  {
    src: 'assets/renders/sala7.png',
    hotspots: []
  },
  
];

function actualizarSlide() {
  const pared = document.getElementById('pared');
  pared.src = slides[slideIndex].src;

  // Limpiar hotspots anteriores
  document.querySelectorAll('.hotspot-dinamico').forEach(el => el.remove());

  // Agregar nuevos hotspots
  slides[slideIndex].hotspots.forEach(h => {
    const btn = document.createElement('button');
    btn.className = 'hotspot-dinamico absolute w-6 h-6 bg-yellow-500 rounded-full z-40';
    btn.style.left = h.x;
    btn.style.top = h.y;
    btn.title = 'Abrir contenido';
    btn.onclick = () => mostrarPopup(h.content);
    document.getElementById('museo').appendChild(btn);
  });
}

function slideAnterior() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  actualizarSlide();
}

function slideSiguiente() {
  slideIndex = (slideIndex + 1) % slides.length;
  actualizarSlide();
}

let zoomLevel = 1;
function zoomIn() {
  zoomLevel += 0.1;
  document.getElementById('pared').style.transform = `scale(${zoomLevel})`;
}

function zoomOut() {
  zoomLevel = Math.max(0.5, zoomLevel - 0.1);
  document.getElementById('pared').style.transform = `scale(${zoomLevel})`;
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function toggleBarra() {
  const barra = document.querySelector('.barra-herramientas');
  barra.classList.toggle('hidden');
}

// Cargar primer slide al iniciar
document.addEventListener('DOMContentLoaded', actualizarSlide);