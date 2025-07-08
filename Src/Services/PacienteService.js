import api from "./conexion";

export const listarPacientes = async () => {
    try{
        const response = await api.get("/listarPacientes");
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

export const eliminarPaciente = async (id) => {
    try{
        await api.delete(`elimiarPaciente/${id}`);
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

export const crearPaciente = async (paciente) => {
    try {
        const response = await api.post("/crearPacientes", data);
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

export const editarPaciente = async (id, data) => {
    try{
        const response = await api.put(`/editarPaciente/${id}`, data);
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
