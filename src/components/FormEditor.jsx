import React, { useState, useEffect } from "react";
import { updateForm, fetchFormDetails } from "../services/formService";
import Loader from './Loader';

const FormEditor = ({ formId, onClose, onFormUpdated }) => {
  const [formDetails, setFormDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFormDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedFormDetails = await fetchFormDetails(formId);
        setFormDetails(fetchedFormDetails);
      } catch (error) {
        console.error("Error fetching form details:", error);
        setError("Failed to load form details.");
      } finally {
        setLoading(false);
      }
    };

    loadFormDetails();
  }, [formId]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formDetails.name.trim()) {
            newErrors.name = "El nombre del formulario es obligatorio";
            isValid = false;
        }
        if (!formDetails.description.trim()) {
            newErrors.description = "La descripción del formulario es obligatoria";
            isValid = false;
        }
        if (!formDetails.logo.trim()) {
            newErrors.logo = "La URL del logo es obligatoria";
            isValid = false;
        }

        if (!formDetails.questions || formDetails.questions.length === 0) {
            newErrors.questions = "Debe haber al menos una pregunta";
            isValid = false;
        } else {
            const questionErrors = [];
            formDetails.questions.forEach((q, index) => {
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
        setError(newErrors);
        return isValid;
    };

  const handleChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;

    if (questionIndex !== undefined) {
      setFormDetails((prevForm) => {
        const updatedQuestions = [...prevForm.questions];
        const currentQuestion = { ...updatedQuestions[questionIndex] };

        if (name === "question") {
          currentQuestion.question = value;
        } else if (name === "option") {
          const updatedOptions = [...currentQuestion.options];
          updatedOptions[optionIndex] = value;
          currentQuestion.options = updatedOptions;
        }

        updatedQuestions[questionIndex] = currentQuestion;
        return { ...prevForm, questions: updatedQuestions };
      });
    } else {
      setFormDetails((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleAddQuestion = () => {
    setFormDetails((prevForm) => ({
      ...prevForm,
      questions: [
        ...prevForm.questions,
        {
          id: crypto.randomUUID(),
          question: "",
          options: ["", "", ""],
        },
      ],
    }));
  };

    const handleAddOption = (questionIndex) => {
        setFormDetails(prevForm => {
            const updatedQuestions = [...prevForm.questions];
            const currentQuestion = { ...updatedQuestions[questionIndex] };
            const updatedOptions = [...currentQuestion.options, ""];
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
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 flex justify-center items-center z-50 text-red-500">
        {error}
      </div>
    );
  }

  if (!formDetails) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-2xl overflow-y-auto max-h-[80vh]">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Editar Formulario</h2>
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
            value={formDetails.name || ""}
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
            value={formDetails.description || ""}
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
            value={formDetails.logo || ""}
            onChange={(e) => handleChange(e)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error?.logo ? "border-red-500" : ""
            }`}
            required
            placeholder="Ingrese la URL del logo"
          />
          {error?.logo && <p className="text-red-500 text-xs italic">{error.logo}</p>}
        </div>

        {/* Questions Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Preguntas</h3>
           {error?.questions && typeof error.questions === 'string' && (
            <p className="text-red-500 text-sm italic mb-4">{error.questions}</p>
          )}
          {formDetails.questions.map((question, questionIndex) => (
            <div key={question.id} className="mb-6 p-4 rounded-md border border-gray-200">
              <div className="mb-4">
                <label
                  htmlFor={`question-${questionIndex}`}
                  className="block text-orange-500 text-sm font-bold mb-2"
                >
                  Pregunta {questionIndex + 1} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={`question-${questionIndex}`}
                  name="question"
                  value={question.question || ""}
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
                      value={option || ""}
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
                  className="text-orange-500 hover:text-orange-700 underline font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline mt-2"
                  onClick={() => handleAddOption(questionIndex)}
                >
                  + Añadir Opción
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
