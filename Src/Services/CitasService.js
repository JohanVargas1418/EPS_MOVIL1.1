import api from "./conexion"; 

// Función para listar citas
export const listarCitas = async () => {
    try {
        const response = await api.get("/listarCitas");
        return { success: true, data: response.data }; 
    } catch (error) {
        console.error("Error al listar citas:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexion",
        };
    }
}

// Función para eliminar una cita
export const eliminarCitas = async (id) => {
    try {
        await api.delete(`/eliminarCitas/${id}`);
        return { success: true }; 
    } catch (error) {
        console.error("Error al eliminar citas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        };
    }
}

// Función para crear una nueva cita
export const crearCitas = async (data) => {
    try {
        
        const response = await api.post("/crearCitas", data);
        return { success: true, data: response.data }; 
    } catch (error) {
        console.error("Error al crear citas:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexion", 
        };
    }
}

// Función para editar una cita existente
export const editarCitas = async (id, data) => {
    console.log("Datos a editar:", data); // Muestra los datos que se van a editar
    try {
        const response = await api.put(`/editarCitas/${id}`, data);
        return { success: true, data: response.data }; // Devuelve el éxito y los datos de la cita editada
    } catch (error) {
        console.error("Error al editar citas:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexion",
        };
    }
}
