// src/services/formService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/forms"; // Define your base API URL

const api = axios.create({
  baseURL: API_BASE_URL,  // apunta directo al backend
});

const dummyForms = [
  {
    id: "dummy-1",
    name: "Dummy Form 1",
    description: "This is a dummy form for testing.",
    logo: "images/pro.webp",
    questionCount: 10,
    effectiveness: "50%",
  },
  {
    id: "dummy-2",
    name: "Dummy Form 2",
    description: "Another dummy form example.",
    logo: "images/tyt.jpg",
    questionCount: 5,
    effectiveness: "75%",
  },
];

const fetchForms = async () => {
  try {
    const response = await api.get(API_BASE_URL);
    console.log("Response data axios:", response.data); // Debugging line
    return response.data.length > 0 ? response.data : dummyForms;
  } catch (error) {
    console.error("Error fetching forms service:", error);
    // Return dummy data on error, *after* logging the error
    return dummyForms;
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

const fetchFormDetails = async (formId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${formId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching form details for ID ${formId}`, error);
    throw error;
  }
};

export { fetchForms, updateForm, createForm, fetchFormDetails };
