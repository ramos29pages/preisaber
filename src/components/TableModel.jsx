import { faSort, faDownload, faRobot } from "@fortawesome/free-solid-svg-icons";
import { SkeletonModel } from "./SkeletonModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableModel({requestSort, sortConfig, searchTerm, sortedModels, formatAccuracy, formatDate}) {


  return (
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
                    <div className="flex items-center max-w-100">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-orange-100 rounded-full text-orange-500">
                        <FontAwesomeIcon icon={faRobot} />
                      </div>
                      <div className="md:ml-4">
                        <div className="text-md font-medium text-gray-900">
                          {model.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {model.id ? `ID: ${model.id.substring(0, 12)}...` : ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap md:table-cell">
                    <div className="flex items-center">
                      <div className={`h-2.5 rounded-full`}>
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
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <div className="text-sm text-gray-900">
                      {model.uploader}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(model.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden text-sm">
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

      {/* Footer de la tabla con paginación si lo necesitas en el futuro */}
      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {sortedModels.length}{" "}
          {sortedModels.length === 1 ? "modelo" : "modelos"} encontrados
        </div>

        {/* Aquí puedes agregar paginación si lo necesitas */}
      </div>
    </div>
  );
}
