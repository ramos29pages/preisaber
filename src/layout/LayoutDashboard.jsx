// src/components/Layout.jsx
import Header from '../components/Header';
import NavBar from '../components/Navbar';
import { useState } from 'react';
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
    const { user } = useAuth();

  return (
    <div className="min-h-[100dvh] min-w-screen flex flex-col">
      <Header onMenuClick={() => setMenuAbierto(!menuAbierto)} />
      <div className="flex flex-1">
        {/* Menú lateral: se muestra siempre en pantallas medianas en adelante */}
        <div className={`bg-white p-4 ${menuAbierto ? 'block' : 'hidden'} md:block`}>
          <NavBar userRole={user.role}/>
        </div>
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
