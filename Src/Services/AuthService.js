import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        console.log("Respuesta de la API:", response.data);
        const { access_token } = response.data;

        if (access_token) {
            await AsyncStorage.setItem("userToken", access_token);
            return { success: true, token: access_token };
        } else {
            console.error("Token no recibido en la respuesta");
            throw new Error("Token no recibido");
        }
    } catch (error) {
        console.error(
            "Error de login:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al conectar",
        };
    }
};

export const logoutUser = async () => {
    try {
        await api.post("/logout");
        await AsyncStorage.removeItem("userToken");
        return { success: true };
    } catch (error) {
        console.error("Error al cerrar sesión:", error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : "Error al cerrar sesión" };
    }
};


export const registroUser = async (name, email, password, role) => {
    try {
        const response = await api.post("/registrar", {
            name,
            email,
            password,
            role,
        });

        return response.data;
    } catch (error) {
        console.error(
            "Error al registrar:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error de conexión",
        };
    }
};
