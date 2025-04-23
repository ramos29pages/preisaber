import React, { useState } from 'react';
import { faDownload, faRobot, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SkeletonModelMobile } from './skeletonMobileModel';
import { updateUserModel, deleteModel } from '../services/modelService'; // Importa las funciones del servicio

export default function TableModelMobile({ searchTerm, sortedModels, formatAccuracy, formatDate, onModelUpdated, onModelDeleted }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState(null);
  const [editedUploader, setEditedUploader] = useState('');
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const handleOpenEditModal = (model) => {
    setCurrentModel(model);
    setEditedUploader(model.uploader);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentModel(null);
    setEditedUploader('');
  };

  const handleUploaderChange = (event) => {
    setEditedUploader(event.target.value);
  };

  const handleSaveEdit = async () => {
    if (currentModel && editedUploader !== currentModel.uploader) {
      try {
        const updatedModel = await updateUserModel(currentModel.id, { uploader: editedUploader });
        if (updatedModel) {
          onModelUpdated(updatedModel); // Llama a la función para actualizar la lista en el padre
          handleCloseEditModal();
        } else {
          console.error("Error al actualizar el modelo.");
        }
      } catch (error) {
        console.error("Error al actualizar el modelo:", error);
      }
    } else {
      handleCloseEditModal(); // Si no hay cambios, cierra el modal
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
          onModelDeleted(currentModel.id); // Llama a la función para eliminar el modelo de la lista en el padre
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
      {sortedModels.length > 0 ? (
        sortedModels.map((model, index) => (
          <div
            key={model.id || index}
            className="py-4 px-6 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-orange-100 rounded-full text-orange-500">
                  <FontAwesomeIcon icon={faRobot} size="sm" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{model.name}</p>
                  <p className="text-xs text-gray-500">{model.id ? `ID: ${model.id.substring(0, 8)}...` : ""}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleOpenEditModal(model)}
                  className="text-indigo-500 hover:text-indigo-700 transition-colors mr-2"
                >
                  <FontAwesomeIcon icon={faEdit} size="sm" />
                </button>
                <button
                  onClick={() => handleOpenDeleteConfirmation(model)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faTrash} size="sm" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Precisión:</span>
              </div>
              <div>
                <div className="flex items-center">
                  <div className={`h-2 rounded-full bg-gray-200 w-[${parseFloat(model.accuracy) || 0}%]`}>
                    <div
                      className={`h-2 rounded-full bg-orange-500`}
                      style={{ width: `${parseFloat(model.accuracy) || 0}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-gray-900">{formatAccuracy(model.accuracy)}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Creado Por:</span>
              </div>
              <div>
                <p className="text-gray-900">{model.uploader}</p>
              </div>

              <div>
                <span className="font-semibold text-gray-700">Fecha:</span>
              </div>
              <div>
                <p className="text-gray-900">{formatDate(model.date)}</p>
              </div>

              <div className="col-span-2 mt-2">
                <a
                  href={model.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-orange-50 hover:bg-orange-100 text-orange-500 hover:text-orange-700 px-3 py-1 rounded-full text-xs transition-colors"
                >
                  <FontAwesomeIcon icon={faDownload} size="sm" />
                  <span>Descargar</span>
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-10 px-6 text-center text-gray-500">
          {searchTerm ? (
            "No se encontraron modelos con ese criterio"
          ) : (
            <>
              <SkeletonModelMobile />
              <SkeletonModelMobile />
            </>
          )}
        </div>
      )}

      {/* Modal de Edición */}
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Editar Modelo</h2>
            {currentModel && (
              <div>
                <p className="mb-2">Nombre: {currentModel.name}</p>
                <div className="mb-4">
                  <label htmlFor="uploader" className="block text-gray-700 text-sm font-bold mb-2">
                    Creado Por:
                  </label>
                  <input
                    type="text"
                    id="uploader"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editedUploader}
                    onChange={handleUploaderChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={handleCloseEditModal}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSaveEdit}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {isDeleteConfirmationOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Eliminar Modelo</h2>
            <p className="mb-4">¿Estás seguro de que deseas eliminar este modelo?</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={handleCloseDeleteConfirmation}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleDeleteModel}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}