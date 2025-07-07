import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Services/AuthService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try{
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "Inicio de sesión exitoso", [
          {Text: "OK", onPress: () => console.log("Login exitoso, redirigiendo automanticanente....")},
        ]);
      }else {
        Alert.alert("Error de Login", result.message || "ocurrio un error al iniciar sesión", );
      }
    }catch (error) {
      console.error("Error inesperado en login:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al intentar inciar secion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      <BottonComponent
        title="Iniciar Sesión"
        onPress={handleLogin}
        disabled={!loading}
        style ={{ backgroundColor: "#6de2b4" }}
      />


      <BottonComponent
        title="¿No tienes cuenta? Registrate"
        onPress={() => navigation.navigate("Registro")}
        style ={{ backgroundColor: "#6de2b4" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#d3e8e7",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
