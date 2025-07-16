import api from "./conexion";

// Función para listar pagos
export const listarPagos = async () => {
    try {
        const response = await api.get("/listarPagos");
        return { success: true, data: response.data }; // Devuelve el éxito y los datos de los pagos
    } catch (error) {
        console.error("Error al listar los pagos:", error.response ? error.response.data : error.message);

        // Manejo específico para el error de token expirado
        if (error.response && error.response.status === 401) {
            // Aquí puedes redirigir al usuario a la pantalla de inicio de sesión
            return {
                success: false,
                message: "Token ha expirado. Por favor, inicia sesión nuevamente.",
            };
        }

        return {
            success: false, // Indica que la operación falló
            message: error.response ? error.response.data : "Error de conexión", 
        };
    }
}

// Función para eliminar pagos
export const eliminarPagos = async (id) => {
    try {
        await api.delete(`/eliminarPagos/${id}`);
        return { success: true }; 
    } catch (error) {
        console.error("Error al eliminar los pagos:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}

// Función para crear pagos
export const crearPagos = async (data) => {
    try {
        const response = await api.post("/crearPagos", data);
        return { success: true, data: response.data };
    } catch (error) {
   
        console.error("Error al crear los pagos:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}

// Función para editar pagos
export const editarPagos = async (id, data) => {
    try {
        const response = await api.put(`/editarPagos/${id}`, data);
        return { success: true, data: response.data }; 
    } catch (error) {
        console.error("Error al editar los pagos:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}
