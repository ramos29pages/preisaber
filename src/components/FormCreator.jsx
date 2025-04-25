// src/components/FormCreator.jsx
import React, { useState } from "react";
import { createForm } from "../services/formService"; // Import the create service function

const FormCreator = ({ onClose, onFormCreated }) => {
  const [newForm, setNewForm] = useState({
    name: "",
    description: "",
    logo: "",
    // Add other relevant fields for form creation
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createForm(newForm); // Use the service function
      onFormCreated();
    } catch (err) {
      console.error("Error creating form:", err);
      setError("Failed to create form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Crear Nuevo Formulario</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newForm.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* ... other form fields ... */}
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
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default FormCreator; // Add this line
