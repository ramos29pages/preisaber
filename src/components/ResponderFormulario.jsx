// src/components/ResponderFormulario.jsx
import React, { useEffect, useState } from "react";
import { useUsers } from "../context/UserContext";
import { getAsignmentsPending } from "../services/questionService";
import { fetchFormDetails } from "../services/formService";
import { getUserById } from "../services/userService";

export default function ResponderFormulario() {
  const { user: userActive, loading: userLoading } = useUsers();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [qLoading, setQLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && userActive) {
      // Bandera para evitar ejecuciones duplicadas si las dependencias cambian rápidamente
      let isMounted = true;
      setQLoading(true);

      const loadAssignmentsWithDetails = async () => {
        try {
          const pendingAssignments = await getAsignmentsPending();
          if (!isMounted) return; // Evitar setState en componente desmontado
          console.log("Asignaciones pendientes obtenidas:", pendingAssignments);

          const assignmentsWithDetailsPromises = pendingAssignments.map(
            async (assignment) => {
              const [form, user] = await Promise.all([
                fetchFormDetails(assignment.form_id),
                getUserById(assignment.user_id),
              ]);
              if (!isMounted) return null; // Evitar operaciones en componente desmontado
              return { ...assignment, form, user };
            }
          );

          const assignmentsWithDetails = await Promise.all(
            assignmentsWithDetailsPromises
          );
          if (!isMounted) return; // Evitar setState en componente desmontado
          console.log(
            "Asignaciones con detalles obtenidos:",
            assignmentsWithDetails
          );
          setQuestions(assignmentsWithDetails[0].form.questions);
          // Aquí podrías establecer el estado de las preguntas si provienen de los formularios
          // setQuestions(assignmentsWithDetails.map(item => item.form.questions).flat());
        } catch (err) {
          console.error("Error al obtener las asignaciones con detalles:", err);
          // Manejar el error aquí, quizás establecer un estado de error
        } finally {
          if (isMounted) {
            setQLoading(false);
          }
        }
      };

      loadAssignmentsWithDetails();

      // Función de limpieza para evitar fugas de memoria
      return () => {
        isMounted = false;
      };
    }
  }, [userLoading, userActive]);

  const total = questions.length;
  const progress = total > 0 ? (current / total) * 100 : 0;

  const handleNext = () => {
    if (!answer) return;
    const newAnswers = [
      ...answers,
      { question: questions[current].pregunta, answer },
    ];
    setAnswers(newAnswers);
    setAnswer("");

    if (current + 1 < total) {
      setCurrent(current + 1);
    } else {
      // Ya usamos newAnswers que sí incluye la última respuesta
      console.log("Respuestas finales:", newAnswers);
      setCurrent(0);
      setAnswers([]);
    }
  };

  if (userLoading || qLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-orange-500">Cargando...</span>
      </div>
    );
  }

  if (total === 0) {
    return (
      <p className="text-center text-gray-500">
        No hay Formularios disponibles.
      </p>
    );
  }

  const { question: pregunta, options: opts } = questions[current];

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-orange-600 mb-4 text-center">
        Prueba {userActive.tipo_prueba}, {userActive.name}
      </h2>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-orange-500 h-2 rounded-full transition-width"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Indicador de pregunta */}
      <p className="text-sm text-gray-600 mb-4">
        Pregunta {current + 1} de {total}
      </p>

      {/* Pregunta y opciones */}
      <div className="space-y-3">
        <p className="text-lg font-medium">{pregunta}?</p>
        <div className="space-y-2">
          {opts.map((opt, idx) => (
            <label
              key={idx}
              className={`flex items-center p-2 border rounded-lg cursor-pointer transition-colors 
                ${
                  answer === opt
                    ? "bg-orange-50 border-orange-300"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              <input
                type="radio"
                name="respuesta"
                value={opt}
                className="form-radio text-orange-500 mr-2"
                checked={answer === opt}
                onChange={() => setAnswer(opt)}
              />
              <span className="text-gray-800">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botón siguiente */}
      <div className="mt-6 text-right">
        <button
          onClick={handleNext}
          disabled={!answer}
          className="px-4 py-2 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 disabled:opacity-50 transition"
        >
          {current + 1 < total ? "Siguiente" : "Finalizar"}
        </button>
      </div>
    </div>
  );
}
