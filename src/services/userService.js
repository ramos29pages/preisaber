// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/usuarios';
const DEFAULT_PICTURE = 'https://static-00.iconduck.com/assets.00/profile-user-icon-512x512-nm62qfu0.png';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});



const dummyUsers = [
  {
    name: "Luis Gómez",
    email: "luisgomez21@curnvirtual.edu.co",
    role: "est. dummy",
    semester: "5",
    identificacion: "3",
    tipo_prueba: "tecnologica",
    id: "6803e4fd011c17f714dbc8e0",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
  },
];


/**
 * Obtiene todos los usuarios desde la API.
 */
export const getUsers = async () => {
  try {
    const response = await api.get("/");
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    } else {
      console.log("Backend sin datos, cargando dummyUsers");
      return dummyUsers;
    }
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return dummyUsers;    // <–– fallback en caso de error de red
  }
};

/**
 * Obtiene usuario por id desde la API.
 */
export const getUserById= async (email) => {
  const response = await api.get('/' + email);
  return response.data;
};

/**
 * Crea un nuevo usuario; si no tiene foto,
 * asigna la DEFAULT_PICTURE.
 */
export const addUser = async (user) => {
  const payload = {
    ...user,
    picture: user.picture || DEFAULT_PICTURE
  };
  const response = await api.post('/', payload);
  return response.data;
};

/**
 * Actualiza todos los campos de un usuario existente.
 */
export const updateUser = async (user) => {
  const response = await api.put(`/${user.id}`, user);
  return response.data;
};

/**
 * Borra un usuario por su ID.
 */
export const deleteUser = async (userId) => {
  const response = await api.delete(`/${userId}`);
  return response.data;
};

/**
 * Actualiza únicamente la imagen de perfil de un usuario.
 * Tras el login puedes llamarlo con la URL real de tu storage.
 */
export const updateUserPicture = async (userId, newPictureUrl) => {
  const response = await api.patch(`/${userId}/picture`, {
    picture: newPictureUrl
  });
  return response.data;
};
