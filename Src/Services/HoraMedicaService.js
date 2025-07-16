import api from "./conexion"; 

// Función para listar el horario médico
export const listarHoraMedico = async () => {
    try {
        const response = await api.get("/listarHoraMedico");
        return { success: true, data: response.data }; 
    } catch (error) {
        // Manejo de errores en caso de fallo en la solicitud
        console.error("Error al listar el horario medico:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexion", 
        };
    }
}

// Función para eliminar un horario médico
export const eliminarHoraMedico = async (id) => {
    try {
        await api.delete(`/eliminarHoraMedico/${id}`);
        return { success: true }; 
    } catch (error) {
        console.error("Error al eliminar el horario medico:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexion",
        };
    }
}

// Función para crear un nuevo horario médico
export const crearHoraMedico = async (data) => {
    try {
        const response = await api.post("/crearHoraMedico", data);
        return { success: true, data: response.data }; // Devuelve el éxito y los datos del nuevo horario médico
    } catch (error) {
        console.error("Error al crear el horario medico:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexion",
        };
    }
}

// Función para editar un horario médico existente
export const editarHoraMedico = async (id, data) => {
    console.log("Datos a editar:", data);
    try {
        const response = await api.put(`/editarHoraMedico/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar el horario medico:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexion", 
        };
    }
}
