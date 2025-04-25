import React from 'react';

function EditModelModal({ isOpen, onClose, model, editedUploader, onUploaderChange, onSave }) {
  if (!isOpen || !model) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Editar Modelo</h2>
        <div>
          <p className="mb-2">Nombre: {model.name}</p>
          <div className="mb-4">
            <label htmlFor="uploader" className="block text-gray-700 text-sm font-bold mb-2">
              Creado Por:
            </label>
            <input
              type="text"
              id="uploader"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={editedUploader}
              onChange={onUploaderChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModelModal;