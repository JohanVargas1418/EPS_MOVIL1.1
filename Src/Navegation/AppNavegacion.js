import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthNavegacion from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal";
import { ActivityIndicator,Text, View, StyleSheet, AppState } from "react-native";
import React, { useState, useEffect, useRef } from "react"; 
import { NavigationContainer } from "@react-navigation/native";

// Componente principal AppNavegacion
export default function AppNavegacion() {
  const [isLoading, setisLoading] = useState(true); // Estado para manejar la carga
  const [userToken, setUserToken] = useState(null); // Estado para almacenar el token del usuario
  const appState = useRef(AppState.currentState); // Referencia al estado actual de la aplicación

  // Función para cargar el token desde AsyncStorage
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken"); // Obtiene el token del almacenamiento
      setUserToken(token); // Actualiza el estado con el token
    } catch (e) {
      console.error("Error al cargar el token desde AsyncStorage:", e); 
    } finally {
      setisLoading(false); // Cambia el estado de carga a falso
    }
  };

  // Efecto para cargar el token al iniciar la aplicación
  useEffect(() => {
    loadToken();
  }, []);

  // Efecto para manejar cambios en el estado de la aplicación
  useEffect(() => {
    const handleAppStateChage = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&  nextAppState === "active" // Y si ahora está activa
      ) {
        console.log("App ha vuelto a estar activa, verificando token..."); 
        loadToken(); // Verifica el token al volver a la aplicación
      }
      appState.current = nextAppState; // Actualiza el estado de la aplicación
    };
    const subscription = AppState.addEventListener(
      "change", // Escucha cambios en el estado de la aplicación
      handleAppStateChage // Función que maneja el cambio de estado
    );
    return () => subscription?.remove(); // Limpieza de la suscripción al desmontar
  }, []);

  // Efecto para verificar el token cada 2 segundos si la aplicación está activa
  useEffect(() => {
    if (!isLoading) { 
      const interval = setInterval(() => {
        if (AppState.currentState === "active") { 
          loadToken(); // Verifica el token
        }
      }, 2000); // Cada 2 segundos

      return () => clearInterval(interval); // Limpieza del intervalo
    }
  }, [isLoading]);

  // Muestra un indicador de carga mientras se está cargando
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}> 
        <ActivityIndicator size="large" color="#1976D2" /> 
      </View>
    );
  }

  // Renderiza el contenedor de navegación
   // Navegación condicional basada en el token
  return (
    <NavigationContainer>
      {userToken ? <NavegacionPrincipal /> : <AuthNavegacion />}
    </NavigationContainer>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center", 
  },
});
