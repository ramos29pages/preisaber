// src/components/ModelManager.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { listModels } from "../services/modelService";
import AddModel from "./AddModel";
import TableModel from "./TableModel";
import TableModelMobile from "./TableModelMobile";
import { useMediaQuery } from "react-responsive";
// Si no tienes react-toastify instalado, puedes reemplazar las notificaciones toast
// import { toast } from "react-toastify";

export default function ModelManager() {
  const [models, setModels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 1023 });

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

        {isDesktopOrLaptop && (
          <TableModel
            requestSort={requestSort}
            sortConfig={sortConfig}
            searchTerm={searchTerm}
            sortedModels={sortedModels}
            formatAccuracy={formatAccuracy}
            formatDate={formatDate}
          />
        )}
        {isMobile && (
          <TableModelMobile
            requestSort={requestSort}
            sortConfig={sortConfig}
            searchTerm={searchTerm}
            sortedModels={sortedModels}
            formatAccuracy={formatAccuracy}
            formatDate={formatDate}
          />
        )}

        {/* Mensaje si no hay modelos */}
        {/* {models.length !== 0 && (
          <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-md">
            <p className="text-gray-500">Debes usar una computadora para ver esta seccion</p>
          </div>
        )} */}
      </div>

      {/* Modal Crear Modelo - Versión Mejorada con scroll */}
      {showModal && <AddModel setShowModal={setShowModal} />}

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
