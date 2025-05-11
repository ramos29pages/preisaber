import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGears,
  faInfoCircle,
  faUserTie,
  faUsers,
  faLock,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { ADMINISTRADORES } from "../constants/configuration";
import VariablesInfo from "../components/configuraciones/VariablesInfo";
import DummyVariablesInfo from "../components/configuraciones/DummyVariablesInfo";

// Componente para secciones informativas con animación sutil
const InfoSection = ({ title, icon, children }) => (
  <div className="mb-8 animate__animated animate__fadeIn">
    <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-100">
      <div className="p-2 bg-orange-50 rounded-lg">
        <FontAwesomeIcon icon={icon} className="text-orange-500" size="lg" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="pl-2">{children}</div>
  </div>
);

// Componente para elementos de lista mejorado
const ListItem = ({ icon, children }) => (
  <div className="flex items-center p-4 mb-3 bg-white rounded-lg shadow-sm text-gray-700 transition-all duration-300 hover:shadow-md hover:bg-orange-50 border border-gray-100">
    <div className="p-2 bg-orange-100 rounded-full mr-4">
      <FontAwesomeIcon icon={icon} className="text-orange-600" size="sm" />
    </div>
    <span className="text-sm font-medium">{children}</span>
  </div>
);

// Componente para estadísticas/KPIs
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
    <div className="flex items-center mb-3">
      <div className="p-2 bg-orange-100 rounded-lg mr-3">
        <FontAwesomeIcon icon={icon} className="text-orange-500" />
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
  </div>
);

export default function Configuration() {
  return (
    <div className="h-dic flex flex-col overflow-hidden">
      {/* Barra superior con nombre del sistema */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <FontAwesomeIcon icon={faGears} className="text-orange-600" />
              </div>
              <span className="font-semibold text-gray-800">Predisaber</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 hidden md:block">Versión 2.1.0</span>
              <div className="h-4 w-px bg-gray-200 mx-2"></div>
              <span className="text-xs text-gray-500">Panel de Configuración</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor con scroll */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Encabezado de página */}
          <div className="mb-8">
            <h1 className="md:text-3xl text-xl font-bold text-gray-900">Configuración del Sistema</h1>
            <p className="mt-2 text-sm text-gray-600">
              Gestione los parámetros y ajustes de la plataforma Predisaber
            </p>
          </div>

          {/* Indicadores KPI simplificados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              icon={faUsers} 
              title="Tipos de Usuario" 
              value="2" 
            />
            <StatCard 
              icon={faUserTie} 
              title="Administradores" 
              value={ADMINISTRADORES.length} 
            />
            <StatCard 
              icon={faLock} 
              title="Dominios" 
              value="2" 
            />
            <StatCard 
              icon={faCog} 
              title="Variables" 
              value="4" 
            />
          </div>

          {/* Panel principal de configuraciones */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faCog} className="text-white" size="lg" />
                <h2 className="text-xl font-semibold text-white">Panel de Control</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <InfoSection title="Dominios Autorizados" icon={faLock}>
                    <ListItem icon={faLock}>curnvirtual.edu.co</ListItem>
                    <ListItem icon={faLock}>uninunez.edu.co</ListItem>
                  </InfoSection>

                  <InfoSection title="Roles del Sistema" icon={faUsers}>
                    <ListItem icon={faUsers}>Estudiante</ListItem>
                    <ListItem icon={faUserTie}>Docente</ListItem>
                  </InfoSection>
                </div>

                <div>
                  <InfoSection title="Administradores" icon={faUserTie}>
                    {ADMINISTRADORES.map((admin, index) => (
                      <ListItem icon={faUserTie} key={index}>
                        {admin}
                      </ListItem>
                    ))}
                  </InfoSection>

                  {/* Tarjeta informativa mejorada */}
                  <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600" />
                      </div>
                      <h3 className="font-medium text-blue-800">Estado del Sistema</h3>
                    </div>
                    <p className="text-xs md:text-sm text-center text-gray-600">
                      El sistema está funcionando correctamente. Todos los servicios están activos y respondiendo con normalidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Componentes adicionales en un diseño de pestañas visualmente */}
          <div className="bg-white hidden md:block rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <div className="flex">
                <div className="px-6 py-3 font-medium text-sm text-gray-800 border-b-2 border-orange-500">
                  Variables del Sistema
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <VariablesInfo />
                <DummyVariablesInfo />
              </div>
            </div>
          </div>

          {/* Footer mejorado */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <FontAwesomeIcon className="text-orange-600" icon={faInfoCircle} />
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Predisaber es una aplicación diseñada para optar por el título
                de Ingeniería de Sistemas en la Corporación Universitaria Rafael
                Nuñez. Permite registrar usuarios, formularios y modelos de
                extensión .pickle para clasificación.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap justify-center gap-8">
                <div>
                  <p className="text-xs font-medium text-gray-800">Desarrollado por</p>
                  <p className="text-xs text-gray-500 mt-1">Daniel Ramos - Juan Salinas</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800">Versión</p>
                  <p className="text-xs text-gray-500 mt-1">2.1.0</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800">© 2025</p>
                  <p className="text-xs text-gray-500 mt-1">Predisaber</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}