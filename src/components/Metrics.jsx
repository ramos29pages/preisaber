import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// Servicio para obtener las métricas
const fetchMetricsData = async () => {
  try {
    const response = await fetch('http://localhost:8000/metrics');
    if (!response.ok) {
      console.error('Error al obtener las métricas:', response.status);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error de conexión o al procesar la respuesta:', error);
    return null;
  }
};

// Componente de métricas
const Metrics = () => {
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMetrics = async () => {
      const data = await fetchMetricsData();
      setLoading(false);
      if (data) {
        setMetricsData(data);
      } else {
        // Datos dummy en caso de error o backend desconectado
        setMetricsData({
          labels: ['Hoy', 'Mañana', 'En 2 días', 'En 3 días', 'En 4 días'],
          datasets: [
            {
              label: 'Pruebas de Usuarios',
              data: [10, 15, 8, 20, 12],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'Pruebas',
              data: [10, 18, 81, 2, 12],
              fill: false,
              borderColor: 'rgb(75, 12, 192)',
              tension: 0.1,
            },
          ],
        });
        setError('No se pudieron cargar las métricas del servidor. Mostrando datos de ejemplo.');
      }
    };

    getMetrics();
  }, []);

  if (loading) {
    return <div className='h-100 w-full text-gray-500 animate-pulse mb-4 bg-gray-200 rounded-xl'>Cargando métricas...</div>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'crimson', fontSize: '0.8rem', textAlign: 'center' }}>{error}</p>
        {metricsData && (
          <Line
            data={metricsData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Cantidad de Usuarios que Hacen Pruebas por Día (Ejemplo)',
                },
              },
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      {metricsData && (
        <Line
          data={metricsData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Cantidad de Usuarios que Hacen Pruebas por Día',
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Metrics;