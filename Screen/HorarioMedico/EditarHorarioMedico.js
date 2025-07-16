import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView, Dimensions } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearHoraMedico, editarHoraMedico } from "../../Src/Services/HoraMedicaService";

// Componente principal EditarHorarioMedicoScreen
export default function EditarHorarioMedicoScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const hora_medico = route.params?.hora_medico;  // Obtiene el horario del médico desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [idMedico, setIdMedico] = useState(hora_medico?.idMedico?.toString() || "");
  const [dias, setDias] = useState(hora_medico?.dias?.toString() || "");
  const [fecha_ini, setFecchaIni] = useState(hora_medico?.fecha_ini || "");
  const [fecha_fin, setFechaFin] = useState(hora_medico?.fecha_fin || "");
  const [activo, setActivo] = useState(hora_medico?.activo?.toString() || ""); // Asegurar que sea string

  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!hora_medico;  // Determina si es una edición o una nueva creación

  // Función para manejar el guardado del horario médico
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!idMedico || !dias || !fecha_ini || !fecha_fin || !activo) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarHoraMedico(hora_medico.id, {
          idMedico: parseInt(idMedico),
          dias: parseInt(dias),
          fecha_ini,
          fecha_fin,
          activo,
        });
      } else {
        result = await crearHoraMedico({ idMedico, dias, fecha_ini, fecha_fin, activo });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Horario del médico actualizado" : "Horario del médico creado");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar el horario del médico");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el horario del médico");
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>HORARIO MÉDICO</Text> {/* Título principal */}
        <Text style={styles.subtitle}>
          {esEdicion ? "Editar horario del médico" : "Crear nuevo horario del médico"}
        </Text> {/* Subtítulo dinámico */}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>{esEdicion ? "Formulario de Edición" : "Formulario de Creación"}</Text>

          {/* Campos del formulario */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Id Médico</Text>
            <TextInput
              style={styles.input}
              placeholder="Id del Médico"
              placeholderTextColor="#aaa"
              value={idMedico}
              onChangeText={setIdMedico}
              keyboardType="numeric"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Días del Horario Médico</Text>
            <TextInput
              style={styles.input}
              placeholder="Días del Horario Médico"
              placeholderTextColor="#aaa"
              value={dias}
              onChangeText={setDias}
              keyboardType="numeric"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha Inicio del Horario Médico</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#aaa"
              value={fecha_ini}
              onChangeText={setFecchaIni}
              keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
              maxLength={10}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha Fin del Horario Médico</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#aaa"
              value={fecha_fin}
              onChangeText={setFechaFin}
              keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
              maxLength={10}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Horario médico está activo o no</Text>
            <TextInput
              style={styles.input}
              placeholder="Activo o inactivo"
              placeholderTextColor="#aaa"
              value={activo}
              onChangeText={setActivo}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <BottonComponent
            title={loading ? "Guardando..." : "Guardar Horario Médico"}
            onPress={handleGuardar}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos del componente
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
