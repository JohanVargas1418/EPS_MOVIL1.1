import React, { useState } from "react";
import BottonComponent from "../../components/BottonComponent";
import {ScrollView,View,Text,TextInput,StyleSheet,Alert,KeyboardAvoidingView,Platform,Dimensions,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearCitas, editarCitas } from "../../Src/Services/CitasService";

export default function EditarCitasScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const cita = route.params?.cita;  // Obtiene la cita desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [idPasientes, setIdPasientes] = useState(cita?.idPasientes?.toString() || "");
  const [idMedicos, setIdMedicos] = useState(cita?.idMedicos?.toString() || "");
  const [idConsultorios, setIdConsultorios] = useState(cita?.idConsultorios?.toString() || "");
  const [fecha, setfecha] = useState(cita?.fecha || "");
  const [hora, setHora] = useState(cita?.hora || "");
  const [estado, setEstado] = useState(cita?.estado?.toString() || "");
  const [motivo, setMotivo] = useState(cita?.motivo?.toString() || "");
  const [observacion, setObservacion] = useState(cita?.observacion?.toString() || "");
  const [tipo_consulta, setTipo_consulta] = useState(cita?.tipo_consulta?.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!cita;  // Determina si es una edición o una nueva cita

  // Función para manejar el guardado de la cita
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!idPasientes || !idMedicos || !idConsultorios || !fecha || !hora || !estado || !motivo || !observacion || !tipo_consulta) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarCitas(cita.id, {
          idMedicos: parseInt(idMedicos),
          idPasientes: parseInt(idPasientes),
          idConsultorios: parseInt(idConsultorios),
          fecha,
          hora,
          estado,
          motivo,
          observacion,
          tipo_consulta
        });
      } else {
        result = await crearCitas({ idMedicos, idPasientes, idConsultorios, fecha, hora, estado, motivo, observacion, tipo_consulta });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Cita actualizada" : "Cita creada");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar la cita");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar la cita");
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
        <Text style={styles.logo}>{esEdicion ? "EDITAR CITA" : "NUEVA CITA"}</Text>
        <Text style={styles.subtitle}>Gestiona los detalles de tu cita</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>{esEdicion ? "Editar Detalles de Cita" : "Crear Nueva Cita"}</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>ID Médico</Text>
            <TextInput
              style={styles.input}
              placeholder="Id del médico"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={idMedicos}
              onChangeText={setIdMedicos}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>ID Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Id del paciente"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={idPasientes}
              onChangeText={setIdPasientes}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>ID Consultorio</Text>
            <TextInput
              style={styles.input}
              placeholder="Id del consultorio"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={idConsultorios}
              onChangeText={setIdConsultorios}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha</Text>
            <TextInput
              style={styles.input}
              placeholder="AAAA-MM-DD"
              placeholderTextColor="#aaa"
              value={fecha}
              onChangeText={setfecha}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM:SS"
              placeholderTextColor="#aaa"
              value={hora}
              onChangeText={setHora}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Estado</Text>
            <TextInput
              style={styles.input}
              placeholder="Estado de la cita"
              placeholderTextColor="#aaa"
              value={estado}
              onChangeText={setEstado}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Motivo</Text>
            <TextInput
              style={styles.input}
              placeholder="Motivo de la consulta"
              placeholderTextColor="#aaa"
              value={motivo}
              onChangeText={setMotivo}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Observaciones</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Detalles adicionales"
              placeholderTextColor="#aaa"
              value={observacion}
              onChangeText={setObservacion}
              multiline
              numberOfLines={4}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tipo de Consulta</Text>
            <TextInput
              style={styles.input}
              placeholder="Tipo de consulta"
              placeholderTextColor="#aaa"
              value={tipo_consulta}
              onChangeText={setTipo_consulta}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <BottonComponent
            title={loading ? "Guardando..." : "Guardar Cita"}
            onPress={handleGuardar}
            disabled={loading}
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
