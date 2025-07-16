import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView, Dimensions } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearMedicos, editarMedicos } from "../../Src/Services/MedicosService";
import { Picker } from '@react-native-picker/picker'; // Importa el Picker}
import BottonComponent from "../../components/BottonComponent";

// Componente principal EditarMedicosScreen
export default function EditarMedicosScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const medicos = route.params?.medicos;  // Obtiene el médico a editar desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [idConsultorio, setIdConsultorio] = useState(medicos?.idConsultorio?.toString() || "");
  const [idEspecialidad, setIdEspecialidad] = useState(medicos?.idEspecialidad?.toString() || "");
  const [nombre, setNombre] = useState(medicos?.nombre?.toString() || "");
  const [apellido, setApellido] = useState(medicos?.apellido?.toString() || "");
  const [num_documento, setNumDocumento] = useState(medicos?.num_documento?.toString() || "");
  const [tipo_documento, setTipoDocumento] = useState(medicos?.tipo_documento?.toString() || "");
  const [reg_medicos, setRegMedicos] = useState(medicos?.reg_medicos?.toString() || "");
  const [activo, setActivo] = useState(medicos?.activo?.toString() || "");
  const [telefono, setTelefono] = useState(medicos?.telefono?.toString() || "");
  const [correo, setCorreo] = useState(medicos?.correo?.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!medicos;  // Determina si es una edición o una nueva creación

  // Función para manejar el guardado del médico
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!idConsultorio || !idEspecialidad || !nombre || !apellido || !num_documento || !tipo_documento || !reg_medicos || !activo || !telefono || !correo) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarMedicos(medicos.id, {
          idConsultorio: parseInt(idConsultorio),
          idEspecialidad: parseInt(idEspecialidad),
          nombre,
          apellido,
          num_documento: parseInt(num_documento),
          tipo_documento,
          reg_medicos,
          activo,
          telefono,
          correo,
        });
      } else {
        result = await crearMedicos({
          idConsultorio: parseInt(idConsultorio),
          idEspecialidad: parseInt(idEspecialidad), // Asegurar que idEspecialidad se pase como entero
          nombre,
          apellido,
          num_documento: parseInt(num_documento),
          tipo_documento,
          reg_medicos,
          telefono,
          correo,
          activo,
        });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Médico actualizado" : "Médico creado");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar el médico");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el médico");
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
        <Text style={styles.logo}>MÉDICOS</Text> {/* Título principal */}
        <Text style={styles.subtitle}>
          {esEdicion ? "Editar detalles del médico" : "Crear nuevo médico"}
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
            <Text style={styles.label}>Id Consultorio</Text>
            <TextInput
              style={styles.input}
              placeholder="Id del Consultorio"
              placeholderTextColor="#aaa"
              value={idConsultorio}
              onChangeText={setIdConsultorio}
              keyboardType="numeric"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Id Especialidad</Text>
            <TextInput
              style={styles.input}
              placeholder="Id de la Especialidad"
              placeholderTextColor="#aaa"
              value={idEspecialidad}
              onChangeText={setIdEspecialidad}
              keyboardType="numeric"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre del Médico</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Médico"
              placeholderTextColor="#aaa"
              value={nombre}
              onChangeText={setNombre}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Apellido del Médico</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido del Médico"
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
              onChangeText={setNumDocumento}
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
                onValueChange={(itemValue) => setTipoDocumento(itemValue)}
              >
                <Picker.Item label="Seleccione un tipo de documento" value="" />
                <Picker.Item label="Cédula" value="Cédula" />
                <Picker.Item label="Tarjeta" value="Tarjeta" />
              </Picker>
            </View>
            <View style={styles.inputUnderline}></View> {/* Subrayado para el picker */}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Registro del Médico</Text>
            <TextInput
              style={styles.input}
              placeholder="Registro del Médico"
              placeholderTextColor="#aaa"
              value={reg_medicos}
              onChangeText={setRegMedicos}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Médico activo o inactivo</Text>
            <TextInput
              style={styles.input}
              placeholder="Activo o inactivo"
              placeholderTextColor="#aaa"
              value={activo}
              onChangeText={setActivo}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono del Médico"
              placeholderTextColor="#aaa"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="numeric"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico del Médico"
              placeholderTextColor="#aaa"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <BottonComponent
            title={loading ? "Guardando..." : "Guardar Médico"}
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
  // BotonComponent ya debe tener sus estilos internos, estos son solo de referencia
  // para asegurar consistencia si se usa un TouchableOpacity directo.
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
