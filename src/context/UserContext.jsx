// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar usuarios al iniciar la app
  const fetchUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    console.log(data);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Funciones CRUD
  const createUser = async (user) => {
    const newUser = await addUser(user);
    setUsers((prev) => [newUser, ...prev]);
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
      value={{ users, loading, createUser, editUser, removeUser, fetchUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
