import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/resultados",
  headers: { "Content-Type": "application/json" },
});

// (Opcional) interceptor de respuestas
api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);


// Obtener todos los resultados
export async function getAllResultados(skip = 0, limit = 100) {
  return api
    .get(`?skip=${skip}&limit=${limit}`)
    .then(res => res.data);
}

// Obtener un resultado por ID
export async function getResultadoById(id) {
  return api
    .get(`/${id}`)
    .then(res => res.data);
}

// Crear un nuevo resultado
export async function createResultado(payload) {
  return api
    .post("", payload)
    .then(res => res.data);
}

// Eliminar un resultado
export async function deleteResultado(id) {
  return api
    .delete(`/${id}`)
    .then(res => res.data);
}

