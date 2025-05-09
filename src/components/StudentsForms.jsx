// src/components/StudentsForms.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Ajusta la ruta según tu estructura
import { useUsers } from "../context/UserContext";
import { getAsignmentsPending } from "../services/questionService";
import { fetchFormDetails } from "../services/formService";
import { getUserById } from "../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faArrowLeft,
  faUser,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import StudentFormTableDesktop from "./StudentFormTableDesktop";
import ResponderFormulario from "./ResponderFormulario";
import StudentFormCardsMobile from "./StudentFormCardsMobile";

export default function StudentsForms() {
  const { user } = useAuth();
  const { user: userActive, loading: userLoading } = useUsers();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const host_email = localStorage.getItem("host_email");

  // Capitaliza la primera letra de un string
  const capitalizeFirstLetter = (input) => {
    const str = String(input || ""); // garantiza que sea string y maneja nulos
    if (str.length === 0) return ""; // maneja cadena vacía
    const first = str.charAt(0).toUpperCase();
    const rest = str.slice(1).toLowerCase();
    return first + rest;
  };

  useEffect(() => {
    if (!userLoading && userActive) {
      let isMounted = true;
      setLoading(true);

      const loadAssignments = async () => {
        try {
          const pendingAssignments = await getAsignmentsPending();
          if (!isMounted) return;

          const assignmentsWithDetailsPromises = pendingAssignments.map(
            async (assignment) => {
              const [form, user] = await Promise.all([
                fetchFormDetails(assignment.form_id),
                getUserById(assignment.user_id),
              ]);
              if (!isMounted) return null;
              return { ...assignment, form, user };
            }
          );

          const assignmentsWithDetails = await Promise.all(
            assignmentsWithDetailsPromises.filter(Boolean)
          );

          if (!isMounted) return;
          
          setAssignments(assignmentsWithDetails.filter(a => a.user.email === host_email));
        } catch (err) {
          console.error("Error al obtener las asignaciones:", err);
          if (isMounted) {
            setError(
              "No se pudieron cargar las asignaciones. Por favor, intente más tarde."
            );
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      loadAssignments();

      return () => {
        isMounted = false;
      };
    }
  }, [userLoading, userActive]);

  const handleCompleteForm = (assignment) => {
    setSelectedAssignment(assignment);
    console.log(
      "Preguntas seleccionadas para responder:",
      assignment.form.questions
    );
  };

  const handleBackToList = () => {
    setSelectedAssignment(null);
    setSearchQuery("");
  };

  // Mostrar pantalla de carga
  if (userLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
          <div className="absolute inset-1 border-4 border-orange-100 border-solid rounded-full"></div>
        </div>
        <span className="mt-4 text-orange-500 font-medium">
          Cargando asignaciones...
        </span>
      </div>
    );
  }

  // Mostrar mensaje de error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-red-500 text-2xl"
          />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Ocurrió un problema
        </h3>
        <p className="text-gray-600 text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Mostrar el componente ResponderFormulario si hay una asignación seleccionada
  if (selectedAssignment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-4 h-dic scroll-hidden overflow-y-auto">
        <button
          onClick={handleBackToList}
          className="mb-6 flex items-center text-orange-500 hover:text-orange-700 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Volver a mis
          formularios
        </button>

        <div className="mb-6 sticky top-0 z-20 bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            {selectedAssignment.form.name || "Formulario sin título"}
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
              <span>
                Asignado por: {selectedAssignment.asigned_by || "No definido"}
              </span>
            </div>
            {selectedAssignment.created_at && (
              <div className="flex items-center sm:ml-6">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-gray-400 mr-2"
                />
                <span>
                  {new Date(selectedAssignment.created_at).toLocaleDateString(
                    "es-ES",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        <ResponderFormulario
          questions={selectedAssignment.form.questions}
          assignmentId={selectedAssignment.id}
        />
      </div>
    );
  }

  // Nombre del usuario para el saludo
  const userName = capitalizeFirstLetter(
    user?.given_name || userActive?.name || "Estudiante"
  );

  if (assignments.length === 0) {
    return (
      <>
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Hola {userName}, espero te encuentres bien.
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            No hay formularios pendientes para responder.
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 overflow-y-auto overflow-x-hidden scroll-hidden h-dic">
      {/* Encabezado */}
      <div className="mb-8 animate__animated animate__fadeIn animate__faster">
        <div className="bg-gradient-to-r from-orange-400 to-amber-600 rounded-3xl p-8 shadow-lg transform transition-all hover:scale-[1.03] hover:shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-4">
                <span className="animate__animated animate__bounceIn animate__faster">
                  🌞
                </span>
                ¡Hola {userName}!
                <span className="text-yellow-200 animate__animated animate__heartBeat animate__infinite animate__slow">
                  🔥
                </span>
              </h1>
              <p className="text-sm sm:text-base text-orange-100 animate__animated animate__fadeInUp animate__delay-1s">
                ¡Desbloquea tu futuro! Bienvenido a Predisaber 🚀
                <span className="block mt-1">
                  Hoy es un gran día para avanzar!
                </span>
              </p>
            </div>

            <div className="flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-orange-300/30">
              <div className="flex items-center gap-3 text-white">
                <span className="text-3xl animate__animated animate__swing animate__delay-2s">
                  📅
                </span>
                <span className="font-medium">
                  {new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-5 bg-white/10 rounded-2xl border border-orange-300/20 animate__animated animate__fadeInUp animate__delay-2s">
            <p className="text-white text-sm sm:text-base flex items-center gap-3">
              <span className="text-xl animate__animated animate__wobble animate__infinite animate__slower">
                📌
              </span>
              Tienes{" "}
              <span className="font-bold text-yellow-200">
                {assignments.filter(a => a.status).length} formularios pendientes
              </span>{" "}
              por completar hoy
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium animate__animated animate__fadeInRight animate__delay-3s">
              📝 {assignments.length} Totales
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium animate__animated animate__fadeInRight animate__delay-4s">
              ⏰ Sin Limite
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium animate__animated animate__fadeInRight animate__delay-5s">
              🎯 ¡Completa todos!
            </span>
          </div>
        </div>
      </div>
      {/* Vista adaptativa: Tabla en desktop, Tarjetas en móvil */}
      <div className="hidden md:block">
        <StudentFormTableDesktop
          assignments={assignments}
          onCompleteForm={handleCompleteForm}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="md:hidden">
        <StudentFormCardsMobile
          assignments={assignments.filter(a=> a.user.email === host_email)}
          onCompleteForm={handleCompleteForm}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <h1 className="text-[8px] text-gray-400 mt-10 text-end">@Ramosdev</h1>
      </div>
    </div>
  );
}
