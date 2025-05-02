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
};

export default asignacionesService;