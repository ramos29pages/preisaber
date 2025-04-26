// src/services/modelService.js
import axios from "axios";

// Creamos una instancia con baseURL apuntando a nuestro backend :contentReference[oaicite:0]{index=0}turn2search3
const API = axios.create({
  baseURL: "http://localhost:8000/modelos"
});

// Obtiene la lista de nombres de modelo (distinct "nombre") :contentReference[oaicite:1]{index=1}
export const listModelNames = async () => {
  const { data } = await API.get("/nombres");
  return data;  // ej. ["saber11", "saber3", ...]
};

// Obtiene todos los modelos de un nombre dado y extrae sus versiones :contentReference[oaicite:2]{index=2}
export const listModelVersionsByName = async (modelName) => {
  // Llamada al endpoint que devuelve array de modelos con ese nombre
  const { data } = await API.get(`/nombre/${encodeURIComponent(modelName)}`);
  // data = [{ id, nombre, version, … }, …]
  return data.map(m => m.version);
};
