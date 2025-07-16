import React, { useState } from "react";
import BottonComponent from "../../components/BottonComponent";
import {ScrollView,View,Text,TextInput,StyleSheet,Alert,ActivityIndicator,Platform,Dimensions,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearConsultorios, editarConsultorios } from "../../Src/Services/ConsultorioService";

// Componente principal EditarConsultorioScreen
export default function EditarConsultorioScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const consultorio = route.params?.consultorio;  // Obtiene el consultorio desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [numero, setNumero] = useState(consultorio?.numero?.toString() || "");
  const [piso, setPiso] = useState(consultorio?.piso?.toString() || "");
  const [edificio, setEdificio] = useState(consultorio?.edificio?.toString() || "");
  const [descripcion, setDescripcion] = useState(consultorio?.descripcion?.toString() || "");
  const [disponible, setDisponible] = useState(consultorio?.disponible?.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!consultorio;  // Determina si es una edición o una nueva creación

  // Función para manejar el guardado del consultorio
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!numero || !piso || !edificio || !descripcion || !disponible) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarConsultorios(consultorio.id, {
          numero: parseInt(numero),
          piso: parseInt(piso),
          edificio,
          descripcion,
          disponible,
        });
      } else {
        result = await crearConsultorios({ numero, piso, edificio, descripcion, disponible });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Consultorio actualizado" : "Consultorio creado");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar el consultorio");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el consultorio");
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
        <Text style={styles.logo}>CONSULTORIO</Text> {/* Título principal */}
        <Text style={styles.subtitle}>
          {esEdicion ? "Editar detalles del consultorio" : "Crear nuevo consultorio"}
        </Text> {/* Subtítulo dinámico */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            {esEdicion ? "Formulario de Edición" : "Formulario de Creación"}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Número de Piso del Edificio</Text>
            <TextInput
              style={styles.input}
              placeholder="Número de Piso"
              placeholderTextColor="#aaa"
              value={piso}
              onChangeText={setPiso}
              keyboardType="numeric"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Número del Consultorio</Text>
            <TextInput
              style={styles.input}
              placeholder="Número del Consultorio"
              placeholderTextColor="#aaa"
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre del Edificio</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Edificio"
              placeholderTextColor="#aaa"
              value={edificio}
              onChangeText={setEdificio}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción del Consultorio</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Descripción del Consultorio"
              placeholderTextColor="#aaa"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={4}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Consultorio disponible</Text>
            <TextInput
              style={styles.input}
              placeholder="Estado de disponibilidad"
              placeholderTextColor="#aaa"
              value={disponible}
              onChangeText={setDisponible}
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <BottonComponent
            title={loading ? "Guardando..." : "Guardar Consultorio"}
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
