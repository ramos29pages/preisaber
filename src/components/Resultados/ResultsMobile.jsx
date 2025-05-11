import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faEye } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getUserById } from '../../services/userService';
import { fetchFormDetails } from '../../services/formService';

export default function ResultsMobile({ resultados, selectedResult, setSelectedResult }) {
  const [enrichedResults, setEnrichedResults] = useState([]);

  useEffect(() => {
    if (resultados.length > 0) loadEnrichedResults();
  }, [resultados]);

  const loadEnrichedResults = async () => {
    try {
      const enriched = await Promise.all(
        resultados.map(async (r) => {
          const user = await getUserById(r.user_id);
          const form = await fetchFormDetails(r.form_id);
          return { ...r, user, form };
        })
      );
      setEnrichedResults(enriched);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 scroll-hidden h-dic overflow-y-scroll">
      <div className="space-y-4">
        {enrichedResults.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Usuario</p>
                <p className="font-medium">{r.user.name}</p>
              </div>
              <button
                onClick={() => setSelectedResult(r)}
                className="flex items-center bg-orange-500 text-white px-3 py-1 rounded-2xl hover:bg-orange-600 transition"
              >
                <FontAwesomeIcon icon={faEye} className="mr-1" /> Ver más
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>
                <p>Formulario</p>
                <p className="font-medium">{r.form.name}</p>
              </div>
              <div>
                <p>Asignado por</p>
                <p className="font-medium">{r.asigned_by}</p>
              </div>
              <div>
                <p>Completado</p>
                <p className="font-medium">{r.completed_at}</p>
              </div>
              <div>
                <p>Predicción</p>
                {r.prediction > 0 && <p className="font-medium bg-green-50 text-green-800">Encima de la media</p>}
                {r.prediction == 0 && <p className="font-medium bg-red-50 text-red-800 text-xs p-2 rounded-md">Debajo de la media</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {enrichedResults.length === 0 && (
        <div className="py-4 text-gray-400 flex items-center">
          <FontAwesomeIcon className="mr-2" icon={faDatabase} />
          No hay conexión con la base de datos.
        </div>
      )}

      {selectedResult && (
        <DetailModal
          result={selectedResult}
          user={selectedResult.user}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
}

// Componente Modal separado (versión mobile responsiva)
function DetailModal({ result, user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="space-y-4 p-4">
          {/* Tarjeta usuario */}
          <div className="flex items-center space-x-4">
            <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold text-orange-500">{user.name}</h3>
              <p className="text-gray-600">Semestre {user.semester}</p>
              <p className="text-gray-500 text-sm">ID: {user.id}</p>
            </div>
          </div>

          {/* Respuestas */}
          <div>
            <h2 className="text-md font-semibold mb-2 text-orange-500">Respuestas</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {result.responses.map((resp, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-sm">{resp.question}</p>
                  <p className="text-gray-700 text-sm">{resp.response}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
