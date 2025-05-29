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