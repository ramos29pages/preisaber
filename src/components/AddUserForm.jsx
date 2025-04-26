// src/components/AddUserForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUsers } from "../context/UserContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const schema = yup
  .object({
    name: yup.string().required("El nombre es obligatorio"),
    email: yup
      .string()
      .email("Formato de email no válido")
      .required("El email es obligatorio"),
    role: yup.string().required("El rol es obligatorio"),
    semester: yup
      .number()
      .typeError("Semestre debe ser un número")
      .integer("Semestre debe ser entero")
      .max(10, "Semestre no puede ser mayor a 10")
      .min(1, "Semestre no puede ser menor a 1")
      .positive("Semestre debe ser positivo")
      .required("El semestre es obligatorio"),
    identificacion: yup
      .string()
      .matches(/^[0-9]+$/, "Solo números permitidos")
      .required("La identificación es obligatoria"),
    tipo_prueba: yup.string().required("El tipo de prueba es obligatorio"),
  })
  .required();

export default function AddUserForm() {
  const navigate = useNavigate();
  const { createUser } = useUsers();
  const defaultPicture =
    "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      console.log({ ...data, picture: defaultPicture });
      await createUser({ ...data, picture: defaultPicture });
      Swal.fire({
        title: "Exito",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then((res) => {
        if (res.dismiss) {
          reset();
          navigate("/registros");
        }
      });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      toast.error('Error al crear el usuario.')
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-orange-600 text-center">
        Añadir Usuario
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          {...register("name")}
          className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition
            ${errors.name ? "border-red-500" : "border-gray-300"}`}
          placeholder="Ej. Juan Pérez"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register("email")}
          className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition
            ${errors.email ? "border-red-500" : "border-gray-300"}`}
          placeholder="ejemplo@mail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <input
            {...register("role")}
            className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none text-slate-400 focus:ring-orange-400 transition
              ${errors.role ? "border-red-500" : "border-gray-300"}`}
            placeholder="Ej. estudiante"
            readOnly={true}
            value={"Estudiante"}
            S
          />
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Semestre
          </label>
          <input
            type="number"
            {...register("semester")}
            className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition
              ${errors.semester ? "border-red-500" : "border-gray-300"}`}
            placeholder="Ej. 5"
          />
          {errors.semester && (
            <p className="text-red-500 text-xs mt-1">
              {errors.semester.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Identificación
          </label>
          <input
            {...register("identificacion")}
            className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition
              ${errors.identificacion ? "border-red-500" : "border-gray-300"}`}
            placeholder="Ej. 12345678"
          />
          {errors.identificacion && (
            <p className="text-red-500 text-xs mt-1">
              {errors.identificacion.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Prueba
          </label>
          <select
            {...register("tipo_prueba")}
            className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition
              ${errors.tipo_prueba ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Seleccione...</option>
            <option value="tecnologica">Tecnológica</option>
            <option value="profesional">Profesional</option>
          </select>
          {errors.tipo_prueba && (
            <p className="text-red-500 text-xs mt-1">
              {errors.tipo_prueba.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-orange-500 text-white font-semibold rounded-xl shadow hover:bg-orange-600 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Guardando…" : "Agregar Usuario"}
      </button>
    </form>
  );
}
