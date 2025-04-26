import React, { useState, useEffect } from "react";
import { createForm, fetchAvailableModels, fetchModelVersions } from "../services/formService"; // Asegúrate de tener estas funciones en tu servicio

const FormCreator = ({ onClose, onFormCreated }) => {
  const [newForm, setNewForm] = useState({
    name: "",
    description: "",
    logo: "",
    questions: [
      {
        id: crypto.randomUUID(),
        question: "",
        options: ["", "", ""], // Start with 3 empty options
      },
    ],
    modelName: "",
    modelVersion: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [modelVersions, setModelVersions] = useState([]);

  useEffect(() => {
    const loadAvailableModels = async () => {
      try {
        const models = await fetchAvailableModels();
        setAvailableModels(models);
      } catch (err) {
        console.error("Error fetching available models:", err);
        setError("Failed to load available models.");
      }
    };

    loadAvailableModels();
  }, []);

  useEffect(() => {
    const loadModelVersions = async () => {
      if (newForm.modelName) {
        try {
          const versions = await fetchModelVersions(newForm.modelName);
          setModelVersions(versions);
          // Reset modelVersion when modelName changes
          setNewForm(prevForm => ({ ...prevForm, modelVersion: "" }));
        } catch (err) {
          console.error(`Error fetching versions for model ${newForm.modelName}:`, err);
          setError(`Failed to load versions for model ${newForm.modelName}.`);
          setModelVersions([]);
        }
      } else {
        setModelVersions([]);
        setNewForm(prevForm => ({ ...prevForm, modelVersion: "" }));
      }
    };

    loadModelVersions();
  }, [newForm.modelName]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!newForm.name.trim()) {
      newErrors.name = "El nombre del formulario es obligatorio";
      isValid = false;
    }
    if (!newForm.description.trim()) {
      newErrors.description = "La descripción del formulario es obligatoria";
      isValid = false;
    }
    if (!newForm.logo.trim()) {
      newErrors.logo = "La URL del logo es obligatoria";
      isValid = false;
    }

    if (!newForm.questions || newForm.questions.length === 0) {
      newErrors.questions = "Debe haber al menos una pregunta";
      isValid = false;
    } else {
      const questionErrors = [];
      newForm.questions.forEach((q, index) => {
        const qError = {};
        if (!q.question.trim()) {
          qError.question = "La pregunta es obligatoria";
          isValid = false;
        }
        if (!q.options || q.options.length < 2 || q.options.some(opt => !opt.trim())) {
          qError.options = "Cada pregunta debe tener al menos 2 opciones y no pueden estar vacías";
          isValid = false;
        }
        if (Object.keys(qError).length > 0) {
          questionErrors[index] = qError;
        }
      });
      if (questionErrors.length > 0) {
        newErrors.questions = questionErrors;
      }
    }

    if (!newForm.modelName) {
      newErrors.modelName = "Debe seleccionar un modelo";
      isValid = false;
    }

    if (!newForm.modelVersion) {
      newErrors.modelVersion = "Debe seleccionar una versión del modelo";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;

    if (questionIndex !== undefined) {
      // Handling question or option change
      setNewForm((prevForm) => {
        const updatedQuestions = [...prevForm.questions];
        const currentQuestion = { ...updatedQuestions[questionIndex] };

        if (name === "question") {
          currentQuestion.question = value;
        } else if (name === "option") {
          // Handle option change
          const updatedOptions = [...currentQuestion.options];
          updatedOptions[optionIndex] = value;
          currentQuestion.options = updatedOptions;
        }
        updatedQuestions[questionIndex] = currentQuestion;
        return { ...prevForm, questions: updatedQuestions };
      });
    } else {
      // Handling form level change (name, description, logo, modelName, modelVersion)
      setNewForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleAddQuestion = () => {
    setNewForm((prevForm) => ({
      ...prevForm,
      questions: [
        ...prevForm.questions,
        {
          id: crypto.randomUUID(),
          question: "",
          options: ["", "", ""], // Start with 3 empty options
        },
      ],
    }));
  };

  const handleAddOption = (questionIndex) => {
    setNewForm(prevForm => {
      const updatedQuestions = [...prevForm.questions];
      const currentQuestion = { ...updatedQuestions[questionIndex] };
      const updatedOptions = [...currentQuestion.options, ""];  // Add an empty option
      currentQuestion.options = updatedOptions;
      updatedQuestions[questionIndex] = currentQuestion;
      return { ...prevForm, questions: updatedQuestions };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const createdForm = await createForm(newForm); // Use the service function
      onFormCreated(createdForm); // Pass the created form data
      onClose();
    } catch (err) {
      console.error("Error creating form:", err);
      setError("Failed to create form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-2xl overflow-y-auto max-h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Formulario</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Form Fields */}
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newForm.name}
            onChange={(e) => handleChange(e)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error?.name ? "border-red-500" : ""
            }`}
            required
            placeholder="Ingrese el nombre del formulario"
          />
          {error?.name && <p className="text-red-500 text-xs italic">{error.name}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={newForm.description}
            onChange={(e) => handleChange(e)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error?.description ? "border-red-500" : ""
            }`}
            required
            placeholder="Ingrese la descripción del formulario"
          />
          {error?.description && <p className="text-red-500 text-xs italic">{error.description}</p>}
        </div>
        <div>
          <label htmlFor="logo" className="block text-gray-700 text-sm font-bold mb-2">
            URL del Logo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="logo"
            name="logo"
            value={newForm.logo}
            onChange={(e) => handleChange(e)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error?.logo ? "border-red-500" : ""
            }`}
            required
            placeholder="Ingrese la URL del logo"
          />
          {error?.logo && <p className="text-red-500 text-xs italic">{error.logo}</p>}
        </div>

        {/* Model Selection */}
        <div>
          <label htmlFor="modelName" className="block text-gray-700 text-sm font-bold mb-2">
            Modelo <span className="text-red-500">*</span>
          </label>
          <select
            id="modelName"
            name="modelName"
            value={newForm.modelName}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error?.modelName ? "border-red-500" : ""
            }`}
            required
          >
            <option value="">Seleccione un modelo</option>
            {availableModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
          {error?.modelName && <p className="text-red-500 text-xs italic">{error.modelName}</p>}
        </div>

        {/* Model Version Selection */}
        <div>
          <label htmlFor="modelVersion" className="block text-gray-700 text-sm font-bold mb-2">
            Versión del Modelo <span className="text-red-500">*</span>
          </label>
          <select
            id="modelVersion"
            name="modelVersion"
            value={newForm.modelVersion}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error?.modelVersion ? "border-red-500" : ""
            }`}
            required
            disabled={!newForm.modelName || modelVersions.length === 0}
          >
            <option value="">Seleccione una versión</option>
            {modelVersions.map(version => (
              <option key={version} value={version}>{version}</option>
            ))}
          </select>
          {error?.modelVersion && <p className="text-red-500 text-xs italic">{error.modelVersion}</p>}
        </div>

        {/* Questions Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Preguntas</h3>
          {error?.questions && typeof error.questions === 'string' && (
            <p className="text-red-500 text-sm italic mb-4">{error.questions}</p>
          )}
          {newForm.questions.map((question, questionIndex) => (
            <div key={question.id} className="mb-6 p-4 rounded-md border border-gray-200">
              <div className="mb-4">
                <label
                  htmlFor={`question-${questionIndex}`}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Pregunta {questionIndex + 1} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={`question-${questionIndex}`}
                  name="question"
                  value={question.question}
                  onChange={(e) => handleChange(e, questionIndex)}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    error?.questions?.[questionIndex]?.question ? "border-red-500" : ""
                  }`}
                  required
                  placeholder={`Ingrese la pregunta ${questionIndex + 1}`}
                />
                {error?.questions?.[questionIndex]?.question && (
                  <p className="text-red-500 text-xs italic">
                    {error.questions[questionIndex].question}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Opciones <span className="text-red-500">*</span>
                </label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-2 flex gap-2">
                    <input
                      type="text"
                      name="option"
                      value={option}
                      onChange={(e) => handleChange(e, questionIndex, optionIndex)}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        error?.questions?.[questionIndex]?.options ? "border-red-500" : ""
                      }`}
                      required
                      placeholder={`Opción ${optionIndex + 1}`}
                    />
                  </div>
                ))}
                {error?.questions?.[questionIndex]?.options && (
                  <p className="text-red-500 text-xs italic">
                    {error.questions[questionIndex].options}
                  </p>
                )}
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                  onClick={() => handleAddOption(questionIndex)}
                >
                  Añadir Opción
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddQuestion}
          >
            Añadir Pregunta
          </button>
        </div>

        {/* Submit and Cancel Buttons */}
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

export default FormCreator;