import React from 'react';
import { faDownload, faRobot, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TableModelMobileItem({ model, formatAccuracy, formatDate, onOpenEditModal, onOpenDeleteConfirmation }) {
  return (
    <div className="py-4 px-6 border-b border-gray-200 last:border-b-0">
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
            onClick={() => onOpenEditModal(model)}
            className="text-indigo-500 hover:text-indigo-700 transition-colors mr-2"
          >
            <FontAwesomeIcon icon={faEdit} size="sm" />
          </button>
          <button
            onClick={() => onOpenDeleteConfirmation(model)}
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
  );
}

export default TableModelMobileItem;