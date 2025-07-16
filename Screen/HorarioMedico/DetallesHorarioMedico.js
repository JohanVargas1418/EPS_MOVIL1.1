import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Alert, Dimensions } from "react-native";
import BottonComponent from "../../components/BottonComponent";

export default function DetallesHorarioMedicoScreen() {
  const [dias, setDias] = useState(""); // Inicializar con cadena vacía
  const [fecha_ini, setInicio] = useState(""); // Inicializar con cadena vacía
  const [fecha_fin, setFinal] = useState(""); // Inicializar con cadena vacía
  const [activo, setActivo] = useState(""); // Inicializar con cadena vacía

  const fechaRegex = /^\d{4}\/\d{2}\/\d{2}$/;

  const handleSubmit = () => {
    if (!dias || !fecha_ini || !fecha_fin || !activo) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    if (!fechaRegex.test(fecha_ini) || !fechaRegex.test(fecha_fin)) { // Validar ambas fechas
      Alert.alert("Formato incorrecto", "Las fechas deben tener formato YYYY/MM/DD con barras.");
      return;
    }

    Alert.alert(
      "Datos enviados",
      `Dias: ${dias}\nFecha Inicio: ${fecha_ini}\nFecha Final: ${fecha_fin}\nActivo: ${activo}`
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>HORARIO MÉDICO</Text> {/* Título principal */}
        <Text style={styles.subtitle}>Gestiona el horario de tu médico</Text> {/* Subtítulo */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Formulario de Horario</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Días Laborales</Text>
            <TextInput
              style={styles.input}
              placeholder="Días laborales del médico"
              placeholderTextColor="#aaa"
              value={dias}
              onChangeText={setDias}
              accessibilityLabel="Dias"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha de Inicio Laboral</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY/MM/DD"
              placeholderTextColor="#aaa"
              value={fecha_ini}
              onChangeText={setInicio}
              accessibilityLabel="Fecha de inicio"
              keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
              maxLength={10}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha Laboral Final</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY/MM/DD"
              placeholderTextColor="#aaa"
              value={fecha_fin}
              onChangeText={setFinal}
              accessibilityLabel="Fecha de Final"
              keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
              maxLength={10}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Horario del médico Activo</Text>
            <TextInput
              style={styles.input}
              placeholder="Horario del Medico Activo"
              placeholderTextColor="#aaa"
              value={activo}
              onChangeText={setActivo}
              accessibilityLabel="Activo"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <BottonComponent title="Enviar" onPress={handleSubmit} />
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
  header: {
    height: '30%', // Altura relativa para el encabezado
    backgroundColor: '#AFEEEE', // Aguamarina suave (PaleTurquoise) para el desvanecido
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    borderBottomLeftRadius: 40, // Bordes redondeados más pronunciados
    borderBottomRightRadius: 40,
    shadowColor: '#000', // Sombra del encabezado
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    fontSize: 48, // Tamaño de fuente más grande
    fontWeight: 'bold',
    color: '#2F4F4F', // Gris oscuro para un buen contraste
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6A5ACD', // Azul pizarra (SlateBlue) para el subtítulo
    letterSpacing: 1,
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
  inputContainer: {
    marginBottom: 25, // Más espacio entre inputs
  },
  label: {
    color: '#636e72',
    fontSize: 12, // Tamaño de fuente más pequeño para la etiqueta
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    fontSize: 16,
    color: '#2d3436',
    paddingVertical: 8, // Menos padding vertical
    borderWidth: 0, // Eliminar el borde
  },
  inputUnderline: {
    height: 2,
    backgroundColor: '#dfe6e9', // Subrayado más claro
    marginTop: 5,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  // El BottonComponent debería manejar su propio estilo de botón y texto.
  // Estos estilos son solo de referencia si BottonComponent no los provee.
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
