import { faRobot, faTimes, faTag, faChartLine, faUser, faCalendarAlt, faCloudUploadAlt, faCheck, faFileAlt, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { listModels, createModel } from "../services/modelService";
import { SkeletonModel } from "./SkeletonModel";
import { toast } from "react-toastify";

export default function AddModel({ setShowModal }) {
  const [models, setModels] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  console.log('MODELS=> ',models)

  // Campos del formulario
  const [nombre, setNombre] = useState("");
  const [precision, setPrecision] = useState("");
  const [creadoPor, setCreadoPor] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [descripcion, setDescripcion] = useState("");
  const [version, setVersion] = useState("1.0");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [variableInput, setVariableInput] = useState("");
  const [variables, setVariables] = useState([]);

  const fileInputRef = useRef(null);
  const modalContentRef = useRef(null);

  // Carga inicial de modelos
  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await listModels();
        setModels(data || []);
      } catch (error) {
        console.error("Error al cargar modelos:", error);
        toast.error("Error al cargar los modelos");
      }
    }
    fetchModels();
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && /\.p$|\.pickle$/.test(selected.name)) {
      setFile(selected);
      setFileName(selected.name);

      // Limpiar error si existía
      if (errors.file) {
        setErrors((prev) => ({ ...prev, file: "" }));
      }
    } else {
      // Mostrar error
      setFile(null);
      setFileName("");
      setErrors((prev) => ({
        ...prev,
        file: "Solo archivos .p o .pickle permitidos",
      }));
      e.target.value = null;
    }
  };

  const clearForm = () => {
    setNombre("");
    setPrecision("");
    setCreadoPor("");
    setDate(new Date().toISOString().split("T")[0]);
    setDescripcion("");
    setVersion("1.0");
    setFile(null);
    setFileName("");
    setVariableInput("");
    setVariables([]);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!nombre.trim()) newErrors.nombre = "El nombre es requerido";

    if (!precision.trim()) {
      newErrors.precision = "La precisión es requerida";
    } else if (
      isNaN(precision) ||
      parseFloat(precision) < 0 ||
      parseFloat(precision) > 100
    ) {
      newErrors.precision = "La precisión debe ser un número entre 0 y 100";
    }

    if (!creadoPor.trim()) newErrors.creadoPor = "El creador es requerido";
    if (!date) newErrors.date = "La fecha es requerida";
    if (!version.trim()) newErrors.version = "La versión es requerida";
    if (!file) newErrors.file = "Debe seleccionar un archivo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    console.log('file charget...=>', file) 

    
    e.preventDefault();
    if (!validateForm()) {
      if (modalContentRef.current) modalContentRef.current.scrollTop = 0;
      return;
    }
    setIsSubmitting(true);
    
    try {
      
      let formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("precision", precision);
      formData.append("creado_por", creadoPor);
      formData.append("date", date);
      formData.append("descripcion", descripcion || "");
      formData.append("version", version);
      formData.append("archivo", file);
      formData.append("variables",'DEFAULT');
      
      console.log(formData.get('nombre'), 'ADDING...')
      // Procesar variables: uppercase y sin espacios
      variables.forEach(v=> console.log('VAR=> ',v))
      variables.forEach(v => formData.append("variables", v.toUpperCase().replace(/\s+/g, "")));

      const newModel = await createModel(formData);
      setModels(prev => [newModel, ...prev]);
      toast.success('Modelo creado exitosamente');
      setShowModal(false);
      clearForm();
    } catch (error) {
      console.error("Error al crear el modelo:", error);
      const errorMessage = error.response?.data?.detail || error.message || "Error desconocido al crear el modelo";
      toast.error('Error: ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);

    // Limpiar error para este campo
    const fieldName = e.target.getAttribute("name");
    if (fieldName && errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleAddVariable = () => {
    const val = variableInput.trim().toUpperCase().replace(/\s+/g, "");
    if (val && !variables.includes(val)) {
      setVariables(prev => [...prev, val]);
      setVariableInput("");
    }
  };

  const handleRemoveVariable = (idx) => {
    setVariables(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md relative animate-slideIn max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-t-2xl"></div>

        <div className="sticky top-0 z-10 bg-white rounded-t-2xl border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-orange-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faRobot} className="text-orange-500" />
            Crear Modelo
          </h3>

          <button
            onClick={() => {
              setShowModal(false);
              clearForm();
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div ref={modalContentRef} className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faTag} className="text-gray-500" />
                Nombre del modelo
              </label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej: Modelo de Predicción"
                value={nombre}
                onChange={handleInputChange(setNombre)}
                className={`w-full px-4 py-2.5 bg-gray-50 border ${
                  errors.nombre ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="text-gray-500"
                />
                Precisión (%)
              </label>
              <input
                type="text"
                name="precision"
                placeholder="Ej: 95.5"
                value={precision}
                onChange={handleInputChange(setPrecision)}
                className={`w-full px-4 py-2.5 bg-gray-50 border ${
                  errors.precision ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
              />
              {errors.precision && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.precision}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                Creado por
              </label>
              <input
                type="text"
                name="creadoPor"
                placeholder="Ej: María López"
                value={creadoPor}
                onChange={handleInputChange(setCreadoPor)}
                className={`w-full px-4 py-2.5 bg-gray-50 border ${
                  errors.creadoPor ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
              />
              {errors.creadoPor && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.creadoPor}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-gray-500"
                />
                Fecha de creación
              </label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={handleInputChange(setDate)}
                max={new Date().toISOString().split("T")[0]}
                className={`w-full px-4 py-2.5 bg-gray-50 border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faFileAlt} className="text-gray-500" />
                Descripción (opcional)
              </label>
              <textarea
                name="descripcion"
                placeholder="Descripción del modelo..."
                value={descripcion}
                onChange={handleInputChange(setDescripcion)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                rows="3"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faCodeBranch} className="text-gray-500" />
                Versión
              </label>
              <input
                type="text"
                name="version"
                placeholder="Ej: 1.0"
                value={version}
                onChange={handleInputChange(setVersion)}
                className={`w-full px-4 py-2.5 bg-gray-50 border ${
                  errors.version ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
              />
              {errors.version && (
                <p className="text-red-500 text-xs mt-1">{errors.version}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  className="text-gray-500"
                />
                Archivo del modelo
              </label>

              <div
                onClick={triggerFileInput}
                className={`w-full mt-1 flex items-center justify-center px-6 py-4 border-2 border-dashed ${
                  errors.file ? "border-red-500" : "border-gray-300"
                } rounded-lg cursor-pointer hover:bg-gray-50 transition-colors`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".p,.pickle"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="space-y-1 text-center">
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    className="h-10 w-10 text-gray-400"
                  />
                  <div className="text-sm text-gray-600">
                    {fileName ? (
                      <p className="font-medium text-orange-500">
                        {fileName}
                      </p>
                    ) : (
                      <>
                        <p className="font-medium">
                          Haz clic para seleccionar
                        </p>
                        <p>o arrastra y suelta</p>
                        <p className="text-xs">
                          (Solo archivos .p o .pickle)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {errors.file && (
                <p className="text-red-500 text-xs mt-1">{errors.file}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faTag} className="text-gray-500" /> Variables Secret
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="variableInput"
                  placeholder="Nueva variable"
                  value={variableInput}
                  onChange={e => setVariableInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
                />
                <button type="button" onClick={handleAddVariable} className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {variables.map((v, idx) => (
                  <span key={idx} className="flex items-center bg-gray-200 px-2 py-1 rounded-full text-sm">
                    {v}
                    <button type="button" onClick={() => handleRemoveVariable(idx)} className="ml-1">
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Botón fijo en la parte inferior */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 rounded-b-2xl">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-2.5 px-4 text-white rounded-xl transition-all transform ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 active:scale-98 shadow-md hover:shadow-lg"
            } flex items-center justify-center gap-2`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Procesando...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCheck} />
                <span>Crear Modelo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}