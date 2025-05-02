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
  // If no data is provided, use demo data
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Default demo data if none provided
  const defaultData = [
    { name: "Por debajo de 0.5", value: 24 },
    { name: "Por encima de 0.5", value: 32 }
  ];
  
  const data = studentData || defaultData;
  
  // Colors for both charts
  const COLORS = ["#d97706", "#9ca3af"];
  const RADIAN = Math.PI / 180;
  
  // Handler for pie chart active segment
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  
  // Custom label for pie chart segments
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
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  // Active shape for pie chart hover effect
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
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">{`${payload.name}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#666" className="text-xs">
          {`${value} estudiantes (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  // Format for tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-orange-600">{`${payload[0].value} estudiantes`}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate total for summary
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-orange-100 to-orange-50 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800 text-lg flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2 text-orange-500" 
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

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Summary Cards */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex flex-col">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Resumen</h3>
            <div className="grid grid-cols-3 gap-3 mb-2">
              <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                <div className="text-xs text-gray-500">Total</div>
                <div className="text-xl font-bold text-gray-800">{total}</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                <div className="text-xs text-gray-500">&lt; 0.5</div>
                <div className="text-xl font-bold text-orange-500">{data[0].value}</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
                <div className="text-xs text-gray-500">&gt; 0.5</div>
                <div className="text-xl font-bold text-gray-500">{data[1].value}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-auto">
              El {((data[0].value / total) * 100).toFixed(1)}% de los estudiantes está por debajo del umbral de 0.5
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-64 bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Gráfico de Barras</h3>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Estudiantes">
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Full Width */}
        <div className="mt-6 h-72 bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Distribución de Estudiantes</h3>
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
                formatter={(value) => (
                  <span className="text-sm text-gray-700">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}