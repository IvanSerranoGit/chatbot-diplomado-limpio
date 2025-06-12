// script.js - Lógica JS del repositorio del museo

const sets = {
  archivo_historico: [
    { img: './assets/archivo_historico/sala1_Ley_de_Pensiones.jpg', flipbook: 'https://online.fliphtml5.com/ysimb/zljm/' },
    { img: './assets/archivo_historico/sala1_Portada_ley _el_ISSSTE.jpg', flipbook: 'https://online.fliphtml5.com/ysimb/mzej/' },
    { img: './assets/archivo_historico/sala1_Portada_Registro_de_Solicitudes.png', flipbook: 'https://online.fliphtml5.com/ysimb/mkuz/' },
    { img: './assets/archivo_historico/salla1_Portada_Expediente.png', flipbook: 'https://online.fliphtml5.com/ysimb/roqz/' },
  ],
  memoria_fotografica: [
    { img: 'assets/etno1.png', flipbook: 'https://online.fliphtml5.com/yzaa/bbcc/' },
    { img: 'assets/etno2.png', flipbook: 'https://online.fliphtml5.com/ccdd/eeff/' },
    { img: 'assets/etno3.png', flipbook: 'https://online.fliphtml5.com/gghh/iijj/' },
    { img: 'assets/etno4.png', flipbook: 'https://online.fliphtml5.com/kkll/mmnn/' },
    { img: 'assets/etno5.png', flipbook: 'https://online.fliphtml5.com/oopp/qqrr/' }
  ]
};

function mostrarSet(categoria) {
  const carrusel = document.getElementById('carrusel');
  carrusel.innerHTML = '';
  sets[categoria].forEach(item => {
    const img = document.createElement('img');
    img.src = item.img;
    img.className = 'inline-block h-48 mx-4 cursor-pointer transition-transform duration-200 hover:scale-105';
    img.addEventListener('click', () => abrirFlipbook(item.flipbook));
    carrusel.appendChild(img);
  });
}

function scrollCarrusel(direction) {
  const carrusel = document.getElementById('carrusel');
  carrusel.scrollBy({ left: direction * 300, behavior: 'smooth' });
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
