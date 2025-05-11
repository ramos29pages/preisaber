// src/components/Layout.jsx
import Header from '../components/Header';
import NavBar from '../components/Navbar';
import { useState } from 'react';
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
    const { user } = useAuth();

  return (
    <div className="min-h-[90dvh] min-w-screen flex flex-col bg-gray-50 max-w-screen overflow-hidden">
      <Header onMenuClick={() => setMenuAbierto(!menuAbierto)} />
      <div className="flex flex-1">
        {/* Menú lateral: se muestra siempre en pantallas medianas en adelante */}
        <div className={`bg-white p-4 ${menuAbierto ? 'block' : 'hidden'} md:block`}>
          <NavBar userRole={user.role}/>
        </div>
        <main className="flex-1 p-2 h-dic">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
