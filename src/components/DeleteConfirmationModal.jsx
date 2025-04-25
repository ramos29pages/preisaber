import React from 'react';

function DeleteConfirmationModal({ isOpen, onClose, model, onConfirmDelete }) {
  if (!isOpen || !model) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Eliminar Modelo</h2>
        <p className="mb-4">¿Estás seguro de que deseas eliminar este modelo?</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onConfirmDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;