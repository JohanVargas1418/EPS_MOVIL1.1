import api from "./conexion"; 

// Función para listar pacientes
export const listarPasientes = async () => {
    try {
        
        const response = await api.get("/listarPasientes");
        return { success: true, data: response.data }; // Devuelve el éxito y los datos de los pacientes
    } catch (error) {

        console.error("Error al listar los pasientes:", error.response ? error.response.data : error.message);
        
        // Manejo específico para el error de token expirado
        if (error.response && error.response.status === 401) {
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

// Función para eliminar pacientes
export const eliminarPasientes = async (id) => {
    try {
        await api.delete(`/eliminarPasientes/${id}`);
        return { success: true }; 
    } catch (error) {
        console.error("Error al eliminar los pasientes:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}

// Función para crear pacientes
export const crearPasientes = async (data) => {
    try {
        const response = await api.post("/crearPasientes", data);
        return { success: true, data: response.data }; // Devuelve el éxito y los datos del nuevo paciente
    } catch (error) {
        console.error("Error al crear los pasientes:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}

// Función para editar pacientes
export const editarPasientes = async (id, data) => {
    try {
       
        const response = await api.put(`/editarPasientes/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar los pasientes:", error.response ? error.response.data : error.message);
        return {
            success: false, // Indica que la operación falló
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}
