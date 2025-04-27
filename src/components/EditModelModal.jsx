import React, { useState, useEffect, useRef } from 'react';
// import { faTimes, faCheck, faTag, faChartLine, faUser, faCalendarAlt, faFileAlt, faCodeBranch, faCloudUploadAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTimes, faCheck, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateModel } from '../services/modelService';
import { toast } from 'react-toastify';

export default function EditModelModal({ isOpen, onClose, model, onUpdated }) {
  const [form, setForm] = useState({
    nombre: '', precision: '', creado_por: '', date: '', descripcion: '', version: '', archivo: null, variables: []
  });
  const [fileName, setFileName] = useState('');
  const [variableInput, setVariableInput] = useState('');
  const [errors, setErrors] = useState({});
  const fileRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    if (isOpen && model) {
      setForm({
        nombre: model.nombre,
        precision: model.precision.toString(),
        creado_por: model.creado_por,
        date: model.date.split('T')[0],
        descripcion: model.descripcion || '',
        version: model.version.toString(),
        archivo: null,
        variables: [...model.variables]
      });
      setFileName('');
      setVariableInput('');
      setErrors({});
    }
  }, [isOpen, model]);

  if (!isOpen || !model) return null;

  const handleChange = key => e => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setForm(f => ({ ...f, archivo: file }));
    setFileName(file?.name || '');
  };

  const handleAddVariable = () => {
    const v = variableInput.trim().toUpperCase().replace(/\s+/g, '');
    if (v && !form.variables.includes(v)) {
      setForm(f => ({ ...f, variables: [...f.variables, v] }));
      setVariableInput('');
    }
  };

  const handleRemoveVariable = idx => {
    setForm(f => ({ ...f, variables: f.variables.filter((_, i) => i !== idx) }));
  };

  const validate = () => {
    const errs = {};
    if (!form.nombre) errs.nombre = 'Requerido';
    if (!form.precision || isNaN(form.precision)) errs.precision = 'Número válido';
    if (!form.creado_por) errs.creado_por = 'Requerido';
    if (!form.date) errs.date = 'Requerido';
    if (!form.version) errs.version = 'Requerido';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const data = new FormData();
    data.append('nombre', form.nombre);
    data.append('precision', form.precision);
    data.append('creado_por', form.creado_por);
    data.append('date', form.date);
    data.append('descripcion', form.descripcion);
    data.append('version', form.version);
    form.variables.forEach(v => data.append('variables', v));
    if (form.archivo) data.append('archivo', form.archivo);

    try {
      const updated = await updateModel(model.id, data);
      toast.success('Modelo actualizado');
      onUpdated(updated);
      onClose();
    } catch (e) {
      console.log(e)
      toast.error(`Error al actualizar ${e}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">Editar Modelo</h3>
          <button onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>
        </div>
        <div ref={contentRef} className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block">Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange('nombre')} className="w-full" />
            {errors.nombre && <p className="text-red-500">{errors.nombre}</p>}
          </div>
          {/* Precisión */}
          <div>
            <label className="block">Precisión</label>
            <input name="precision" value={form.precision} onChange={handleChange('precision')} className="w-full" />
            {errors.precision && <p className="text-red-500">{errors.precision}</p>}
          </div>
          {/* Creado por */}
          <div>
            <label className="block">Creado por</label>
            <input name="creado_por" value={form.creado_por} onChange={handleChange('creado_por')} className="w-full" />
            {errors.creado_por && <p className="text-red-500">{errors.creado_por}</p>}
          </div>
          {/* Fecha */}
          <div>
            <label className="block">Fecha</label>
            <input type="date" name="date" value={form.date} onChange={handleChange('date')} className="w-full" />
            {errors.date && <p className="text-red-500">{errors.date}</p>}
          </div>
          {/* Descripción */}
          <div>
            <label className="block">Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange('descripcion')} className="w-full" />
          </div>
          {/* Versión */}
          <div>
            <label className="block">Versión</label>
            <input name="version" value={form.version} onChange={handleChange('version')} className="w-full" />
            {errors.version && <p className="text-red-500">{errors.version}</p>}
          </div>
          {/* Variables */}
          <div>
            <label className="block">Variables</label>
            <div className="flex gap-2">
              <input value={variableInput} onChange={e => setVariableInput(e.target.value)} className="flex-1" placeholder="Añadir variable" />
              <button type="button" onClick={handleAddVariable}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.variables.map((v, i) => (
                <span key={i} className="px-2 py-1 bg-gray-200 rounded-full flex items-center">
                  {v}
                  <button onClick={() => handleRemoveVariable(i)} className="ml-1"><FontAwesomeIcon icon={faMinus} /></button>
                </span>
              ))}
            </div>
          </div>
          {/* Archivo */}
          <div>
            <label className="block">Archivo (opcional)</label>
            <input type="file" ref={fileRef} onChange={handleFileChange} className="w-full" />
            {fileName && <p>{fileName}</p>}
          </div>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button onClick={onClose} className="mr-2">Cancelar</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded"><FontAwesomeIcon icon={faCheck} /> Guardar</button>
        </div>
      </div>
    </div>
  );
}
