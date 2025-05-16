// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser, getUserById } from "../services/userService";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  // const email = localStorage.getItem("host_email");
  const { user: userAuth } = useAuth();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar usuarios al iniciar la app
  useEffect(() => {
    fetchUsers();
    // console.log('usuarios tods: ' , users);

  }, []);
  

  const fetchUsers = async ()=>{
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
    // console.log('usuarios: ' , data);

    if(userAuth.role === 'estudiante'){
      const userActive = await getUserById(localStorage.getItem("host_email"));
      setUser(userActive);
      // console.log('userActive', userActive);
    }
  }

  // Funciones CRUD
  const createUser = async (user) => {
    const newUser = await addUser(user);
    setUsers((prev) => [newUser, ...prev]);
  };

  const getUser = async (id) => {
    return await getUserById(id);
    ;
  };

  const editUser = async (user) => {
    const updated = await updateUser(user);
    setUsers((prev) =>
      prev.map((u) => (u.id === updated.id ? updated : u))
    );
  };

  const removeUser = async (userId) => {
    await deleteUser(userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <UserContext.Provider
      value={{ users, setUsers, createUser, editUser, removeUser, getUser, user, loading, fetchUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
