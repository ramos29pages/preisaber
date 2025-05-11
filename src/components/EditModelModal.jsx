import React, { useState, useEffect, useRef } from "react";
import {
  faTimes,
  faCheck,
  faPlus,
  faMinus,
  faFileArrowUp,
  faTag,
  faUser,
  faCalendarAlt,
  faFileLines,
  faCodeBranch,
  faChartLine,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateModel } from "../services/modelService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function EditModelModal({ isOpen, onClose, model, onUpdated }) {
  const [form, setForm] = useState({
    nombre: "",
    precision: "",
    creado_por: "",
    date: "",
    descripcion: "",
    version: "",
    archivo: null,
    variables: [],
  });
  const [fileName, setFileName] = useState("");
  const [variableInput, setVariableInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    if (isOpen && model) {
      setForm({
        nombre: model.nombre,
        precision: model.precision.toString(),
        creado_por: model.creado_por,
        date: model.date.split("T")[0],
        descripcion: model.descripcion || "",
        version: model.version.toString(),
        archivo: null,
        variables: [...model.variables],
      });
      setFileName("");
      setVariableInput("");
      setErrors({});
    }
  }, [isOpen, model]);

  if (!isOpen || !model) return null;

  const handleChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, archivo: file }));
    setFileName(file?.name || "");
  };

  const handleAddVariable = () => {
    const v = variableInput.trim().toUpperCase().replace(/\s+/g, "");
    if (v && !form.variables.includes(v)) {
      setForm((f) => ({ ...f, variables: [...f.variables, v] }));
      setVariableInput("");
    }
  };

  const handleRemoveVariable = (idx) => {
    setForm((f) => ({
      ...f,
      variables: f.variables.filter((_, i) => i !== idx),
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.nombre) errs.nombre = "Requerido";
    if (!form.precision || isNaN(form.precision))
      errs.precision = "Número válido";
    if (!form.creado_por) errs.creado_por = "Requerido";
    if (!form.date) errs.date = "Requerido";
    if (!form.version) errs.version = "Requerido";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("precision", form.precision);
    data.append("creado_por", form.creado_por);
    data.append("date", form.date);
    data.append("descripcion", form.descripcion);
    data.append("version", form.version);
    form.variables.forEach((v) => data.append("variables", v));
    if (form.archivo) data.append("archivo", form.archivo);

    try {
      setLoading(true);
      const updated = await updateModel(model.id, data);
      setLoading(false);
      
      if (updated) {
        Swal.fire({
          title: 'Modelo actualizado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1800
        });
        onClose();
        const onUpdate = () =>{
          console.log('Run RUN ')
          onUpdated(updated);
        }
        onUpdate();
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: e.message || e,
        icon: 'error',
        showConfirmButton: false,
        timer: 1300
      });
      toast.error(`Error al actualizar: ${e.message || e}`);
    }
  };

  return (
    <div className="fixed inset-0  bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white animate__animated animate__fadeIn rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="bg-orange-400 text-white p-4 border-b border-slate-100 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-white">
            <FontAwesomeIcon icon={faCodeBranch} className="mr-2" /> Editar
            Modelo
          </h3>
          <button
            onClick={onClose}
            className="text-orange-500 hover:text-orange-700 focus:outline-none"
          >
            <FontAwesomeIcon className="text-white" icon={faTimes} size="xl" />
          </button>
        </div>
        <div ref={contentRef} className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-orange-500 font-semibold mb-1">
              <FontAwesomeIcon icon={faTag} className="mr-2" /> Nombre
            </label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange("nombre")}
              className="w-full rounded-md h-12 p-2 border-gray-300 bg-slate-50 focus:border-orange-500 focus:ring-orange-500 text-gray-500"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
            )}
          </div>
          {/* Precisión */}
          <div>
            <label className="block text-orange-500 font-semibold mb-1">
              <FontAwesomeIcon icon={faChartLine} className="mr-2" /> Precisión
            </label>
            <input
              name="precision"
              value={form.precision}
              onChange={handleChange("precision")}
              className="w-full rounded-md border-orange-300 bg-slate-50 focus:border-orange-500 focus:ring-orange-500 text-gray-700 h-12 p-2"
            />
            {errors.precision && (
              <p className="text-red-500 text-sm mt-1">{errors.precision}</p>
            )}
          </div>
          {/* Creado por */}
          <div>
            <label className="block text-orange-500 font-semibold mb-1">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Creado por
            </label>
            <input
              name="creado_por"
              value={form.creado_por}
              onChange={handleChange("creado_por")}
              className="w-full rounded-md border-orange-300 bg-slate-50 focus:border-orange-500 focus:ring-orange-500 text-gray-700 h-12 p-2"
            />
            {errors.creado_por && (
              <p className="text-red-500 text-sm mt-1">{errors.creado_por}</p>
            )}
          </div>
          {/* Fecha */}
          <div>
            <label className="block text-orange-500 font-semibold mb-1">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Fecha
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange("date")}
              className="w-full rounded-md border-orange-300 h-12 bg-slate-50 p-2 focus:border-orange-500 focus:ring-orange-500 text-gray-700"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>
          {/* Descripción */}
          <div>
            <label className="block text-orange-500 font-semibold mb-1">
              <FontAwesomeIcon icon={faFileLines} className="mr-2" />{" "}
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange("descripcion")}
              className="w-full rounded-md border-orange-300 bg-slate-50 p-2 focus:border-orange-500 focus:ring-orange-500 text-gray-700"
            />
          </div>
          {/* Versión */}
          <div>
            <label className="block text-orange-500 font-semibold mb-1">
              <FontAwesomeIcon icon={faCodeBranch} className="mr-2" /> Versión
            </label>
            <input
              name="version"
              value={form.version}
              onChange={handleChange("version")}
              className="w-full rounded-md border-orange-300 bg-slate-50 p-2 focus:border-orange-500 focus:ring-orange-500 text-gray-700"
            />
            {errors.version && (
              <p className="text-red-500 text-sm mt-1">{errors.version}</p>
            )}
          </div>
          {/* Variables */}
          <div>
            <label className="block text-orange-500 font-semibold mb-1">
              <FontAwesomeIcon icon={faTag} className="mr-2" /> Variables
            </label>
            <div className="flex gap-2">
              <input
                value={variableInput}
                onChange={(e) => setVariableInput(e.target.value)}
                className="flex-1 rounded-md border-orange-300 focus:border-orange-500 p-2 focus:ring-orange-500 bg-slate-50 text-gray-700"
                placeholder="Añadir variable"
              />
              <button
                type="button"
                onClick={handleAddVariable}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-3 py-2 focus:outline-none"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.variables.map((v, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-orange-400 text-white rounded-md flex items-center"
                >
                  {v}
                  <button
                    onClick={() => handleRemoveVariable(i)}
                    className="ml-2 text-white hover:text-orange-700 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* Archivo */}
          <div>
            <label className="block text-orange-500 font-semibold mb-1">
              <FontAwesomeIcon icon={faFileArrowUp} className="mr-2" /> Archivo
              (opcional)
            </label>
            <div className="relative rounded-md">
              <input
                type="file"
                ref={fileRef}
                onChange={handleFileChange}
                className="sr-only"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-gray-100 border border-gray-300 text-gray-400 placeholder-orange-400 focus:outline-none focus:border-orange-500 focus:ring-orange-500 block w-full rounded-md py-2 px-3"
              >
                {fileName ? fileName : "¿Cambiar Modelo?"}
              </label>
            </div>
          </div>
        </div>
        <div className="bg-slate-200 p-4 border-t border-slate-300 flex justify-end rounded-b-2xl">
          <button
            onClick={onClose}
            className="text-orange-500 font-bold hover:text-orange-900 focus:outline-none mr-4 px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={` hover:bg-orange-700 transition-colors text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${loading ? 'bg-gray-500' : 'bg-orange-500'}` }
          >
            {!loading && < FontAwesomeIcon icon={faCheck} className="mr-2" /> }
            {loading && < FontAwesomeIcon icon={faRotateRight} className="mr-2 animate-spin" /> }
            {loading ? 'Actualizando...': 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}
