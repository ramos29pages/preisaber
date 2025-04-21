// src/components/ResponderFormulario.jsx
import React, { useEffect, useState } from "react";
import { useUsers } from "../context/UserContext";
import { getQuestionsByType } from "../services/questionService";

export default function ResponderFormulario() {
  const { user: userActive, loading: userLoading } = useUsers();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [qLoading, setQLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && userActive?.tipo_prueba) {
      setQLoading(true);
      getQuestionsByType(userActive.tipo_prueba)
        .then((data) => setQuestions(data))
        .catch(console.error)
        .finally(() => setQLoading(false));
    }
  }, [userLoading, userActive]);

  const total = questions.length;
  const progress = total > 0 ? ((current) / total) * 100 : 0;

  const handleNext = () => {
    if (!answer) return;
    setAnswers(prev => [...prev, { question: questions[current].pregunta, answer }]);
    setAnswer("");
    if (current + 1 < total) {
      setCurrent(current + 1);
    } else {
      // TODO: enviar respuestas al backend
      console.log("Respuestas finales:", answers);
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
    return <p className="text-center text-gray-500">No hay preguntas disponibles.</p>;
  }

  const { pregunta, respuestas: opts } = questions[current];

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
                ${answer === opt ? 'bg-orange-50 border-orange-300' : 'border-gray-300 hover:bg-gray-50'}`}
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
          {current + 1 < total ? 'Siguiente' : 'Finalizar'}
        </button>
      </div>
    </div>
  );
}
