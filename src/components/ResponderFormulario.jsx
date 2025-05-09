import React, { useState } from "react";
import { useUsers } from "../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpinner, 
  faCheck, 
  faArrowRight, 
  faQuestionCircle,
  faArrowLeft,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';

export default function ResponderFormulario({ questions = [], assignmentId }) {
  const { user: userActive, loading: userLoading } = useUsers();
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const total = questions.length;
  const progress = total > 0 ? (current / total) * 100 : 0;

  const transitionClass = "transform transition-all duration-300 ease-in-out";

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
      setShowConfirm(true);
    }
  };

  const confirmSubmit = () => {
    setSubmitting(true);
    setShowConfirm(false);
    setTimeout(() => {
      setSubmitting(false);
      setCompleted(true);
    }, 1500);
  };
  if (userLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md w-full">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-orange-100">
            <FontAwesomeIcon icon={faSpinner} spin className="text-orange-500 text-3xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Cargando tu experiencia</h2>
          <p className="text-gray-600">Preparando el mejor entorno para tus respuestas...</p>
        </div>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faQuestionCircle} className="text-blue-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Sin contenido disponible</h2>
          <p className="text-gray-600 mb-6">No hay preguntas para este formulario. Por favor, vuelve más tarde o contacta con el administrador.</p>
          <div className="inline-flex items-center text-blue-500 font-medium">
            <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
            <span>¡La paciencia es clave!</span>
          </div>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-50"></div>
            <FontAwesomeIcon icon={faCheck} className="text-green-600 text-4xl z-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">¡Formulario completado!</h2>
          <p className="text-gray-600 mb-6">Tus respuestas han sido enviadas correctamente. Gracias por tu participación.</p>
          <p className="text-sm text-gray-500 mb-2">Total de preguntas respondidas: {total}</p>
          <p className="text-sm text-gray-500">ID de asignación: {assignmentId}</p>
          <div className="mt-8">
            <div className="h-1 w-20 bg-green-200 rounded-full mx-auto"></div>
            <p className="text-sm text-green-600 mt-4">Tu contribución es valiosa</p>
          </div>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <FontAwesomeIcon icon={faSpinner} spin className="text-orange-500 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Enviando tus respuestas</h2>
          <p className="text-gray-600 mb-6">Esto no tomará más de un momento...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (showConfirm) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto -mt-10 mb-4">
            <FontAwesomeIcon icon={faQuestionCircle} className="text-orange-500 text-2xl" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">¿Finalizar formulario?</h2>
          <p className="text-gray-600 mb-6">Estás a punto de enviar tus respuestas. ¿Deseas continuar?</p>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Preguntas respondidas: {answers.length} de {total}</p>
 
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
            >
              Volver
            </button>
            <button
              onClick={confirmSubmit}
              className="px-6 py-2.5 rounded-xl bg-orange-400 text-white font-medium hover:bg-orange-700 transition-all shadow-lg"
            >
              Confirmar y Enviar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[current] || {};
  const pregunta = currentQuestion.pregunta || currentQuestion.question || ""; 
  const opts = currentQuestion.options || currentQuestion.opciones || [];

  return (
    <div className="min-h-[80vh] pb-10 flex flex-col items-center justify-center px-4">
      <div className={`w-full max-w-xl ${transitionClass}`}>
        {/* Tarjeta principal */}
        <div className="rounded-2xl p-6 sm:p-8 mb-6">
          {/* Información del usuario */}
          <div className="mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 text-center">
              {userActive?.tipo_prueba ? `Prueba ${userActive.tipo_prueba}, ` : ""}{userActive?.name || ""}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 text-center mt-1">
              ID de asignación: {assignmentId}
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progreso</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Navegación anterior */}
          {current > 0 && (
            <button 
              onClick={() => setCurrent(current - 1)}
              className="p-2 rounded-full bg-gray-100 text-gray-600 shadow-sm hover:shadow transition-all mb-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}

          {/* Contenido de la pregunta */}
          <div className="min-h-[250px] sm:min-h-[300px] flex flex-col justify-between">
            {/* Contador de pregunta */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Pregunta {current + 1} de {total}
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-600">
                Obligatoria
              </span>
            </div>

            {/* Pregunta */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {pregunta}{!pregunta.endsWith('?') ? '?' : ''}
            </h3>

            {/* Opciones de respuesta */}
            <div className="space-y-3 mb-6">
              {opts.map((opt, idx) => (
                <label
                  key={idx}
                  className={`flex items-center p-3 sm:p-4 border rounded-xl cursor-pointer transition-all duration-200 
                    ${answer === opt 
                      ? "bg-orange-50 border-orange-300 shadow-sm" 
                      : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <input
                    type="radio"
                    name="respuesta"
                    value={opt}
                    className="hidden"
                    checked={answer === opt}
                    onChange={() => setAnswer(opt)}
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 sm:mr-4 flex-shrink-0 transition-colors
                    ${answer === opt 
                      ? "border-orange-500 bg-orange-500" 
                      : "border-gray-300"
                    }`}
                  >
                    {answer === opt && (
                      <div className="w-full h-full rounded-full bg-white transform scale-75"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Botón de acción */}
        <div className={`mt-4 ${transitionClass}`}>
          <button
            onClick={handleNext}
            disabled={!answer}
            className={`w-full py-3 px-6 rounded-xl text-white font-medium shadow-lg transition-all
              ${answer 
                ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 hover:shadow-md" 
                : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {current + 1 < total ? (
              <span className="flex items-center justify-center">
                Siguiente pregunta <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Finalizar y enviar <FontAwesomeIcon icon={faCheck} className="ml-2" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}