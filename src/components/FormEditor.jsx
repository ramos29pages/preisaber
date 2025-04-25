// src/components/FormEditor.jsx
import React, { useState, useEffect } from "react";
import { updateForm, fetchForms } from "../services/formService";

const FormEditor = ({ formId, onClose, onFormUpdated }) => {
  const [formDetails, setFormDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Asumiendo que tienes una función para obtener los detalles del formulario por ID en tu servicio
        // Si no, puedes usar axios directamente aquí, pero lo ideal es tenerlo en el servicio
        const response = await fetchFormDetailsFromService(formId); //  <-- Cambié esto
        setFormDetails(response);
      } catch (error) {
        console.error("Error fetching form details:", error);
        setError("Failed to load form details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFormDetails();
  }, [formId]);

  // Esto debería estar en tu archivo de servicio formService.js
  const fetchFormDetailsFromService = async (formId) => {
      // eslint-disable-next-line no-useless-catch
      try {
          const response = await fetchForms(`/api/forms/${formId}`);
          return response.data;
      } catch(error){
          throw error;
      }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateForm(formId, formDetails);
      onFormUpdated();
    } catch (err) {
      console.error("Error updating form:", err);
      setError("Failed to update form.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        Loading form details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 text-red-500">
        {error}
      </div>
    );
  }

  if (!formDetails) {
    return null;
  }

  return (
    <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Editar Formulario</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formDetails.name || ""}
            onChange={handleChange} // <-- Aquí se usa handleChange
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formDetails.description || ""}
            onChange={handleChange} // <-- Y aquí
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="logo" className="block text-gray-700 text-sm font-bold mb-2">
            URL del Logo
          </label>
          <input
            type="text"
            id="logo"
            name="logo"
            value={formDetails.logo || ""}
            onChange={handleChange} // <-- Y aquí
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditor;
