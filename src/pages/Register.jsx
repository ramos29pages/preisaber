// src/pages/Register.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEdit,
  faPaperclip,
  faUserPlus,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";
// import { getUsers } from "../services/userService";
import { SkeletonUser } from "../components/SkeletonUser";

// const dummyUsers = [
//   {
//     name: "Luis Gómez",
//     email: "luisgomez21@curnvirtual.edu.co",
//     role: "estudiante dummy",
//     semester: "5",
//     identificacion: "3",
//     tipo_prueba: "tecnologica",
//     id: "6803e4fd011c17f714dbc8e0",
//     picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
//   },
// ];

const Register = () => {
  // const [loading, setLoading] = useState(true);
  let [_showAddButtons, setShowAddButtons] = useState(false);

  // Cargar usuarios al iniciar la app
  // const fetchUsers = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await getUsers();
  //     // Si el array está vacío o es falsy, usar dummyUsers
  //     if (Array.isArray(data) && data.length > 0) {
  //       setUsers(data);
  //     } else {
  //       console.log("Backend sin datos, cargando usuarios dummy...", loading);
  //       setUsers(dummyUsers);
  //     }
  //   } catch (error) {
  //     console.error("Error al obtener usuarios del service:", error);
  //     // En caso de error (backend caído), cargar dummy
  //     setUsers(dummyUsers);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const { users, user } = useUsers();

  console.log('USER ACTIVE',user);
  // const [users, setUsers] = useState([]);
  
  console.log(users);
  
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Filtrar usuarios según búsqueda
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Barra de búsqueda y botón agregar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white flex-1 mr-4">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar usuario..."
              className="w-full focus:outline-none text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="w-10 h-10 bg-orange-500 rounded-lg hover:bg-orange-600 cursor-pointer transition-colors text-white focus:outline-none"
            aria-label="Agregar usuarios"
            onClick={() => setShowAddButtons(true)}
          >
            <FontAwesomeIcon icon={faUserPlus} size="md" />
          </button>
        </div>

        {/* Lista de usuarios con scroll */}
        <div
          className="bg-white shadow rounded-md divide-y divide-gray-200 overflow-y-auto"
          style={{ height: "calc(100dvh - 60px - 120px)" }}
        >
          {_showAddButtons && (
            <div className="flex absolute justify-center z-10 top-0 left-0 h-full flex-col items-center p-10 w-full bg-black/50 ">
              <div className="flex  flex-col p-12 rounded relative items-center justify-between max-w-2xl bg-white mb-4 animate__animated animate__bounceIn">
                <div className="flex items-center justify-between w-full mb-4">
                  <button
                    onClick={() => setShowAddButtons(false)}
                    title="Cerrar"
                    className="bg-orange-500 text-white rounded-full p-2 px-4 hover:bg-red-600 transition-all cursor-pointer absolute -top-2 -right-2"
                  >
                    <FontAwesomeIcon icon={faClose} size="sm" />
                  </button>
                </div>

                <h1 className="text-xl text-center text-gray-600 font-semibold mb-8">
                  ¿ Como deseas continuar?{" "}
                </h1>

                <div className="flex flex-col md:flex-row gap-4 mt-2">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all cursor-pointer hover:scale-105"
                   onClick={() => navigate("/add-user")}>
                    <FontAwesomeIcon className="mr-2" icon={faUserPlus} size="sm" />
                    Agregar usuario Individual
                  </button>
                  <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all cursor-pointer hover:scale-105"
                    onClick={() => navigate("/add-registers")}
                  >
                    <FontAwesomeIcon className="mr-2" icon={faUserPlus} size="sm" />
                    Agregar desde csv o excel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* lista de usuarios con filtros funciando */}

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-10 h-10 overflow-hidden bg-gray-100 rounded-full ring-4 ring-gray-300">
                      <img
                        className="object-cover w-full h-full"
                        src={
                          user.picture ||
                          "https://st4.depositphotos.com/14903220/24649/v/450/depositphotos_246499746-stock-illustration-abstract-sign-avatar-men-icon.jpg"
                        }
                        alt="User avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-orange-500">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate font-semibold w-26 md:w-50">
                      {user.email}
                    </p>
                    <p className="font-semibold text-xs max-w-40 text-orange-400 bg-orange-50 p-1 px-2 rounded-md">
                      <FontAwesomeIcon icon={faPaperclip} size="s" /> Prueba{" "}
                      {user.tipo_prueba.toLowerCase()}
                    </p>
                    {/* <p className="text-xs font-bold text-gray-500">
                      {user.role}
                    </p> */}
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    title="Editar Registro"
                    className="mx-1 text-orange-500 p-2 rounded-full transition-colors"
                    // Aquí implementar lógica para editar
                    onClick={() => navigate(`/add-registers?edit=${user.id}`)}
                  >
                    <FontAwesomeIcon icon={faEdit} size="xl" />
                  </button>
                  {/* <button
                    title="Eliminar Registro"
                    className="mx-1 text-red-500 p-2 rounded-full transition-colors"
                    onClick={() => removeUser(user.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} size="xl" />
                  </button> */}
                </div>
              </div>
            ))
          ) : (
            <div>
              <SkeletonUser />
              <SkeletonUser />
              <SkeletonUser />
              <SkeletonUser />
              <SkeletonUser />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
