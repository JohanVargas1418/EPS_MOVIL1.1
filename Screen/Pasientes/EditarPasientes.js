import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView, Dimensions } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearPasientes, editarPasientes } from "../../Src/Services/PasientesService";
import { Picker } from '@react-native-picker/picker'; // Importa el Picker
import BottonComponent from "../../components/BottonComponent";

// Componente principal EditarPasientesScreen
export default function EditarPasientesScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const pasientes = route.params?.pasientes;  // Obtiene el paciente a editar desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState(pasientes?.nombre?.toString() || "");
  const [apellido, setApellido] = useState(pasientes?.apellido?.toString() || "");
  const [num_documento, setNum_documento] = useState(pasientes?.num_documento?.toString() || "");
  const [tipo_documento, setTipo_documento] = useState(pasientes?.tipo_documento?.toString() || "");
  const [genero, setGenero] = useState(pasientes?.genero?.toString() || "");
  const [telefono, setTelefono] = useState(pasientes?.telefono?.toString() || "");
  const [correo, setCorreo] = useState(pasientes?.correo?.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!pasientes;  // Determina si es una edición o una nueva creación

  // Función para manejar el guardado del paciente
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!nombre || !apellido || !num_documento || !tipo_documento || !genero || !telefono || !correo) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarPasientes(pasientes.id, {
          nombre,
          apellido,
          num_documento: parseInt(num_documento),
          tipo_documento,
          genero,
          telefono: parseInt(telefono),
          correo
        });
      } else {
        result = await crearPasientes({ 
          nombre, 
          apellido, 
          num_documento: parseInt(num_documento), 
          tipo_documento, 
          genero, 
          telefono: parseInt(telefono), 
          correo 
        });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Paciente actualizado" : "Paciente creado");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar el paciente");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el paciente");
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
        <Text style={styles.logo}>PACIENTES</Text> {/* Título principal */}
        <Text style={styles.subtitle}>
          {esEdicion ? "Editar detalles del paciente" : "Registrar nuevo paciente"}
        </Text> {/* Subtítulo dinámico */}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>{esEdicion ? "Formulario de Edición" : "Formulario de Registro"}</Text>

          {/* Campos del formulario */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre del paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del paciente"
              placeholderTextColor="#aaa"
              value={nombre}
              onChangeText={setNombre}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Apellido del paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido del paciente"
              placeholderTextColor="#aaa"
              value={apellido}
              onChangeText={setApellido}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Número de documento</Text>
            <TextInput
              style={styles.input}
              placeholder="Número de documento"
              placeholderTextColor="#aaa"
              value={num_documento}
              onChangeText={setNum_documento}
              keyboardType="numeric"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tipo de documento</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tipo_documento}
                style={styles.picker}
                onValueChange={(itemValue) => setTipo_documento(itemValue)}
              >
                <Picker.Item label="Seleccione un tipo de documento" value="" />
                <Picker.Item label="Cédula" value="Cédula" />
                <Picker.Item label="Tarjeta" value="Tarjeta" />
              </Picker>
            </View>
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Género</Text>
            <TextInput
              style={styles.input}
              placeholder="Género"
              placeholderTextColor="#aaa"
              value={genero}
              onChangeText={setGenero}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="#aaa"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="numeric"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#aaa"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          {/* Botón para guardar el paciente */}
          <BottonComponent
            title={loading ? "Guardando..." : "Guardar paciente"}
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
  pickerContainer: {
    backgroundColor: "#f8f8f8",
    borderWidth: 0, // Eliminar el borde del pickerContainer
    borderRadius: 0, // Eliminar el radio de borde del pickerContainer
    overflow: 'hidden', // Asegura que el borde redondeado se aplique
    borderBottomWidth: 2, // Simular subrayado para el picker
    borderBottomColor: '#dfe6e9', // Subrayado más claro para el picker
    marginBottom: 5, // Espacio entre el picker y el subrayado
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#2d3436', // Color del texto del picker
  },
  buttonContainer: {
    marginTop: 20,
  },
  // El BotonComponent debería manejar su propio estilo de botón y texto.
  // Estos estilos son solo de referencia si BotonComponent no los provee.
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
