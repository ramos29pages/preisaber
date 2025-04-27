import React, { useState } from 'react';
import { SkeletonModelMobile } from './skeletonMobileModel';
import { updateModel, deleteModel } from '../services/modelService';
import TableModelMobileItem from './TableModelMobileItem';
import EditModelModal from './EditModelModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

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
        const updatedModel = await updateModel(currentModel.id, { uploader: editedUploader });
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
    <div className="bg-white rounded-xl shadow-md overflow-y-scroll h-140">
      {sortedModels.length > 0 ? (
        sortedModels.map((model, index) => (
          <TableModelMobileItem
            key={model.id || index}
            model={model}
            formatAccuracy={formatAccuracy}
            formatDate={formatDate}
            onOpenEditModal={handleOpenEditModal}
            onOpenDeleteConfirmation={handleOpenDeleteConfirmation}
          />
        ))
      ) : (
        <div className="py-10 px-6 text-center text-gray-500">
          {searchTerm ? (
            "No se encontraron modelos con ese criterio"
          ) : (
            <>
              <SkeletonModelMobile />
              <SkeletonModelMobile />
              NO HAY MODELOS
            </>
          )}
        </div>
      )}

      <EditModelModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        model={currentModel}
        editedUploader={editedUploader}
        onUploaderChange={handleUploaderChange}
        onSave={handleSaveEdit}
        onUpdated={onModelUpdated}
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