// src/services/modelService.js
import axios from "axios";

// Creamos una instancia con baseURL apuntando a nuestro backend :contentReference[oaicite:0]{index=0}turn2search3
const API = axios.create({
  // baseURL: "https://predisaber-backend.onrender.com/modelos"
  baseURL: "http://127.0.0.1:8000"
});


// src/services/modelService.js

// API base URL - adjust this to match your backend
// const API_URL = 'https://predisaber-backend.onrender.com'; // or your actual API URL
const API_URL = 'http://127.0.0.1:8000'; // or your actual API URL

export const listModels = async () => {
  try {
    const response = await axios.get(`${API_URL}/modelos`);
    console.log('LIST MODELS ==> ',response.data);
    return response.data;

  } catch (error) {
    console.error("Error fetching models:", error);
    throw error;
  }
};

export const createModel = async (modelData) => {
  try {

    console.log(modelData)
    const response = await axios.post(`${API_URL}/modelos/`, modelData);

    return response.data;
  } catch (error) {
    console.error("Error creating model:", error);
    throw error;
  }
};

export const getModelById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/modelos/ids/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching model with ID ${id}:`, error);
    throw error;
  }
};

export const getModelsByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/modelos/nombre/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching models with name ${name}:`, error);
    throw error;
  }
};

export const listModelNames = async () => {
  try {
    const response = await axios.get(`${API_URL}/modelos/nombres`);
    return response.data;
  } catch (error) {
    console.error("Error fetching model names:", error);
    throw error;
  }
};

export const listModelVersions = async () => {
  try {
    const response = await axios.get(`${API_URL}/modelos/versiones`);
    return response.data;
  } catch (error) {
    console.error("Error fetching model versions:", error);
    throw error;
  }
};

export const updateModel = async (id, modelData) => {
  try {
    const response = await axios.put(`${API_URL}/modelos/${id}`, modelData);
    return response.data;
  } catch (error) {
    console.error(`Error updating model with ID ${id}:`, error);
    throw error;
  }
};

export const deleteModel = async (id) => {
  try {
    await axios.delete(`${API_URL}/modelos/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting model with ID ${id}:`, error);
    throw error;
  }
};

// Obtiene todos los modelos de un nombre dado y extrae sus versiones :contentReference[oaicite:2]{index=2}
export const listModelVersionsByName = async (modelName) => {
  // Llamada al endpoint que devuelve array de modelos con ese nombre
  const { data } = await API.get(`/nombre/${encodeURIComponent(modelName)}`);
  // data = [{ id, nombre, version, … }, …]
  return data.map(m => m.version);
};
