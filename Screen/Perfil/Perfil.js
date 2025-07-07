import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent";
import api from "../../Src/Services/conexion";
import { logoutUser } from "../../Src/Services/AuthService";

export default function PantallaPerfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          console.log("No se encontró token, redirigiendo al login");
          return;
        }

        console.log("Intentando cargar perfil con token:", token);
        const response = await api.get("/listarUsuarios");
        console.log("Respuesta del perfil:", response.data);
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);

        if (error.isAuthError || error.shouldRedirectToLogin) {
          console.log("Error de autenticación manejado por el interceptor");
          return;
        }

        if (error.response) {
          console.log("Error del servidor:", error.response.status);
          Alert.alert(
            "Error del servidor",
            `Error ${error.response.status}: ${error.response.data?.message || "No se pudo cargar el perfil"}`,
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else if (error.request) {
          Alert.alert(
            "Error de conexión",
            "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else {
          Alert.alert(
            "Error",
            "Ocurrió un error inesperado al cargar el perfil.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        }
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6de2b4" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.ContainerPerfil}>
          <Text style={styles.errorText}>No se pudo cargar la información del perfil</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      <View style={styles.ContainerPerfil}>
        <Text style={styles.profileText}>
          Nombre: {usuario.user?.name || "No disponible"}
        </Text>
        <Text style={styles.profileText}>
          Email: {usuario.user?.email || "No disponible"}
        </Text>
      </View>

      <BottonComponent title="Editar Perfil" onPress={() => {}} />
      <BottonComponent
        title="Cerrar Sesión"
        onPress={async () => {
            await logoutUser();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#d3e8e7",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  ContainerPerfil: {
    width: "100%",
    padding: 20,
    backgroundColor: "#FFFFFF", // Fondo blanco
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
    marginBottom: 20,
  },
  profileText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});