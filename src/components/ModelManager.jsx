// src/components/ModelManager.jsx
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  //   faFileUpload,
  faTimes,
  faRobot,
  faCloudUploadAlt,
  faCalendarAlt,
  faUser,
  faChartLine,
  faTag,
  faCheck,
  faSearch,
  faSort,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { listModels, createModel } from "../services/modelService";
import { SkeletonModel } from "./SkeletonModel";
// Si no tienes react-toastify instalado, puedes reemplazar las notificaciones toast
// import { toast } from "react-toastify";

export default function ModelManager() {
  const [models, setModels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Campos del formulario
  const [name, setName] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [uploader, setUploader] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const fileInputRef = useRef(null);
  const modalContentRef = useRef(null);

  // Carga inicial de modelos
  useEffect(() => {
    async function fetchModels() {
      const data = await listModels();
      setModels(data || []); // Garantiza que sea un array
    }
    fetchModels();
  }, []);

  // Ordenamiento de la tabla
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filtrado por búsqueda
  const filteredModels = models.filter((model) => {
    return (
      model.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.uploader?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Ordenamiento
  const sortedModels = [...filteredModels].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

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
    setName("");
    setAccuracy("");
    setUploader("");
    setDate(new Date().toISOString().split("T")[0]);
    setFile(null);
    setFileName("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "El nombre es requerido";

    if (!accuracy.trim()) {
      newErrors.accuracy = "La precisión es requerida";
    } else if (
      isNaN(accuracy) ||
      parseFloat(accuracy) < 0 ||
      parseFloat(accuracy) > 100
    ) {
      newErrors.accuracy = "La precisión debe ser un número entre 0 y 100";
    }

    if (!uploader.trim()) newErrors.uploader = "El creador es requerido";
    if (!date) newErrors.date = "La fecha es requerida";
    if (!file) newErrors.file = "Debe seleccionar un archivo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Asegurarse de que el modal tenga scroll si hay errores
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0;
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("accuracy", accuracy);
      formData.append("uploader", uploader);
      formData.append("date", date);
      formData.append("modelFile", file);

      const newModel = await createModel(formData);
      setModels((prev) => [newModel, ...prev]);

      // Si tienes react-toastify:
      // toast.success('Modelo creado exitosamente');
      // De lo contrario:
      alert("Modelo creado exitosamente");

      setShowModal(false);
      clearForm();
    } catch (error) {
      console.error("Error al crear el modelo:", error);
      // Si tienes react-toastify:
      // toast.error('Error al crear el modelo: ' + error.message);
      // De lo contrario:
      alert(
        "Error al crear el modelo: " +
          (error.message || "Ocurrió un error desconocido")
      );
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

  // Formatea el porcentaje de precisión
  const formatAccuracy = (value) => {
    if (!value && value !== 0) return "-";
    return Number(value).toFixed(2) + "%";
  };

  // Formatea la fecha
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" }).format(
      date
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-600">
            Modelos de Predicción
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2.5 rounded-xl shadow hover:from-orange-600 hover:to-red-600 transition"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Nuevo Modelo
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-4 relative">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o creador..."
              className="w-full px-4 py-2.5 pl-10 pr-4 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-3 text-gray-400"
            />
          </div>
        </div>

        {/* Tabla mejorada */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="md:min-w-full divide-y divide-red-600">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Nombre
                      {sortConfig.key === "name" && (
                        <FontAwesomeIcon
                          icon={faSort}
                          className={`ml-1 text-orange-500 ${
                            sortConfig.direction === "ascending"
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("accuracy")}
                  >
                    <div className="items-center hidden md:flex">
                      Precisión
                      {sortConfig.key === "accuracy" && (
                        <FontAwesomeIcon
                          icon={faSort}
                          className={`ml-1 text-orange-500 ${
                            sortConfig.direction === "ascending"
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("uploader")}
                  >
                    <div className="items-center hidden md:flex">
                      Creado Por
                      {sortConfig.key === "uploader" && (
                        <FontAwesomeIcon
                          icon={faSort}
                          className={`ml-1 text-orange-500 ${
                            sortConfig.direction === "ascending"
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("date")}
                  >
                    <div className="items-center hidden md:flex">
                      Fecha
                      {sortConfig.key === "date" && (
                        <FontAwesomeIcon
                          icon={faSort}
                          className={`ml-1 text-orange-500 ${
                            sortConfig.direction === "ascending"
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedModels.length > 0 ? (
                  sortedModels.map((model, index) => (
                    <tr
                      key={model.id || index}
                      className="hover:bg-orange-50 transition-colors"
                    >
                      <td className="md:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center bg-rose-500">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-orange-100 rounded-full text-orange-500">
                            <FontAwesomeIcon icon={faRobot} />
                          </div>
                          <div className="md:ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {model.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {model.id
                                ? `ID: ${model.id.substring(0, 8)}...`
                                : ""}
                            </div>
                            <div className="text-xs text-gray-500">
                              {model.authpr || 'creador'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="flex items-center">
                          <div className={`h-2.5 w-16 rounded-full`}>
                            <div
                              className={`h-2.5 rounded-full`}
                              style={{
                                width: `${parseFloat(model.accuracy) || 0}%`,
                              }}
                            ></div>
                          </div>
                          <span className="ml-3 text-sm text-gray-900">
                            {formatAccuracy(model.accuracy)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden">
                        <div className="text-sm text-gray-900">
                          {model.uploader}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden">
                        <div className="text-sm text-gray-900">
                          {formatDate(model.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm hidden">
                        <a
                          href={model.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-500 hover:text-orange-700 transition-colors inline-flex items-center gap-1 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-full"
                        >
                          <FontAwesomeIcon icon={faDownload} />
                          <span>Descargar</span>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      {searchTerm ? (
                        "No se encontraron modelos con ese criterio"
                      ) : (
                        <SkeletonModel />
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer de la tabla con paginación si lo necesitas en el futuro */}
          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {sortedModels.length}{" "}
              {sortedModels.length === 1 ? "modelo" : "modelos"} encontrados
            </div>

            {/* Aquí puedes agregar paginación si lo necesitas */}
          </div>
        </div>

        {/* Mensaje si no hay modelos */}
        {/* {models.length !== 0 && (
          <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-md">
            <p className="text-gray-500">Debes usar una computadora para ver esta seccion</p>
          </div>
        )} */}
      </div>

      {/* Modal Crear Modelo - Versión Mejorada con scroll */}
      {showModal && (
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
                    name="name"
                    placeholder="Ej: YOLOv5 Custom"
                    value={name}
                    onChange={handleInputChange(setName)}
                    className={`w-full px-4 py-2.5 bg-gray-50 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
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
                    name="accuracy"
                    placeholder="Ej: 95.5"
                    value={accuracy}
                    onChange={handleInputChange(setAccuracy)}
                    className={`w-full px-4 py-2.5 bg-gray-50 border ${
                      errors.accuracy ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
                  />
                  {errors.accuracy && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.accuracy}
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
                    name="uploader"
                    placeholder="Ej: María López"
                    value={uploader}
                    onChange={handleInputChange(setUploader)}
                    className={`w-full px-4 py-2.5 bg-gray-50 border ${
                      errors.uploader ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
                  />
                  {errors.uploader && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.uploader}
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
      )}

      {/* Helper function para colores de precisión */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        function getAccuracyColorClass(accuracy) {
          const value = parseFloat(accuracy) || 0;
          if (value >= 90) return 'bg-green-500';
          if (value >= 70) return 'bg-orange-500';
          return 'bg-red-500';
        }
      `,
        }}
      />

      {/* Añade estas animaciones a tu archivo CSS global o a través de Tailwind */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }

        .active:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
