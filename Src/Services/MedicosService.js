import api from "./conexion"; 

// Función para listar médicos
export const listarMedicos = async () => {
    try {
        const response = await api.get("/listarMedicos");
        return { success: true, data: response.data }; // Devuelve el éxito y los datos de los médicos
    } catch (error) {
        console.error("Error al listar médicos:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión", 
        };
    }
}

// Función para eliminar médicos
export const eliminarMedicos = async (id) => {
    try {
        await api.delete(`/eliminarMedicos/${id}`);
        return { success: true }; 
    } catch (error) {
        console.error("Error al eliminar médicos:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
}

// Función para crear médicos
export const crearMedicos = async (data) => {
    try {
        const response = await api.post("/crearMedicos", data);
        return { success: true, data: response.data }; 
    } catch (error) {
        console.error("Error al crear médicos:", error.response ? error.response.data : error.message);
        return {
            success: false, // Indica que la operación falló
            message: error.response ? error.response.data : "Error de conexión", 
        };
    }
}

// Función para editar médicos
export const editarMedicos = async (id, data) => {
    try {
        const response = await api.put(`/editarMedicos/${id}`, data);
        return { success: true, data: response.data }; 
    } catch (error) {
        console.error("Error al editar médicos:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión", 
        };
    }
}
