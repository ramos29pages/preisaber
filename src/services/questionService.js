// src/services/questionService.js
import axios from "axios";
const API_BASE = "http://localhost:8000";  // ajusta tu URL


const dummyQuestions = [

    {
        pregunta: "Tienes vivienda propia",
        respuestas: ["SI", "NO"],
    },
    {
        pregunta: "Cuantas personas viven con usted",
        respuestas: ["Mas de una", "Mas de tres", "Mas de cinco"],
    },
    {
        pregunta: "Cuál es su nivel de educación",
        respuestas: ["Primaria", "Secundaria", "Universitaria", "Posgrado"],
    },
    {
        pregunta: "Cuál es su rango de ingresos mensuales",
        respuestas: ["Menos de 1000 USD", "1000-3000 USD", "Más de 3000 USD"],
    },
    {
        pregunta: "Tiene vehículo propio",
        respuestas: ["SI", "NO"],
    },
    {
        pregunta: "Posee alguna discapacidad",
        respuestas: ["SI", "NO"],
    },
    {
        pregunta: "¿Ha viajado fuera del país en los últimos cinco años?",
        respuestas: ["SI", "NO"],
    },
    {
        pregunta: "¿Cuál es su estado civil?",
        respuestas: ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"],
    },
    {
        pregunta: "Tiene acceso a internet en casa",
        respuestas: ["SI", "NO"],
    },
    {
        pregunta: "Cuál es su ocupación principal",
        respuestas: ["Empleado", "Desempleado", "Estudiante", "Retirado", "Otro"],
    },

];


export const getQuestionsByType = async (type) => {

  try {
    const { data } = await axios.get(`${API_BASE}/questions/${type}`);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    } else {
      console.log("Backend sin datos, cargando dummyQuestions");
      return dummyQuestions;
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return dummyQuestions;    // <–– fallback en caso de error de red
  }
};
