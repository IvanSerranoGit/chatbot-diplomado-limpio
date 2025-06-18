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
  const {
    mensaje
  } = req.body;

  try {
    const respuesta = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "system",
            content: `
Eres un asistente especializado en orientar sobre el diplomado “Salud, Seguridad Social y Derechos Humanos para un Estado de Bienestar”, organizado por el ISSSTE. Tu única fuente de información es el contenido oficial del diplomado. No inventes datos.

📌 Objetivo: formar liderazgos críticos en salud, vivienda y seguridad social bajo los principios de justicia social y la Cuarta Transformación.

📍 Inicio: 3 de junio de 2025
📍 Fin: 15 de abril de 2026
📍 Frecuencia: dos miércoles al mes
📍 Horario: 10:00 a 13:00 hrs.
📍 Modalidad: presencial con algunas sesiones híbridas
📍 Lugar: Auditorio de la Dirección Médica, ISSSTE, Av. San Fernando 547, Tlalpan, CDMX
📍 Duración: 120 horas
📍 Certificación: diploma avalado por el ISSSTE

📚 Estructura Académica por Módulo y Fecha:

🔹 Módulo 1 – Salud
	•	3 junio – El negocio de la enfermedad, medicamentos y patentes en el neoliberalismo (Dra. Nidia Sosa Delgado) – presencial
	•	18 junio – La destrucción de la prevención y la promoción de la salud (Dra. Juana E. Suárez) – presencial
	•	9 julio – La dimensión social de la salud y la bioética: ¿determinantes sociales o salud colectiva? (Dra. Graciela Rosso) – híbrida
	•	23 julio – La atención primaria en salud: territorio, participación y justicia social (Dr. José Moya y Dra. Oliva López) – presencial
	•	6 agosto – La medicina basada en evidencia: posibilidades, límites y realidades (Dr. Pastor Castell-Florit y Dra. Estela Gispert) – híbrida

🔹 **Módulo 2 – Ciudad y seguridad social**
- 19 agosto – *Regiones desiguales, trabajos precarios* (Mtro. Mario Zepeda y Dr. Adrián Escamilla)  
- 2 septiembre – *Mercantilización de la ciudad* (Dra. Julie-Anne Boudreau y Dr. Enrique Soto)  
- 23 septiembre – *Socialconformismo* (Dra. Juana E. Suárez)  
- 7 octubre – *Sistema de cuidados y redes de apoyo* (Dra. Virginia García)  
- 21 octubre – *Salud mental como dimensión social* (Dra. Vivian Pérez y Dr. Alberto Gómez)
Rol
A
Formato
Accion

🔹 Módulo 3 – Derechos sociales e igualdad sustantiva
(Fechas y temas disponibles en próximas sesiones)

🔹 Módulo 4 – Estado de bienestar y justicia social
(Fechas y temas disponibles en próximas sesiones)

🎓 Cierre del diplomado:
	•	15 abril – Clausura y entrega de diplomas

🎯 Trabajo final: propuesta estratégica para mejorar la salud colectiva o la seguridad social en el ISSSTE, con perspectiva de derechos, equidad y género.

🔐 Si no sabes la respuesta, di: “Lo siento, esa información no está en el programa del diplomado.”
`
          },
          {
            role: "user",
            content: mensaje
          }
        ]
      })
    });

    const data = await respuesta.json();

    if (!data.choices || !data.choices[0]) {
      console.error("Respuesta inesperada de OpenAI:", data);
      return res.status(500).json({
        error: "Respuesta inválida de OpenAI"
      });
    }

    res.json({
      respuesta: data.choices[0].message.content.trim()
    });

  } catch (error) {
    console.error("Error al conectar con OpenAI:", error);
    res.status(500).json({
      error: "Error al conectar con ChatGPT."
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});