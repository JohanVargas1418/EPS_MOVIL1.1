import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BotonComponent from "../../components/BottonComponent";
import api from "../../Src/Services/conexion";
import { logoutUser } from "../../Src/Services/AuthServices";
import { useFocusEffect } from "@react-navigation/native"; // Importa useFocusEffect

export default function PantallaPerfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Añadimos estado para errores específicos

  const cargarPerfil = async () => {
    setLoading(true);
    setError(null); // Limpiar errores previos
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        console.log("No se encontró token, redirigiendo al login (o mostrando error)");
        
        setLoading(false);
        return;
      }

      console.log("Intentando cargar perfil con token:", token);
      
      const response = await api.get("/listarUsuarios", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("Respuesta del perfil:", response.data);

      if (response.data.success) {
        setUsuario(response.data); 
      } else {
        Alert.alert("Error", response.data.message || "No se pudo cargar el perfil.");
        setError(response.data.message || "Error al cargar el perfil.");
      }
    } catch (err) {
      console.error("Error al cargar perfil:", err);
      
      if (err.response) {
        const errorMessage = err.response.data?.message || `Error ${err.response.status}: No se pudo cargar el perfil.`;
        Alert.alert("Error del servidor", errorMessage);
        setError(errorMessage);
        // Si el error es 401 (Unauthorized), considera limpiar el token y redirigir
        if (err.response.status === 401) {
          await AsyncStorage.removeItem("userToken");
          // navigation.navigate("Login"); // Descomentar si se desea redirigir
        }
      } else if (err.request) {
        Alert.alert("Error de conexión", "No se pudo conectar con el servidor. Verifica tu conexión a internet.");
        setError("No se pudo conectar con el servidor. Verifica tu conexión a internet.");
      } else {
        Alert.alert("Error", "Ocurrió un error inesperado al cargar el perfil.");
        setError("Ocurrió un error inesperado al cargar el perfil.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- CAMBIO CLAVE AQUÍ: Usamos useFocusEffect en lugar de useEffect ---
  useFocusEffect(
    useCallback(() => {
      cargarPerfil();
      // Opcional: puedes retornar una función de limpieza si tienes listeners o suscripciones
      return () => {
        // Limpiar cualquier cosa si es necesario al desenfocar la pantalla
      };
    }, []) // El array de dependencias vacío asegura que se ejecute solo una vez al montar y cada vez que se enfoca
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4ECDC4" /> {/* Color aguamarina para el indicador */}
      </View>
    );
  }

  // Si hay un error y no hay datos de usuario, mostramos el mensaje de error
  if (error && !usuario) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>PERFIL</Text>
          <Text style={styles.subtitle}>Información del usuario</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Perfil de Usuario</Text>
            <Text style={styles.errorText}>{error}</Text>
            <BotonComponent title="Reintentar" onPress={cargarPerfil} />
          </View>
        </ScrollView>
      </View>
    );
  }

  // Si no hay usuario y no hay error (ej. al inicio antes de cargar o si la API devuelve nulo sin error)
  if (!usuario) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>PERFIL</Text>
          <Text style={styles.subtitle}>Información del usuario</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Perfil de Usuario</Text>
            <Text style={styles.errorText}>No se encontraron datos de perfil.</Text>
            <BotonComponent title="Cargar de nuevo" onPress={cargarPerfil} />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>PERFIL</Text>
        <Text style={styles.subtitle}>Información del usuario</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Detalles del Perfil</Text>

          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileLabel}>Nombre:</Text>
            <Text style={styles.profileValue}>
              {usuario.user?.name || "No disponible"}
            </Text>
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileLabel}>Email:</Text>
            <Text style={styles.profileValue}>
              {usuario.user?.email || "No disponible"}
            </Text>
          </View>
          {/* Asegúrate de que 'role' exista en usuario.user si lo quieres mostrar */}
          {usuario.user?.role && (
            <View style={styles.profileInfoContainer}>
              <Text style={styles.profileLabel}>Rol:</Text>
              <Text style={styles.profileValue}>
                {usuario.user.role}
              </Text>
            </View>
          )}

          <BotonComponent
            title="Editar Perfil"
            // Asegúrate de pasar el objeto 'usuario' completo
            onPress={() => navigation.navigate("EditarPerfil", { usuario: usuario })}
          />
          <View style={{ height: 15 }} /> {/* Espacio entre botones */}
          <BotonComponent
            title="Cerrar Sesión"
            onPress={async () => {
              await logoutUser();
              // AppNavegacion redirigirá automáticamente si el token se limpia
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: '#E0FFFF', // Aguamarina claro (LightCyan)
  },
  container: { // Usado para el estado de carga y error, mantiene el fondo
    flex: 1,
    backgroundColor: '#E0FFFF',
    justifyContent: 'space-between',
  },
  header: {
    height: '22%', // Altura relativa para el encabezado
    backgroundColor: '#AFEEEE', // Aguamarina suave (PaleTurquoise) para el desvanecido
    justifyContent: '10%',
    alignItems: 'center',
    paddingTop: 30,
    borderBottomLeftRadius: 3, // Bordes redondeados más pronunciados
    borderBottomRightRadius: 3,
    shadowColor: '#000', // Sombra del encabezado
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    fontSize: 22, // Tamaño de fuente más grande
    fontWeight: 'bold',
    color: '#2F4F4F', // Gris oscuro para un buen contraste
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6A5ACD', // Azul pizarra (SlateBlue) para el subtítulo
    letterSpacing: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#E0FFFF', // Fondo aguamarina claro para el loading
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  formContainer: {
    width: '90%',
    paddingHorizontal: 30,
    paddingTop: 40, // Más padding superior para el formulario
    backgroundColor: '#FFFFFF', // Fondo blanco para el formulario
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, // Sombra más visible
    shadowRadius: 20,
    elevation: 10,
    marginTop: -60, // Superposición con el encabezado
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3436", // Un color oscuro para el título del formulario
    marginBottom: 24,
    textAlign: "center",
  },
  profileInfoContainer: {
    marginBottom: 15,
  },
  profileLabel: {
    color: '#636e72',
    fontSize: 12, // Tamaño de fuente más pequeño para la etiqueta
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  profileValue: {
    fontSize: 16,
    color: '#2d3436',
    paddingVertical: 8,
    borderWidth: 0, // Eliminar el borde
    borderBottomWidth: 2, // Simular subrayado
    borderBottomColor: '#dfe6e9', // Subrayado más claro
  },
  errorText: {
    fontSize: 18, // Aumentar tamaño para visibilidad
    color: "red",
    textAlign: "center",
    fontWeight: 'bold',
    marginTop: 20,
  },
  // BotonComponent ya debe tener sus estilos internos, estos son solo de referencia
  // para asegurar consistencia si se usa un TouchableOpacity directo.
  buttonText: { 
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
