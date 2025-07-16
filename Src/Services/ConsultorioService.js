import api from "./conexion";

// Función para listar consultorios
export const listarConsultorios = async () => {
    try {
        const response = await api.get("/listarConsultorios");
        return { success: true, data: response.data }; // Devuelve el éxito y los datos de los consultorios
    } catch (error) {
        
        console.error("Error al listar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion", 
        };
    }
}

// Función para eliminar un consultorio
export const eliminarConsultorios = async (id) => {
    try {
        await api.delete(`/eliminarConsultorios/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexion", 
        };
    }
}

// Función para crear un nuevo consultorio
export const crearConsultorios = async (data) => {
    try {
        const response = await api.post("/crearConsultorios", data);
        return { success: true, data: response.data }; 
    } catch (error) {
        console.error("Error al crear consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexion", 
        };
    }
}

// Función para editar un consultorio existente
export const editarConsultorios = async (id, data) => {
    console.log("Datos a editar:", data); // Muestra los datos que se van a editar
    try {
        const response = await api.put(`/editarConsultorios/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexion", 
        };
    }
}
