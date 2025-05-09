// src/services/questionService.js
import axios from "axios";
const API_BASE = "https://predisaber-backend.onrender.com";  // ajusta tu URL


// const dummyQuestions = [

//     {
//         pregunta: "Tienes vivienda propia",
//         respuestas: ["SI", "NO"],
//     },
//     {
//         pregunta: "Cuantas personas viven con usted",
//         respuestas: ["Mas de una", "Mas de tres", "Mas de cinco"],
//     },
//     {
//         pregunta: "Cuál es su nivel de educación",
//         respuestas: ["Primaria", "Secundaria", "Universitaria", "Posgrado"],
//     },
//     {
//         pregunta: "Cuál es su rango de ingresos mensuales",
//         respuestas: ["Menos de 1000 USD", "1000-3000 USD", "Más de 3000 USD"],
//     },
//     {
//         pregunta: "Tiene vehículo propio",
//         respuestas: ["SI", "NO"],
//     },
//     {
//         pregunta: "Posee alguna discapacidad",
//         respuestas: ["SI", "NO"],
//     },
//     {
//         pregunta: "¿Ha viajado fuera del país en los últimos cinco años?",
//         respuestas: ["SI", "NO"],
//     },
//     {
//         pregunta: "¿Cuál es su estado civil?",
//         respuestas: ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"],
//     },
//     {
//         pregunta: "Tiene acceso a internet en casa",
//         respuestas: ["SI", "NO"],
//     },
//     {
//         pregunta: "Cuál es su ocupación principal",
//         respuestas: ["Empleado", "Desempleado", "Estudiante", "Retirado", "Otro"],
//     },

// ];


export const getAsignmentsPending = async () => {

  try {
    const { data } = await axios.get(`${API_BASE}/asignaciones`);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return;    // <–– fallback en caso de error de red
  }
};
