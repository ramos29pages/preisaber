import React, { useState } from "react";
import {
  faSort,
  faDownload,
  faRobot,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { SkeletonModel } from "./SkeletonModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteModel, updateModel } from "../services/modelService";
import EditModelModal from "./EditModelModal"; // Import the modal
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the modal

export default function TableModel({
  requestSort,
  sortConfig,
  searchTerm,
  sortedModels,
  formatAccuracy,
  formatDate,
  onModelUpdated,
  onModelDeleted,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState(null);
  const [editedUploader, setEditedUploader] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const handleOpenEditModal = (model) => {
    setCurrentModel(model);
    setEditedUploader(model.creado_por);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentModel(null);
    setEditedUploader("");
  };

  const handleUploaderChange = (event) => {
    setEditedUploader(event.target.value);
  };

  const handleSaveEdit = async (dataModel) => {
    if (currentModel) {
      try {
        let formData = new FormData();

        formData.append("nombre", dataModel.nombre || currentModel.nombre);
        formData.append("precision", dataModel.precision || currentModel.precision);
        formData.append("creado_por", dataModel.creado_por || currentModel.creado_por);
        formData.append("date", dataModel.date || currentModel.date);
        formData.append("descripcion", dataModel.descripcion || currentModel.descripcion);
        formData.append("version", dataModel.version || currentModel.version);
        formData.append("archivo", dataModel.archivo || currentModel.archivo);

        // Procesar variables: uppercase y sin espacios
        currentModel.variables.forEach((v) => console.log("VAR=> ", v));
        currentModel.variables.forEach((v) =>
          formData.append("variables", v.toUpperCase().replace(/\s+/g, ""))
        );

        const updatedModel = await updateModel(currentModel.id, dataModel);
        if (updatedModel) {
          onModelUpdated(updatedModel);
          handleCloseEditModal();
        } else {
          console.error("Error al actualizar el modelo.");
        }
      } catch (error) {
        console.error("Error al actualizar el modelo:", error);
      }
    } else {
      handleCloseEditModal();
    }
  };

  const handleOpenDeleteConfirmation = (model) => {
    setCurrentModel(model);
    setIsDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setCurrentModel(null);
  };

  const handleDeleteModel = async () => {
    if (currentModel) {
      try {
        const success = await deleteModel(currentModel.id);
        if (success) {
          onModelDeleted(currentModel.id);
          handleCloseDeleteConfirmation();
        } else {
          console.error("Error al eliminar el modelo.");
        }
      } catch (error) {
        console.error("Error al eliminar el modelo:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="md:min-w-full divide-y divide-orange-500">
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
                className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
                onClick={() => requestSort("accuracy")}
              >
                <div className="items-center flex">
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
                className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
                onClick={() => requestSort("uploader")}
              >
                <div className="items-center flex">
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
                className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hidden md:table-cell"
                onClick={() => requestSort("date")}
              >
                <div className="items-center flex">
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
              <th className="md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedModels.length > 0 ? (
              sortedModels.map((model, index) => (
                <tr
                  key={model.id || index}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center max-w-100">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-orange-100 rounded-full text-orange-500">
                        <FontAwesomeIcon icon={faRobot} />
                      </div>
                      <div className="md:ml-4">
                        <div className="text-md font-medium text-gray-900">
                          {model.nombre}
                        </div>
                        <div className="text-xs text-gray-500">
                          {model.id
                            ? `ID: ${model.id.substring(0, 12)}...`
                            : ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap md:table-cell">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 rounded-full bg-gray-200 w-[${
                          parseFloat(model.precision) || 0
                        }%]`}
                      >
                        <div
                          className={`h-2.5 rounded-full bg-orange-500`}
                          style={{
                            width: `${parseFloat(model.precision) || 0}%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-3 text-sm text-gray-900">
                        {formatAccuracy(model.precision)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm text-gray-900">
                      {model.creado_por}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm text-gray-900">
                      {formatDate(model.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleOpenEditModal(model)}
                        className="text-indigo-500 hover:text-indigo-700 transition-colors mr-2"
                      >
                        <FontAwesomeIcon
                          className="cursor-pointer hover:scale-120"
                          icon={faEdit}
                          size="sm"
                        />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteConfirmation(model)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FontAwesomeIcon
                          className="cursor-pointer"
                          icon={faTrash}
                          size="sm"
                        />
                      </button>
                      <a
                        href={model.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-700 transition-colors inline-flex items-center gap-1 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-full ml-2"
                      >
                        <FontAwesomeIcon
                          className="text-orange-500"
                          icon={faDownload}
                          size="sm"
                        />
                        <span className="text-orange-500">Descargar</span>
                      </a>
                    </div>
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
                    <>
                      <SkeletonModel />
                      <SkeletonModel />
                    </>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {sortedModels.length}{" "}
          {sortedModels.length === 1 ? "modelo" : "modelos"} encontrados
        </div>
      </div>

      {/* Modales */}
      <EditModelModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        model={currentModel}
        editedUploader={editedUploader}
        onUploaderChange={handleUploaderChange}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
        model={currentModel}
        onConfirmDelete={handleDeleteModel}
      />
    </div>
  );
}
