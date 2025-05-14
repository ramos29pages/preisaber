// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Metrics from '../components/Metrics';
import StudentStatsVisualizationSkeleton from '../components/StudentStatsVisualizationSkeleton';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [chartData, setChartData] = useState(null);

  // Función para transformar la respuesta de la API
  function mapPredictionsToChartData(items) {
    const counts = items.reduce(
      (acc, { prediction }) => {
        if (prediction === 0) acc.below += 1;
        else acc.above += 1;
        return acc;
      },
      { below: 0, above: 0 }
    );

    return [
      { name: "Por debajo de la media", value: counts.below },
      { name: "Por encima de la media", value: counts.above },
    ];
  }

  useEffect(() => {
    if (!isAuthenticated) return;

    // Reemplaza '/api/endpoint' con tu ruta real
    fetch('https://predisaber-backend.onrender.com/resultados')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos');
        console.log('RESULTADOS PRA CHART', res);
        return res.json();
      })
      .then((data) => {
        const transformed = mapPredictionsToChartData(data);
        setChartData(transformed);
      })
      .catch(err => {
        console.error(err);
        // Aquí podrías mostrar una notificación de error al usuario
      });
  }, [isAuthenticated]);

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Estado de carga
  if (chartData === null) {
    return (
      <div className="flex justify-center items-center h-full">
        <StudentStatsVisualizationSkeleton/>
      </div>
    );
  }

  // Render según rol
  if (user.role === 'docente' || user.role === 'administrador') {
    return (
      <div className="w-full h-full overflow-y-auto">
        <Metrics studentData={chartData} />
      </div>
    );
  }

  if (user.role === 'estudiante') {
    return <h1>Hola estudiante</h1>;
  }

  return <h1>Hola invitado</h1>;
};

export default Home;
