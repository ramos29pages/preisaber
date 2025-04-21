// src/services/modelService.js
import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000/models" });

const dummyModels = [
    {
      id: "1",
      name: "Modelo Pruebas TYT",
      accuracy: 0.85,               // precisión o efectividad en formato decimal
      uploader: "danielramos",      // quien subió el modelo
      date: "2025-04-20",           // fecha de subida (YYYY-MM-DD)
      fileUrl: "https://example.com/models/modelo_tyt.p"  // URL de descarga
    },
    {
      id: "2",
      name: "Modelo Pruebas Saber Pro",
      accuracy: 0.92,
      uploader: "danielramos",
      date: "2025-04-18",
      fileUrl: "https://example.com/models/modelo_saberpro.pickle"
    }
  ];
  

export const listModels = async () => {
  

  try {
    const { data } = await API.get("/");
    if (Array.isArray(data) && data.length > 0) {
      return data;
    } else {
      console.log("Backend sin datos, cargando dummyQuestions");
      return dummyModels;
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return dummyModels;    // <–– fallback en caso de error de red
  }

};

export const createModel = async (formData) => {
  const { data } = await API.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
