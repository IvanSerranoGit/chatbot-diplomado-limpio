  // Menú responsive hamburguesa
const toggleButton = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggleButton?.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

const messagesDiv = document.getElementById("messages");
const form = document.getElementById("input-form");
const input = document.getElementById("input");

let typingElement = null; // Referencia global para el contenedor de "Escribiendo..."

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, "user");
  input.value = "";

  await obtenerRespuestaGPT(userMessage);
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = sender === "bot"
    ? "assets/bot.png"
    : "assets/user.png";

  const span = document.createElement("span");
  span.textContent = text;

  msg.appendChild(avatar);
  msg.appendChild(span);

  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function obtenerRespuestaGPT(pregunta) {
  // Eliminar anterior "escribiendo..." si quedó
  if (typingElement && typingElement.parentNode) {
    typingElement.remove();
    typingElement = null;
  }



  // Crear mensaje "Escribiendo..."
  typingElement = document.createElement("div");
  typingElement.classList.add("message", "bot");

  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = "assets/bot.png";

  const span = document.createElement("span");
  span.textContent = "Escribiendo";
  span.classList.add("typing");

  typingElement.appendChild(avatar);
  typingElement.appendChild(span);
  messagesDiv.appendChild(typingElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  try {
    const response = await fetch("https://chatbot-backend-u8k6.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mensaje: pregunta })
    });

    const data = await response.json();

    // 🔥 Verificación extra: si quedó vacío, se elimina
    if (
      typingElement &&
      typingElement.parentNode &&
      typingElement.textContent.trim() === ""
    ) {
      typingElement.remove();
      typingElement = null;
    }

    // 🔥 Eliminación estándar
    if (typingElement && typingElement.parentNode) {
      typingElement.remove();
      typingElement = null;
    }

    if (data.respuesta && data.respuesta.trim() !== "") {
      addMessage(data.respuesta, "bot");
    } else {
      addMessage("No recibí respuesta del servidor.", "bot");
    }

  } catch (error) {
    if (typingElement && typingElement.parentNode) {
      typingElement.remove();
      typingElement = null;
    }

    addMessage("Ocurrió un error al conectarse con ChatGPT.", "bot");
  }
}

// Mensaje de bienvenida al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  addMessage("Hola 👋 Soy el asistente del diplomado 'Salud, Seguridad Social y Derechos Humanos'. Pregúntame sobre fechas, módulos, docentes o requisitos del programa.", "bot");
});

// Mostrar/ocultar chat al hacer clic en el botón flotante
const chatButton = document.getElementById("chat-button");
const chatContainer = document.getElementById("chat-container");

chatButton.addEventListener("click", () => {
  if (chatContainer.style.display === "none") {
    chatContainer.style.display = "flex";
  } else {
    chatContainer.style.display = "none";
  }
});



// Carrusel interactividad
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dot");
const slideImages = slides.querySelectorAll("img");
const totalSlides = slideImages.length;
let index = 0;

function updateSlide(position) {
  slides.style.transform = `translateX(-${position * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-white", i !== position);
    dot.classList.toggle("bg-pink-700", i === position);
  });
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  updateSlide(index);
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlide(index);
}

if (document.getElementById("next") && document.getElementById("prev")) {
  document.getElementById("next").addEventListener("click", nextSlide);
  document.getElementById("prev").addEventListener("click", prevSlide);
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      updateSlide(index);
    });
  });
  setInterval(nextSlide, 5000);
  updateSlide(index);
}
// Popup modal
const openBtn = document.getElementById("open-popup");
const closeBtn = document.getElementById("close-popup");
const popup = document.getElementById("popup-modal");

openBtn?.addEventListener("click", () => {
  popup.classList.remove("hidden");
  popup.classList.add("flex");
});

closeBtn?.addEventListener("click", () => {
  popup.classList.add("hidden");
});