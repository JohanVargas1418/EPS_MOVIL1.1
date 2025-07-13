import api from "./conexion";

export const listarPasientes = async () => {
    try{
        const response = await api.get(`listarPasientes/${id}`);
        return {succes: true, data: response.data}
    } catch (error) {
        console.error(
        "error al listar pacientes ",
        error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data: "Error  de conexión",
        };
    }
}

export const eliminarPasientes = async (id) => {
    try{
        await api.delete(`eliminarPasientes/${id}`);
        return {succes: true};
    }catch (error) {
        console.error(
            "error al eliminar al paciente:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data : "Error e conexión",
        };
    }
}

export const crearPasientes = async (paciente) => {
    try {
        const response = await api.post("/crearPasientes", data);
        return {success: true, data: response.data};
    }catch (error) {
        console.error(
            "error al crear el paciente",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message:error.response ? error.response.data : "error de conexión",
        };
    }
}

export const editarPasientes = async (id, data) => {
    try{
        const response = await api.put(`/editarPasientes/${id}`, data);
        return {success: true, data: response.data};
    }catch (error) {
        console.error(
            "error al editar al paciente",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data: "Error de conexión",
        }
    }
}
