import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUsers, 
  faClipboardList, 
  faChartBar, 
  faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ userRole = 'administrador' }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Define menu items with role-based access control
  const menuItems = [
    { 
      id: 'inicio', 
      label: 'Inicio', 
      icon: faHome, 
      path: '/',
      allowedRoles: ['administrador', 'docente', 'estudiante'] // Everyone can access home
    },
    { 
      id: 'registros', 
      label: 'Registros', 
      icon: faUsers, 
      path: '/registros',
      allowedRoles: ['administrador', 'docente'] // Only admin and teachers can access registros
    },
    { 
      id: 'formularios', 
      label: 'Formularios', 
      icon: faClipboardList, 
      path: '/formularios',
      allowedRoles: ['administrador', 'docente', 'estudiante'] // Everyone can access forms
    },
    { 
      id: 'resultados', 
      label: 'Resultados', 
      icon: faChartBar, 
      path: '/resultados',
      allowedRoles: ['administrador', 'docente'] // Only admin and teachers can see results
    },
    { 
      id: 'predisaber', 
      label: 'Predisaber', 
      icon: faInfoCircle, 
      path: '/predisaber',
      allowedRoles: ['administrador', 'estudiante'] // Only admin and students can access predisaber
    }
  ];

  // Filter menu items based on user role
  const authorizedMenuItems = menuItems.filter(item => 
    item.allowedRoles.includes(userRole)
  );

  return (
    <nav className="flex flex-col w-full bg-white">
      {authorizedMenuItems.map((item) => {
        const isActive = currentPath === item.path;
        
        return (
          <Link 
            key={item.id}
            to={item.path} 
            className={`flex flex-col items-center py-4 border-b border-gray-200 transition-colors duration-200 ${
              isActive ? 'text-orange-500 font-medium' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <FontAwesomeIcon 
              icon={item.icon} 
              className={`text-xl mb-1 ${
                isActive ? 'text-orange-400' : 'text-gray-300'
              }`} 
            />
            <span className={`text-xs text-gray-400 ${
                isActive ? 'text-orange-400' : 'text-gray-400'
              }`} >{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;