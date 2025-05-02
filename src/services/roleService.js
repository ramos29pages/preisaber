// src/services/roleService.js
import axios from 'axios';

/**
 * Instancia de Axios con baseURL apuntando a tu endpoint de roles.
 * Evita repetir la URL en cada llamada. :contentReference[oaicite:4]{index=4}
 */
const api = axios.create({
  baseURL: '/https://predisaber-backend.onrender.com/roles',           // Ajusta según tu ruta real
  headers: { 'Content-Type': 'application/json' }
});

/**
 * Listar todos los roles.
 * GET /api/roles
 */
export const listRoles = async () => {
  const response = await api.get('/');
  return response.data;
};

/**
 * Obtener un rol por su ID.
 * GET /api/roles/:id
 * @param {string|number} id
 */
export const getRole = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

/**
 * Crear un nuevo rol.
 * POST /api/roles
 * @param {object} role – { name: string, description: string }
 */
export const createRole = async (role) => {
  const response = await api.post('/', role);
  return response.data;
};

/**
 * Actualizar un rol existente.
 * PUT /api/roles/:id
 * @param {string|number} id
 * @param {object} role
 */
export const updateRole = async (id, role) => {
  const response = await api.put(`/${id}`, role);
  return response.data;
};

/**
 * Eliminar un rol.
 * DELETE /api/roles/:id
 * @param {string|number} id
 */
export const deleteRole = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
