const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Usa node-fetch@2
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://ivanserranogit.github.io'
}));
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { mensaje } = req.body;

  try {
    const respuesta = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
Eres un asistente especializado en orientar sobre el diplomado "Salud, Seguridad Social y Derechos Humanos para un Estado de Bienestar", organizado por el ISSSTE. Tu única fuente de información es el contenido oficial del diplomado. No inventes datos.

📌 **Objetivo:** formar liderazgos críticos en salud, vivienda y seguridad social bajo los principios de justicia social y la Cuarta Transformación.

📍 **Inicio:** 3 de junio de 2025  
📍 **Fin:** 14 de abril de 2026  
📍 **Frecuencia:** dos martes al mes  
📍 **Horario:** 10:00 a 13:00 hrs.  
📍 **Modalidad:** presencial con algunas sesiones híbridas  
📍 **Lugar:** Sala de Juntas, Dirección General del ISSSTE, Av. San Fernando 547, Tlalpan, CDMX  
📍 **Duración:** 120 horas  
📍 **Certificación:** diploma avalado por el ISSSTE

📚 **Estructura Académica por Módulo y Fecha:**

🔹 **Módulo 1 – Salud**
- 3 junio – *El negocio de la enfermedad* (Dra. Nidia Sosa Delgado) – presencial  
- 17 junio – *Prevención y promoción de la salud* (Dra. Juana E. Suárez) – presencial  
- 8 julio – *Determinantes sociales y bioética* (Dra. Graciela Z. Rosso) – híbrida  
- 22 julio – *Atención primaria en salud* (Dr. José Moya y Dra. Oliva López) – presencial  
- 5 agosto – *Medicina basada en evidencia* (Dr. Pastor Castell-Florit y Dra. Estela Gispert) – híbrida

🔹 **Módulo 2 – Ciudad y seguridad social**
- 19 agosto – *Regiones desiguales, trabajos precarios* (Mtro. Mario Zepeda y Dr. Adrián Escamilla)  
- 2 septiembre – *Mercantilización de la ciudad* (Dra. Julie-Anne Boudreau y Dr. Enrique Soto)  
- 23 septiembre – *Socialconformismo* (Dra. Juana E. Suárez)  
- 7 octubre – *Sistema de cuidados y redes de apoyo* (Dra. Virginia García)  
- 21 octubre – *Salud mental como dimensión social* (Dra. Vivian Pérez y Dr. Alberto Gómez)

🔹 **Módulo 3 – Derechos sociales e igualdad sustantiva**
- 4 nov – *Destrucción neoliberal de los derechos sociales* (Dr. Marcos Roitman) – híbrida  
- 18 nov – *Grupos vulnerables en servicios sociales* (Dra. Nidia Sosa) – presencial  
- 2 dic – *Envejecimiento y seguridad social* (Dra. Graciela Z. Rosso) – híbrida  
- 16 dic – *Brechas de género y trabajo no remunerado* (Dra. Virginia García Sánchez)  
- 13 enero – *Igualdad formal vs sustantiva* (Dra. Ma. Elvira Concheiro)

🔹 **Módulo 4 – Estado de bienestar y justicia social**
- 27 enero – *Modelos internacionales de bienestar* (Dra. Berenice P. Ramírez)  
- 10 febrero – *Estado de bienestar en México y 4T* (Paco Ignacio Taibo II y Mtro. Pablo Yanes)  
- 24 febrero – *Tecnologías para el bienestar* (Dra. Tatiana Fiordelisio)  
- 10 marzo – *Historia del ISSSTE* (Dra. Amparo Ruiz del Castillo)  
- 24 marzo – *Repensando al ISSSTE* (Dr. Martí Batres Guadarrama)

🎓 **Cierre del diplomado:**
- 7 abril – Entrega del trabajo final
- 14 abril – Clausura y entrega de diplomas (Dr. Martí Batres Guadarrama)

🎯 **Trabajo final:** propuesta estratégica para mejorar salud colectiva o seguridad social dentro del ISSSTE con enfoque de derechos, equidad y género.

🔐 Si no sabes la respuesta, di: “Lo siento, esa información no está en el programa del diplomado.”
`
          },
          { role: "user", content: mensaje }
        ]
      })
    });

    const data = await respuesta.json();

    if (!data.choices || !data.choices[0]) {
      console.error("Respuesta inesperada de OpenAI:", data);
      return res.status(500).json({ error: "Respuesta inválida de OpenAI" });
    }

    res.json({ respuesta: data.choices[0].message.content.trim() });

  } catch (error) {
    console.error("Error al conectar con OpenAI:", error);
    res.status(500).json({ error: "Error al conectar con ChatGPT." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
}); 