import { faTag, faChartLine, faUser, faCalendarAlt, faCloudUploadAlt, faFileAlt, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { listModels, createModel } from "../services/modelService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AddModelForm({ setShowModal, models, setModels }) {
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

  async function fetchModels() {
    try {
      const data = await listModels();
      setModels(data || []);
    } catch (error) {
      console.error("Error al cargar modelos:", error);
      toast.error("Error al cargar los modelos");
    }
  }
  // Carga inicial de modelos
  useEffect(() => {
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
      toast.success('Modelo creado exitosamente');
      if(newModel){
        Swal.fire({
          
          text: 'Creado con exito',
          icon: 'success',
          showConfirmButton: false,
          timer: 1300
        });
        fetchModels();
        setModels(prev => [newModel, ...prev])
        setShowModal(false);
        clearForm();
      }
    } catch (error) {
      console.error("Error al crear el modelo:", error);
      const errorMessage = error.response?.data?.detail || error.message || "Error desconocido al crear el modelo";
      toast.error('Error: ' + errorMessage);
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
    <>
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
              <FontAwesomeIcon icon={faChartLine} className="text-gray-500" />
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
              <p className="text-red-500 text-xs mt-1">{errors.precision}</p>
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
              <p className="text-red-500 text-xs mt-1">{errors.creadoPor}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
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
                    <p className="font-medium text-orange-500">{fileName}</p>
                  ) : (
                    <>
                      <p className="font-medium">Haz clic para seleccionar</p>
                      <p>o arrastra y suelta</p>
                      <p className="text-xs">(Solo archivos .p o .pickle)</p>
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
              <FontAwesomeIcon icon={faTag} className="text-gray-500" />{" "}
              Variables Secret
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="variableInput"
                placeholder="Nueva variable"
                value={variableInput}
                onChange={(e) => setVariableInput(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={handleAddVariable}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {variables.map((v, idx) => (
                <span
                  key={idx}
                  className="flex items-center bg-gray-200 px-2 py-1 rounded-full text-sm"
                >
                  {v}
                  <button
                    type="button"
                    onClick={() => handleRemoveVariable(idx)}
                    className="ml-1"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
