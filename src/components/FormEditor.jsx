import React, { useState, useEffect } from "react";
import { updateForm, fetchFormDetails } from "../services/formService";
import {
  listModelNames,
  listModelVersionsByName,
} from "../services/modelService";
import Loader from "./Loader";

const FormEditor = ({ formId, onClose, onDelete, onFormUpdated }) => {
  const [formDetails, setFormDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [availableModels, setAvailableModels] = useState([]);
  const [modelVersions, setModelVersions] = useState([]);

  // Carga inicial de detalles y de modelos disponibles
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [details, models] = await Promise.all([
          fetchFormDetails(formId),
          listModelNames(),
        ]);
        setFormDetails({
          ...details,
          model_name: details.model_name ?? "",
          model_version: String(details.model_version ?? details.version ?? ""),
        });
        setAvailableModels(models);
      } catch (err) {
        console.error(err);
        setError({ load: "Error cargando formulario o modelos" });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [formId]);

  // Cuando cambia el modelo, recargar versiones
  useEffect(() => {
    if (!formDetails?.model_name) {
      setModelVersions([]);
      return;
    }
    const loadVersions = async () => {
      try {
        const raw = await listModelVersionsByName(formDetails.model_name);
        const versions = raw.map((v) => String(v));
        setModelVersions(versions);
        // Si la versión actual no está en la lista, resetear
        if (!versions.includes(formDetails.model_version)) {
          setFormDetails((f) => ({ ...f, model_version: "" }));
        }
      } catch (err) {
        console.error(err);
        setError((e) => ({
          ...e,
          model_version: "No se pudieron cargar versiones",
        }));
      }
    };
    loadVersions();
  }, [formDetails?.model_name]);

  const validateForm = () => {
    const errs = {};
    if (!formDetails.name?.trim()) errs.name = "Nombre obligatorio";
    if (!formDetails.description?.trim())
      errs.description = "Descripción obligatoria";
    if (!formDetails.logo?.trim()) errs.logo = "Logo obligatorio";
    if (!formDetails.model_name) errs.model_name = "Seleccione un modelo";
    if (!formDetails.model_version) errs.model_version = "Seleccione versión";
    if (!formDetails.questions?.length)
      errs.questions = "Debe haber al menos una pregunta";
    setError(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e, qIndex, optIndex) => {
    const { name, value } = e.target;
    if (qIndex !== undefined) {
      setFormDetails((prev) => {
        const qs = [...prev.questions];
        const q = { ...qs[qIndex] };
        if (name === "question") q.question = value;
        else if (name === "option") q.options[optIndex] = value;
        qs[qIndex] = q;
        return { ...prev, questions: qs };
      });
    } else {
      setFormDetails((prev) => ({ ...prev, [name]: value }));
      // limpiar error de campo
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddQuestion = () => {
    setFormDetails((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { id: crypto.randomUUID(), question: "", options: ["", ""] },
      ],
    }));
  };

  const handleAddOption = (qIndex) => {
    setFormDetails((prev) => {
      const qs = [...prev.questions];
      qs[qIndex] = { ...qs[qIndex], options: [...qs[qIndex].options, ""] };
      return { ...prev, questions: qs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await updateForm(formId, formDetails);
      onFormUpdated();
    } catch (err) {
      console.error(err);
      setError({ submit: "Error al guardar cambios" });
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-6">
        <Loader />
      </div>
    );
  if (error.load) return <div className="text-red-500 p-6">{error.load}</div>;

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-500 animate-fadeIn">
      <div className="bg-white animate__animated animate__fadeIn animate__fast p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">
          Editar Formulario
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre, descripción, logo */}
          <div>
            <label className="block mb-1">Nombre*</label>
            <input
              name="name"
              value={formDetails.name}
              onChange={handleChange}
              className={`w-full border ${
                error.name ? "border-red-500" : "border-gray-300"
              } rounded p-2`}
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
          </div>
          <div>
            <label className="block mb-1">Descripción*</label>
            <textarea
              name="description"
              value={formDetails.description}
              onChange={handleChange}
              className={`w-full border ${
                error.description ? "border-red-500" : "border-gray-300"
              } rounded p-2`}
            />
            {error.description && (
              <p className="text-red-500 text-sm">{error.description}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Logo URL*</label>
            <input
              name="logo"
              value={formDetails.logo}
              onChange={handleChange}
              className={`w-full border ${
                error.logo ? "border-red-500" : "border-gray-300"
              } rounded p-2`}
            />
            {error.logo && <p className="text-red-500 text-sm">{error.logo}</p>}
          </div>

          {/* Modelo y versión */}
          <div>
            <label className="block mb-1">Modelo*</label>
            <select
              name="model_name"
              value={formDetails.model_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">-- Seleccione --</option>
              {availableModels.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {error.model_name && (
              <p className="text-red-500 text-sm">{error.model_name}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Versión*</label>
            <select
              key={modelVersions.join(",")}
              name="model_version"
              value={formDetails.model_version}
              onChange={handleChange}
              disabled={!modelVersions.length}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">-- Seleccione --</option>
              {modelVersions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            {error.model_version && (
              <p className="text-red-500 text-sm">{error.model_version}</p>
            )}
          </div>

          {/* Preguntas dinámicas */}
          <div>
            <h3 className="text-lg font-semibold text-orange-600 mb-2">
              Preguntas
            </h3>
            {error.questions && typeof error.questions === "string" && (
              <p className="text-red-500 text-sm mb-2">{error.questions}</p>
            )}
            {formDetails.questions.map((q, qi) => (
              <div
                key={q.id}
                className="mb-4 border border-gray-200 rounded p-4"
              >
                <input
                  name="question"
                  value={q.question}
                  onChange={(e) => handleChange(e, qi)}
                  placeholder={`Pregunta ${qi + 1}`}
                  className="w-full border border-gray-300 rounded p-2 mb-2"
                />
                {error.questions?.[qi]?.question && (
                  <p className="text-red-500 text-sm">
                    {error.questions[qi].question}
                  </p>
                )}
                {q.options.map((opt, oi) => (
                  <input
                    key={oi}
                    name="option"
                    value={opt}
                    onChange={(e) => handleChange(e, qi, oi)}
                    placeholder={`Opción ${oi + 1}`}
                    className="w-full border border-gray-300 rounded p-2 mb-1"
                  />
                ))}
                {error.questions?.[qi]?.options && (
                  <p className="text-red-500 text-sm">
                    {error.questions[qi].options}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => handleAddOption(qi)}
                  className="text-sm text-orange-500"
                >
                  + Añadir Opción
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              + Añadir Pregunta
            </button>
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => onDelete(formId)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Eliminar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
          {error.submit && (
            <p className="text-red-500 text-sm mt-2">{error.submit}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormEditor;
