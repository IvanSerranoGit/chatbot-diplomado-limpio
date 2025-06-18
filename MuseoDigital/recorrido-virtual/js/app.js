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
    src: 'assets/renders/sala1.jpg',
    hotspots: []
  },
  {
    src: 'assets/renders/sala2.jpg',
    hotspots: []
  },
  {
    src: 'assets/renders/sala3.jpg',
    hotspots: []
  },
  {
    src: 'assets/renders/sala4.jpg',
    hotspots: [
      {
        x: '50%', y: '18.5%',
        content: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1092649420?h=3213fc2d96&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="NACIMIENTO DE OTHÓN SALAZAR"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>'
      },
      {
        x: '50%', y: '61.3%',
        content: '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1092651911?h=54ff2b9174&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="ENTREVISTAS SALA 1 MUSEO INCOMPLETO"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>'
      }
    ]
  },
  {
    src: 'assets/renders/sala5.jpg',
    hotspots: [
      { x: '23.5%', y: '63%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/rxqr/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      { x: '34.5%', y: '63%', content: '<div style="position:relative;padding-top:max(70%,424px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/zljm/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      { x: '51%', y: '63%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/mkuz/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      { x: '61%', y: '63%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/roqz/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      { x: '71%', y: '63%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/mzej/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      
      { x: '87.5%', y: '63%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/sjbz/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' }
    ]
  },
  {
    src: 'assets/renders/sala6.jpg',
    hotspots: [ 
      { x: '32%', y: '52%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/encl/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      { x: '32%', y: '71%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/bumk/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      { x: '56%', y: '52%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/bwca/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      { x: '56%', y: '71%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/kcxk/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      { x: '82%', y: '52%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/sgss/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      { x: '82%', y: '71%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/rgee/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
    ]
  },
  {
    src: 'assets/renders/sala7.jpg',
    hotspots: [
      { x: '29.5%', y: '70%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/sxss/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
      { x: '83.5%', y: '64%', content: '<div style="position:relative;padding-top:max(60%,324px);width:100%;height:0;"><iframe style="position:absolute;border:none;width:100%;height:100%;left:0;top:0;" src="https://online.fliphtml5.com/ysimb/errk/"  seamless="seamless" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" ></iframe></div>' },
    ]
  }
];

function actualizarSlide() {
  const pared = document.getElementById('pared');
  pared.src = slides[slideIndex].src;

  // Limpiar hotspots anteriores
  document.querySelectorAll('.hotspot-dinamico').forEach(el => el.remove());



  // Agregar nuevos hotspots
  slides[slideIndex].hotspots.forEach(h => {
    const btn = document.createElement('button');
    btn.className = 'absolute z-40 hotspot-dinamico p-2 bg-white rounded-full shadow hover:bg-gray-200';
    btn.style.left = h.x;
    btn.style.top = h.y;
    btn.title = 'Abrir contenido';
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>';
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

slides[slideIndex].hotspots.forEach(h => {
  const btn = document.createElement('button');
  btn.className = 'hotspot-dinamico';
  btn.style.left = h.x;
  btn.style.top = h.y;
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h.01M12 15h.01M9 12h.01M12 9h.01M12 12h.01M12 12h.01M12 12h.01" />
    </svg>`;
  btn.onclick = () => mostrarPopup(h.content);
  document.getElementById('contenedor-pared').appendChild(btn);
});

function detectarOrientacion() {
  const alerta = document.getElementById('orientacion-alerta');
  const esVertical = window.innerHeight > window.innerWidth;

  if (window.innerWidth < 768 && esVertical) {
    alerta.classList.remove('hidden');
  } else {
    alerta.classList.add('hidden');
  }
}

window.addEventListener('resize', detectarOrientacion);
window.addEventListener('orientationchange', detectarOrientacion);
document.addEventListener('DOMContentLoaded', detectarOrientacion);