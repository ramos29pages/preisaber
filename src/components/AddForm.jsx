import React, { useState, useEffect } from "react";
import { createForm } from "../services/formService";
import { listModelNames, listModelVersionsByName } from "../services/modelService";

const AddForm = ({ onClose, onFormCreated }) => {
  const [newForm, setNewForm] = useState({
    name: "",
    description: "",
    logo: "",
    questions: [{ id: crypto.randomUUID(), question: "", options: ["", ""] }],
    modelName: "",
    modelVersion: ""
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [modelVersions, setModelVersions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setAvailableModels(await listModelNames());
      } catch {
        setError(e => ({ ...e, modelName: "No se pudieron cargar modelos" }));
      }
    })();
  }, []);

  useEffect(() => {
    if (!newForm.modelName) return setModelVersions([]);
    (async () => {
      try {
        setModelVersions(await listModelVersionsByName(newForm.modelName));
        setNewForm(f => ({ ...f, modelVersion: "" }));
      } catch {
        setError(e => ({ ...e, modelVersion: "No se pudieron cargar versiones" }));
      }
    })();
  }, [newForm.modelName]);

  const handleChange = (e, qIndex, optIndex) => {
    const { name, value } = e.target;
    if (qIndex != null) {
      setNewForm(f => {
        const qs = [...f.questions];
        const q = { ...qs[qIndex] };
        if (name === "question") q.question = value;
        else if (name === "option") q.options[optIndex] = value;
        qs[qIndex] = q;
        return { ...f, questions: qs };
      });
    } else setNewForm(f => ({ ...f, [name]: value }));
  };

  const validateForm = () => {
    const errs = {};
    if (!newForm.name.trim()) errs.name = "Nombre obligatorio";
    if (!newForm.description.trim()) errs.description = "Descripción obligatoria";
    if (!newForm.logo.trim()) errs.logo = "Logo obligatorio";
    if (!newForm.modelName) errs.modelName = "Seleccione un modelo";
    if (!newForm.modelVersion) errs.modelVersion = "Seleccione versión";
    if (!newForm.questions.length) errs.questions = "Debe haber al menos una pregunta";
    setError(errs);
    return !Object.keys(errs).length;
  };

  const handleAddQuestion = () => {
    setNewForm(f => ({
      ...f,
      questions: [...f.questions, { id: crypto.randomUUID(), question: "", options: ["", ""] }]
    }));
  };

  const handleAddOption = qIndex => {
    setNewForm(f => {
      const qs = [...f.questions];
      const q = { ...qs[qIndex], options: [...qs[qIndex].options, ""] };
      qs[qIndex] = q;
      return { ...f, questions: qs };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      onFormCreated(await createForm(newForm));
      onClose();
    } catch {
      setError(e => ({ ...e, submit: "Error al crear formulario" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-orange-500 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Crear Formulario</h2>
          <button onClick={onClose} className="text-white text-2xl leading-none">&times;</button>
        </div>
        {/* Body con scroll */}
        <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200">
          {/* Campos básicos */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Nombre*</label>
              <input name="name" value={newForm.name} onChange={handleChange}
                     className="w-full border rounded p-2" />
              {error.name && <p className="text-red-500">{error.name}</p>}
            </div>
            <div>
              <label className="block mb-1">Descripción*</label>
              <textarea name="description" value={newForm.description}
                        onChange={handleChange}
                        className="w-full border rounded p-2" />
              {error.description && <p className="text-red-500">{error.description}</p>}
            </div>
            <div>
              <label className="block mb-1">Logo URL*</label>
              <input name="logo" value={newForm.logo} onChange={handleChange}
                     className="w-full border rounded p-2" />
              {error.logo && <p className="text-red-500">{error.logo}</p>}
            </div>
            {/* Modelo y versión */}
            <div>
              <label className="block mb-1">Modelo*</label>
              <select name="modelName" value={newForm.modelName}
                      onChange={handleChange}
                      className="w-full border rounded p-2">
                <option value="">-- Seleccione --</option>
                {availableModels.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              {error.modelName && <p className="text-red-500">{error.modelName}</p>}
            </div>
            <div>
              <label className="block mb-1">Versión*</label>
              <select name="modelVersion" value={newForm.modelVersion}
                      onChange={handleChange}
                      disabled={!modelVersions.length}
                      className="w-full border rounded p-2">
                <option value="">-- Seleccione --</option>
                {modelVersions.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              {error.modelVersion && <p className="text-red-500">{error.modelVersion}</p>}
            </div>
            {/* Preguntas dinámicas */}
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-2">Preguntas</h3>
              {newForm.questions.map((q, qi) => (
                <div key={q.id} className="mb-4 border rounded p-4">
                  <input name="question" value={q.question}
                         onChange={e => handleChange(e, qi)}
                         placeholder={`Pregunta ${qi+1}`}
                         className="w-full border rounded p-2 mb-2" />
                  {q.options.map((opt, oi) => (
                    <input key={oi} name="option" value={opt}
                           onChange={e => handleChange(e, qi, oi)}
                           placeholder={`Opción ${oi+1}`}
                           className="w-full border rounded p-2 mb-1" />
                  ))}
                  <button type="button"
                          onClick={() => handleAddOption(qi)}
                          className="text-sm text-orange-500 hover:text-orange-700">
                    + Añadir Opción
                  </button>
                </div>
              ))}
              <button type="button"
                      onClick={handleAddQuestion}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                + Añadir Pregunta
              </button>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-100 flex justify-end">
          <button onClick={onClose}
                  className="mr-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white">
            {loading ? "Creando…" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
