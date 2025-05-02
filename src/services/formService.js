// src/services/formService.js
import axios from "axios";

const API_BASE_URL = "https://predisaber-backend.onrender.com/formularios"; // Define your base API URL

const api = axios.create({
  baseURL: API_BASE_URL,  // apunta directo al backend
});

// const dummyForms = [
//   {
//     id: "dummy-1",
//     name: "Dummy Form 1",
//     description: "This is a dummy form for testing.",
//     logo: "images/pro.webp",
//     questions: [
//       {
//         id: "q1",
//         question: "What is your name?",   
//         options : ['Option 1', 'Option 2', 'Option 3'],
//       },
//       {
//         id: "q2",
//         question: "What is your name?",   
//         options : ['Option 1', 'Option 2', 'Option 3'],
//       },
//     ]
//   },
//   {
//     id: "dummy-2",
//     name: "Dummy Form 2",
//     description: "Another dummy form example.",
//     logo: "images/tyt.jpg",
//     questions: [
//       {
//         id: "q1",
//         question: "What is your name?",   
//         options : ['Option 1', 'Option 2', 'Option 3'],
//       },
//       {
//         id: "q2",
//         question: "What is your name?",   
//         options : ['Option 1', 'Option 2', 'Option 3'],
//       },
//     ]
//   },
// ];


const fetchForms = async () => {
  try {
    const response = await api.get(API_BASE_URL);
    console.log("Response data axios:", response.data); // Debugging line
    return response.data;
    // return response.data.length > 0 ? response.data : dummyForms;
  } catch (error) {
    console.error("Error fetching forms service:", error);
    // Return dummy data on error, *after* logging the error
    // return dummyForms;
  }
};

const updateForm = async (formId, formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${formId}`, formData);
    return response.data; // Or any data you expect back after update
  } catch (error) {
    console.error(`Error updating form with ID ${formId}:`, error);
    throw error;
  }
};

const createForm = async (formData) => {
  try {
    const response = await axios.post(API_BASE_URL, formData);
    return response.data; // Or the newly created form data
  } catch (error) {
    console.error("Error creating form:", error);
    throw error;
  }
};

const deleteForm = async (formId)=>{
  try {
    const response = await api.delete(`${API_BASE_URL}/${formId}`);
    return response.data
  } catch (error) {
    console.error(`Error fetching form details for ID ${formId}`, error);
    throw error;
  }

}

const fetchFormDetails = async (formId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${formId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching form details for ID ${formId}`, error);
    throw error;
  }
};

// Función para obtener la lista de modelos disponibles
const fetchAvailableModels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/models`); // Ajusta la ruta según tu API
    return response.data; // Se espera que el backend devuelva un array de nombres de modelos
  } catch (error) {
    console.error("Error fetching available models:", error);
    throw error;
  }
};

// Función para obtener las versiones de un modelo específico
const fetchModelVersions = async (modelName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/models/${modelName}/versions`); // Ajusta la ruta según tu API
    return response.data; // Se espera que el backend devuelva un array de versiones del modelo
  } catch (error) {
    console.error(`Error fetching versions for model ${modelName}:`, error);
    throw error;
  }
};

export { fetchForms, updateForm, deleteForm, createForm, fetchFormDetails, fetchAvailableModels, fetchModelVersions };
