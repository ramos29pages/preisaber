import axios from 'axios';

const API_URL = 'http://localhost:8000/asignaciones';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * crea todos los asigacniones desde la API.
 */
export const crearAsiganacion = async (userId, formId) => {


    let formData = new FormData();
    formData.append("user_id", userId);
    formData.append("form_id", formId);
    formData.append("created_at", new Date());

    console.log('ASIGANACION RECIBIDA=> :: ', formData);

  try {
    const response = await api.post("/", formData);
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    } else {
      return [{}];
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};



export const listarAsignaciones = async () => {
    try {
      const response = await api.get("/");
      console.log('ASIGNACIONES ==> ',response.data);
      return response.data;
  
    } catch (error) {
      console.error("Error fetching models:", error);
      throw error;
    }
  };