import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector
} from "recharts";

export default function StudentStatsVisualization({ studentData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const defaultData = [
    { name: "Por debajo de 0.5", value: 24 },
    { name: "Por encima de 0.5", value: 32 }
  ];
  
  const data = studentData || defaultData;
  
  // Paleta de colores mejorada
  const COLORS = ["#ea580c", "#fdba74", "#9ca3af"];
  const GRADIENT_COLORS = ["#f97316", "#fb923c"];
  const RADIAN = Math.PI / 180;
  
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  
  // Etiquetas personalizadas con animación
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-semibold transition-all duration-300 transform hover:scale-110"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  // Diseño mejorado para el hover en el pie chart
  const renderActiveShape = (props) => {
    const { 
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value 
    } = props;
    
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 12}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
        <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs font-medium">
          {`${payload.name}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#666" className="text-xs">
          {`${value} estudiantes (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  // Tooltip mejorado con transición
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-xl transition-all duration-300 transform scale-100 hover:scale-105">
          <p className="font-bold text-gray-900 mb-1">{`${label}`}</p>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: payload[0].color }}></span>
            <p className="text-orange-600 font-medium">{`${payload[0].value} estudiantes`}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-gray-50 rounded-xl h-dic overflow-y-auto scroll-hidden border border-gray-200 transition-all duration-300">
      {/* Header con gradiente mejorado */}
      <div className="p-5 bg-gradient-to-r from-orange-500 to-orange-600 border-b border-orange-300">
        <h2 className="font-bold text-white text-xl flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 mr-3 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
            />
          </svg>
          Estadísticas de Rendimiento Estudiantil
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjetas de resumen mejoradas */}
          <div className="bg-gradient-to-b rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-sm font-bold text-gray-600 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Resumen General
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transform transition-all duration-300 hover:scale-105">
                <div className="text-xs text-gray-500 mb-1">Total</div>
                <div className="text-2xl text-center font-extrabold text-gray-800">{total}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transform transition-all duration-300 hover:scale-105">
                <div className="text-xs text-gray-500 mb-1">Sobre la media</div>
                <div className="text-2xl text-center font-extrabold text-orange-600">{data[0].value}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transform transition-all duration-300 hover:scale-105">
                <div className="text-xs text-gray-500 mb-1">Debajo de la media</div>
                <div className="text-2xl text-center font-extrabold text-gray-600">{data[1].value}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-auto flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              El {((data[0].value / total) * 100).toFixed(1)}% de los estudiantes está por debajo del umbral de 0.5
            </div>
          </div>

          {/* Gráfico de Barras Mejorado */}
          <div className="h-72 bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-sm font-bold text-gray-600 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Gráfico de Barras
            </h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  interval={0}
                  angle={0}
                  textAnchor="middle"
                />
                <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  name="Estudiantes"
                  radius={[4, 4, 0, 0]}
                >
                  {data.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#gradient-${index})`} 
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Bar>
                <defs>
                  {data.map((_, index) => (
                    <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GRADIENT_COLORS[index % GRADIENT_COLORS.length]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.9}/>
                    </linearGradient>
                  ))}
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Pastel - Ancho Completo */}
        <div className="mt-6 h-80 bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-sm font-bold text-gray-600 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Distribución de Estudiantes
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ paddingBottom: 10 }}
                formatter={(value, entry) => (
                  <span className="text-sm text-gray-700 font-medium flex items-center">
                    <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: entry.color }}></span>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}