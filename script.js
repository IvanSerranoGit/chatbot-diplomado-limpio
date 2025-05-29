const messagesDiv = document.getElementById("messages");
const form = document.getElementById("input-form");
const input = document.getElementById("input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, "user");
  input.value = "";

  const respuesta = await obtenerRespuestaGPT(userMessage);
  addMessage(respuesta, "bot");
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = sender === "bot"
    ? "assets/bot.png"  // avatar del bot
    : "assets/user.png"; // avatar del usuario

  const span = document.createElement("span");
  span.textContent = text;

  msg.appendChild(avatar);
  msg.appendChild(span);

  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function obtenerRespuestaGPT(pregunta) {
  const escribiendoMsg = document.createElement("div");
  escribiendoMsg.classList.add("message", "bot");
  escribiendoMsg.id = "typing";

  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = "https://i.imgur.com/MT3q3Hr.png";

  const span = document.createElement("span");
  span.textContent = "Escribiendo";
  span.classList.add("typing");

  escribiendoMsg.appendChild(avatar);
  escribiendoMsg.appendChild(span);
  messagesDiv.appendChild(escribiendoMsg);
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
    const typingElement = document.getElementById("typing");
    if (typingElement) typingElement.remove();

    if (data.respuesta && data.respuesta.trim() !== "") {
      addMessage(data.respuesta, "bot");
    } else {
      addMessage("No recibí respuesta del servidor.", "bot");
    }
  } catch (error) {
    const typingElement = document.getElementById("typing");
    if (typingElement) typingElement.remove();

    addMessage("Ocurrió un error al conectarse con ChatGPT.", "bot");
  }
}

// Mensaje de bienvenida al cargar
window.addEventListener("DOMContentLoaded", () => {
  addMessage("Hola 👋 Soy el asistente del diplomado 'Salud, Seguridad Social y Derechos Humanos'. Puedes preguntarme lo que necesites sobre fechas, módulos, docentes o requisitos del programa.", "bot");
});