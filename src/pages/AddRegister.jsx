// src/components/CargarArchivo.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faWarning } from "@fortawesome/free-solid-svg-icons";
import Papa from "papaparse";
import * as XLSX from "xlsx";

function AddRegister() {
  const fileInputRef = useRef(null);
  const [info, setInfo] = useState("Selecciona un archivo");
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Abre el explorador de archivos
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Se ejecuta al seleccionar un archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["csv", "xlsx"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedTypes.includes(fileExtension)) {
        setInfo(file.name);
        setArchivo(file);
        setError(null);
      } else {
        setError("Solo se permiten archivos CSV o XLSX.");
        setArchivo(null);
      }
    }
  };

  // Convierte un archivo XLSX a JSON
  const convertXLSX = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      if (jsonData) {
        navigate("/preview", { state: { data: jsonData } });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Convierte un archivo CSV a JSON
  const convertCSV = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        if (results) {
          navigate("/preview", { state: { data: results.data } });
        }
      },
    });
  };

  // Maneja la carga del archivo según su extensión
  const handleUploadFile = () => {
    if (archivo) {
      const allowedTypes = ["csv", "xlsx"];
      const fileExtension = archivo.name.split(".").pop().toLowerCase();
      if (allowedTypes.includes(fileExtension)) {
        if (fileExtension === "csv") {
          convertCSV(archivo);
        } else if (fileExtension === "xlsx") {
          convertXLSX(archivo);
        }
      } else {
        setError("Solo se permiten archivos CSV o XLSX.");
        setArchivo(null);
      }
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-200 p-4">
      <form className="bg-white shadow-md rounded-md p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4 text-center text-orange-400">
          Insertar nuevos registros
        </h2>

        {/* Simulación del input de archivo */}
        <div
          className={`border rounded-md px-4 py-2 mb-4 cursor-pointer flex items-center justify-between ${
            archivo ? "border-green-400" : "border-gray-300"
          }`}
          onClick={handleClick}
        >
          <span className="text-gray-700">{info}</span>
          <span className="text-gray-500">
            {!archivo ? (
              <FontAwesomeIcon icon={faPlus} />
            ) : (
              <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            )}
          </span>
        </div>

        {error && (
          <p className="text-red-500 text-sm flex items-center mb-4">
            <FontAwesomeIcon icon={faWarning} className="mr-2" />
            {error}
          </p>
        )}

        <input
          type="file"
          id="archivo"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        {archivo && (
          <button
            type="button"
            onClick={handleUploadFile}
            className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer text-white py-2 rounded-md font-semibold transition-colors"
          >
            Continuar
          </button>
        )}
      </form>
    </div>
  );
}

export default AddRegister;
