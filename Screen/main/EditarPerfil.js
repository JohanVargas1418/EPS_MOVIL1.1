import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BotonComponent from "../../components/BottonComponent";
import api from "../../Src/Services/conexion";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditarPerfil({ navigation, route }) {
  const { usuario } = route.params; // Recibe el objeto de usuario pasado desde PantallaPerfil

  const [name, setName] = useState(usuario?.user?.name || "");
  const [email, setEmail] = useState(usuario?.user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "No hay sesión activa.");
        setLoading(false);
        return;
      }

      const userId = usuario?.user?.id; // Asegúrate de tener el ID del usuario
      if (!userId) {
        Alert.alert("Error", "ID de usuario no disponible.");
        setLoading(false);
        return;
      }

      const dataToUpdate = {
        name,
        email,
      };

      if (password) {
        dataToUpdate.password = password;
      }

      // --- CAMBIO CLAVE AQUÍ: Se ajusta la URL para que coincida con la ruta de Laravel ---
      const response = await api.put(`/editarUser/${userId}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        Alert.alert("Éxito", response.data.message || "Perfil actualizado correctamente.");
        navigation.goBack(); // Regresa a la pantalla de perfil
      } else {
        Alert.alert("Error", response.data.message || "No se pudo actualizar el perfil.");
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      if (error.response) {
        Alert.alert(
          "Error del servidor",
          error.response.data?.message ||
            `Error ${error.response.status}: No se pudo actualizar el perfil.`
        );
      } else if (error.request) {
        Alert.alert(
          "Error de conexión",
          "No se pudo conectar con el servidor. Verifica tu conexión a internet."
        );
      } else {
        Alert.alert("Error", "Ocurrió un error inesperado al actualizar el perfil.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>EDITAR PERFIL</Text>
        <Text style={styles.subtitle}>Modifica tu información</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Actualizar Datos</Text>

          <Text style={styles.inputLabel}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre"
            autoCapitalize="words"
          />

          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Tu correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Nueva Contraseña:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Deja vacío para no cambiar"
            secureTextEntry
          />

          <Text style={styles.inputLabel}>Confirmar Contraseña:</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirma tu nueva contraseña"
            secureTextEntry
          />

          <BotonComponent
            title={loading ? "Actualizando..." : "Guardar Cambios"}
            onPress={handleUpdateProfile}
            disabled={loading}
          />
          <View style={{ height: 15 }} />
          <BotonComponent
            title="Cancelar"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: "#E0FFFF", // Aguamarina claro (LightCyan)
  },
  header: {
    height: "22%",
    backgroundColor: "#AFEEEE",
    justifyContent: "10%",
    alignItems: "center",
    paddingTop: 30,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F4F4F",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6A5ACD",
    letterSpacing: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  formContainer: {
    width: "90%",
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    marginTop: -60,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 24,
    textAlign: "center",
  },
  inputLabel: {
    color: "#636e72",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    color: "#2d3436",
  },
  cancelButton: {
    backgroundColor: "#dc3545", // Rojo para el botón de cancelar
  },
  cancelButtonText: {
    color: "white",
  },
});
