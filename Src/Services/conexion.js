import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://172.30.3.22:8000/api"; // Remblasar url

const api = axios.create({
  baseURL: API_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

const RutasPublicas = ['/login', '/registrar'];


api.interceptors.request.use(
    //verifica si la ruta es pública
    async (config) => {
        const iSRutaPublica = RutasPublicas.some(ruta => config.url.includes(ruta));
        
        if (!iSRutaPublica) {
            //solo añadir token a rutas protegidas
            const userToken = await AsyncStorage.getItem("userToken");
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const iSRutaPublica  = RutasPublicas.some(ruta => originalRequest.url.includes(ruta));

        if (error.response && error.response.status === 401 && !originalRequest._retry && !iSRutaPublica) {
            originalRequest._retry = true;

            console.log("Token expirado o no autorizado, Redirigiendo al login");
            await AsyncStorage.removeItem("userToken");
        }
        return Promise.reject(error);
    }
);
export default api;