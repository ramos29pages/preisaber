import axios from 'axios';

const API_BASE_URL = 'https://predisaber-backend.onrender.com/asignaciones'; // Reemplaza con la URL de tu API

const asignacionesService = {
  crearAsignacion: async (asignacionData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asignacionData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al crear la asignación');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al crear la asignación:', error);
      throw error;
    }
  },

  obtenerAsignaciones: async (skip = 0, limit = 100) => {
    try {
      const response = await fetch(`${API_BASE_URL}?skip=${skip}&limit=${limit}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al obtener las asignaciones');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener las asignaciones:', error);
      throw error;
    }
  },

  obtenerAsignacionPorId: async (asignacionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${asignacionId}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null; // La asignación no se encontró
        }
        const error = await response.json();
        throw new Error(error.detail || 'Error al obtener la asignación');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener la asignación:', error);
      throw error;
    }
  },

  obtenerAsignacionPorUserid: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/userid/${userId}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null; // La asignación no se encontró
        }
        const error = await response.json();
        throw new Error(error.detail || 'Error al obtener la asignación');
      }

      let data = await response.json();
      console.log('from service:: ', data)

      return data;
    } catch (error) {
      console.error('Error al obtener la asignación:', error);
      throw error;
    }
  },

  actualizarAsignacion: async (asignacionId, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${asignacionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al actualizar la asignación');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al actualizar la asignación:', error);
      throw error;
    }
  },

  eliminarAsignacion: async (asignacionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${asignacionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al eliminar la asignación');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al eliminar la asignación:', error);
      throw error;
    }
  },

  /**
   * Actualiza campos de una asignación por su ID.
   * @param {string} id - ID de la asignación.
   * @param {object} updateData - Campos a actualizar (e.g. { status: true }).
   * @returns {Promise<object>} - Objeto AsignacionOut actualizado.
   */
  updateAsignacion: async (id, updateData) => {
    try {
      const url = `${API_BASE_URL}/${encodeURIComponent(id)}`;
      // axios.put envía un PUT con JSON en el body por defecto :contentReference[oaicite:0]{index=0}
      const response = await axios.put(url, updateData);
      return response.data;
    } catch (error) {
      // Extrae mensaje de error o usa el genérico
      const detail = error.response?.data?.detail || error.message;
      throw new Error(`Error al actualizar asignación: ${detail}`);
    }
  }

};

export default asignacionesService;