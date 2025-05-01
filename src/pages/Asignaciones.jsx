import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService"; // Asegúrate de que este servicio funcione con tu API
import { fetchForms } from "../services/formService"; // Asegúrate de que este servicio funcione con tu API
import asignacionesService from "../services/asignService"; // Importa el nuevo servicio de asignaciones
import FilterSelector from "../components/Asignments/FilterSelector";
import AsignmentFormList from "../components/Asignments/AsignmentFormList";
import AsignmentUserList from "../components/Asignments/AsignmentUserList";
import AsignmentDesktopTable from "../components/Asignments/AsignmentDesktopTable";
import { ToastContainer, toast } from "react-toastify";

export default function FormAssignmentComponent() {
  const [users, setUsers] = useState([]);
  const [forms, setForms] = useState([]);
  const [semester, setSemester] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAssignments, setLoadingAssignments] = useState(true); // Nuevo estado para cargar asignaciones

  useEffect(() => {
    fetchData();
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoadingAssignments(true);
    try {
      const assignmentsData = await asignacionesService.obtenerAsignaciones();
      setAssignments(assignmentsData);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoadingAssignments(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersData = await getUsers(); // Usa tu servicio real de usuarios
      const formsData = await fetchForms(); // Usa tu servicio real de formularios
      setUsers(usersData);
      setForms(formsData);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (uId, fId) => {
    try {
      const newAssignment = {
        user_id: uId,
        form_id: fId,
        asigned_by: localStorage.getItem("host_email"), // TODO: Obtener el usuario que asigna
        status: false, // Por defecto, la asignación no está completada
        created_at: new Date().toISOString(),
      };
      const assigned = await asignacionesService.crearAsignacion(newAssignment);
      setAssignments((prev) => [...prev, assigned]);
      notify("Asignado!");
    } catch (error) {
      console.error("Error assigning form:", error);
      toast.info(error?.message || "Ups!", true);
    }
  };

  const handleBulkAssign = (formId) => {
    filteredUsers.forEach((user) => handleAssign(user.id, formId));
  };

  const handleDelete = async (asignId) => {
    try {
      const deleted = await asignacionesService.eliminarAsignacion(asignId);
      if (deleted) {
        const assignmentsData = await asignacionesService.obtenerAsignaciones();
        setAssignments(assignmentsData);
        console.log(assignmentsData);
        notify("Eliminado!");
      }
    } catch (error) {
      notify(error?.message || "Error al eliminar.", true);
    }
  };

  // Filtrado de usuarios por semestre
  const filteredUsers = users.filter(
    (u) => semester === "" || u.semester === +semester
  );

  // Obtener semestres únicos para el selector
  const uniqueSemesters = [...new Set(users.map((u) => u.semester))].sort(
    (a, b) => a - b
  );

  //notificar
  const notify = (text, error = false) => {
    error ? toast.error(text) : toast.success(text);
  };

  return (
    <div className="max-w-7xl mx-auto md:px-4 overflow-y-scroll h-dic md:h-140 rounded-2xl">
      <h2 className="text-2xl bg-gray-50 py-2 sticky top-0 font-bold mb-6 text-orange-500 text-center md:text-left">
        Asignación de Formularios
      </h2>
      <ToastContainer />

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Selector de semestre */}
          <FilterSelector
            semestervalue={semester}
            setSemester={setSemester}
            uniqueSemestersArray={uniqueSemesters}
          />

          {/* Grid para Formularios y Usuarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lista de formularios */}
            <AsignmentFormList
              semester={semester}
              forms={forms}
              handleBulkAssign={handleBulkAssign}
            />

            {/* Lista de usuarios filtrados */}
            <AsignmentUserList
              semester={semester}
              filteredUsers={filteredUsers}
              handleAssign={handleAssign} // Pasar la función handleAssign individual
            />
          </div>

          {/* Asignaciones realizadas */}
         <AsignmentDesktopTable
            assignments={assignments}
            users={users}
            forms={forms}
            deleteAsign={handleDelete}
            loadingAssignments={loadingAssignments}
          />
        </>
      )}
    </div>
  );
}
