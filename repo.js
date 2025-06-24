// script.js - Lógica JS del repositorio del museo

const sets = {
  archivo_historico: [
    
    {
      img: './assets/archivo_historico/sala1_Ley_de_Pensiones.jpg',
      flipbook: 'https://online.fliphtml5.com/ysimb/zljm/',
      titulo: 'Ley de Pensiones Civiles de 1925'
    },
    {
      img: './assets/archivo_historico/sala1_Portada_ley _el_ISSSTE.jpg',
      flipbook: 'https://online.fliphtml5.com/ysimb/mzej/',
      titulo: 'Registro de Solicitudes de Pensiones Civiles, 1° de octubre de 1925 texto'
    },
    {
      img: './assets/archivo_historico/sala1_Portada_Registro_de_Solicitudes.png', flipbook: 'https://online.fliphtml5.com/ysimb/mkuz/',
      titulo: 'Expediente Dirección de Pensiones Civiles de Retiro'
    },
    {
      img: './assets/archivo_historico/salla1_Portada_Expediente.png',
      flipbook: 'https://online.fliphtml5.com/ysimb/roqz/',
      titulo: 'Ley del ISSSTE'
    },
  ],
  memoria_fotografica: [
    {
      img: 'assets/memoria_fotografica/mem1.png',
      flipbook: 'https://online.fliphtml5.com/ysimb/rxqr/',
      titulo: 'Hombre manifestante reprimido por la policía'
    },
    { 
      img: 'assets/memoria_fotografica/mem2.png',
      flipbook: 'https://online.fliphtml5.com/ysimb/sjbz/',
      titulo: 'Maestro manifestante perseguido por policía'
      
    },
    { 
      img: 'assets/memoria_fotografica/mem3.png',
      flipbook: 'https://online.fliphtml5.com/ysimb/bwca/',
      titulo: 'La mirada disidente de Rodrigo Moya: representaciones fotográficas de marchas y protestas políticas (1958-1967)'
    },
    { 
      img: 'assets/memoria_fotografica/mem4.png',
      flipbook: 'https://online.fliphtml5.com/ysimb/encl/',
      titulo: 'La mirada disidente de Rodrigo Moya: representaciones fotográficas de marchas y protestas políticas (1958-1967)'
    },
    { 
      img: 'assets/memoria_fotografica/mem5.png',
      flipbook: 'https://online.fliphtml5.com/ysimb/rgee/',
      titulo: 'La mirada disidente de Rodrigo Moya: representaciones fotográficas de marchas y protestas políticas (1958-1967)'
    },
    { 
      img: 'assets/memoria_fotografica/mem6.png',
      flipbook: 'https://online.fliphtml5.com/ysimb/bumk/',
      titulo: 'Manifestación magisterial, frente a Palacio Nacional'
    },
    { 
      img: 'assets/memoria_fotografica/mem7.png',
      flipbook: 'https://online.fliphtml5.com/ysimb/kcxk/',
      titulo: 'Manifestacion del Movimiento Revolucionario Magisterial'
    },
    { 
      img: 'assets/memoria_fotografica/mem8.webp',
      flipbook: 'https://online.fliphtml5.com/ysimb/sgss/',
      titulo: 'Manifestación del MRM' 
    }
  ]
};

let carruselIndex = 0;
let carruselItems = [];
let itemsPorVista = 3;

function mostrarSet(categoria) {
  const carrusel = document.getElementById('carrusel');
  carrusel.innerHTML = '';
  carruselIndex = 0;
  carruselItems = sets[categoria];

  carruselItems.forEach(item => {
    const contenedor = document.createElement('div');
    contenedor.className = 'w-72 sm:w-80 flex-shrink-0 text-center';

    const img = document.createElement('img');
    img.src = item.img;
    img.className = 'h-64 object-cover rounded-lg mx-auto cursor-pointer transition-transform duration-300 hover:scale-105';
    img.addEventListener('click', () => abrirFlipbook(item.flipbook));

    const titulo = document.createElement('p');
    titulo.className = 'text-white mt-2 text-sm';
    titulo.innerText = item.titulo || 'Documento';

    contenedor.appendChild(img);
    contenedor.appendChild(titulo);
    carrusel.appendChild(contenedor);
  });

  actualizarCarrusel();
}

function scrollCarrusel(direccion) {
  if (window.innerWidth < 768) return; // en móviles no usamos índice
  const total = carruselItems.length;
  carruselIndex += direccion;

  if (carruselIndex < 0) {
    carruselIndex = total - itemsPorVista;
  } else if (carruselIndex > total - itemsPorVista) {
    carruselIndex = 0;
  }

  actualizarCarrusel();
}

function actualizarCarrusel() {
  const carrusel = document.getElementById('carrusel');

  if (window.innerWidth < 768) {
    carrusel.style.transform = 'translateX(0)';
    return;
  }

  const itemWidth = carrusel.children[0]?.offsetWidth || 0;
  const gap = 24;
  const offset = carruselIndex * (itemWidth + gap);
  carrusel.style.transform = `translateX(-${offset}px)`;
}

function abrirFlipbook(url) {
  const modal = document.getElementById('modal-flipbook');
  const iframe = document.getElementById('iframe-flipbook');
  iframe.src = url;
  modal.classList.remove('hidden');
}

function cerrarFlipbook() {
  const modal = document.getElementById('modal-flipbook');
  const iframe = document.getElementById('iframe-flipbook');
  iframe.src = '';
  modal.classList.add('hidden');
}

const paginas = ['assets/comic1.jpg', 'assets/comic2.jpg', 'assets/comic3.jpg'];
let indiceActual = 0;
function cambiarPagina(direccion) {
  indiceActual += direccion;
  if (indiceActual < 0) indiceActual = paginas.length - 1;
  if (indiceActual >= paginas.length) indiceActual = 0;
  document.getElementById('pagina-comic').src = paginas[indiceActual];
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarSet('archivo_historico');
  const video = document.querySelector('video');
  const source = video.querySelector('source');
  source.src = source.dataset.src;
  video.load();
});

// menu hamburguesa

  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });