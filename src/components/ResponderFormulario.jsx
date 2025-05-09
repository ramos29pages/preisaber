// src/components/ResponderFormulario.jsx
import React, { useState } from "react";
import { useUsers } from "../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheck, faArrowRight, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export default function ResponderFormulario({ questions = [], assignmentId }) {
  const { user: userActive, loading: userLoading } = useUsers();
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const total = questions.length;
  const progress = total > 0 ? (current / total) * 100 : 0;

  const handleNext = () => {
    if (!answer) return;
    
    const newAnswers = [
      ...answers,
      { 
        question: questions[current]?.pregunta || questions[current]?.question, 
        answer 
      }
    ];
    setAnswers(newAnswers);
    setAnswer("");

    if (current + 1 < total) {
      setCurrent(current + 1);
    } else {
      // Aquí es donde se "envían" las respuestas
      console.log("Respuestas finales para enviar:", newAnswers);
      console.log("ID de la asignación:", assignmentId);
      
      // Simulamos el envío
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setCompleted(true);
      }, 1000);
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FontAwesomeIcon icon={faSpinner} spin className="text-orange-500 mr-2" />
        <span className="text-orange-500">Cargando...</span>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="text-center py-10 px-4">
        <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-400 text-5xl mb-4" />
        <p className="text-gray-500">No hay preguntas disponibles para este formulario.</p>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FontAwesomeIcon icon={faCheck} className="text-green-500 text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Formulario completado!</h2>
        <p className="text-gray-600 mb-6">Tus respuestas han sido enviadas correctamente.</p>
        <p className="text-sm text-gray-500">Total de preguntas respondidas: {total}</p>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-center">
        <FontAwesomeIcon icon={faSpinner} spin className="text-orange-500 text-3xl mb-4" />
        <p className="text-gray-600">Enviando tus respuestas...</p>
      </div>
    );
  }

  // Obtenemos la pregunta actual y sus opciones
  const currentQuestion = questions[current] || {};
  const pregunta = currentQuestion.pregunta || currentQuestion.question || ""; 
  const opts = currentQuestion.options || currentQuestion.opciones || [];

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-orange-600 mb-4 text-center">
        {userActive?.tipo_prueba ? `Prueba ${userActive.tipo_prueba}, ` : ""}{userActive?.name || ""}
      </h2>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Indicador de pregunta */}
      <p className="text-sm text-gray-600 mb-4">
        Pregunta {current + 1} de {total}
      </p>

      {/* Pregunta y opciones */}
      <div className="space-y-3">
        <p className="text-lg font-medium">{pregunta}{!pregunta.endsWith('?') ? '?' : ''}</p>
        <div className="space-y-2">
          {opts.map((opt, idx) => (
            <label
              key={idx}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors 
                ${
                  answer === opt
                    ? "bg-orange-50 border-orange-300 shadow-sm"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              <input
                type="radio"
                name="respuesta"
                value={opt}
                className="form-radio text-orange-500 mr-3"
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
          className="px-4 py-2 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 disabled:opacity-50 transition-colors flex items-center ml-auto"
        >
          {current + 1 < total ? (
            <>
              Siguiente <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </>
          ) : (
            <>
              Finalizar <FontAwesomeIcon icon={faCheck} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}