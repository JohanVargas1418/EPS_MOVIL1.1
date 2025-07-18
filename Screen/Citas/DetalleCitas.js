import React, { useState } from "react";
import BottonComponent from "../../components/BottonComponent";
import {ScrollView,View,Text,TextInput,StyleSheet,Alert,KeyboardAvoidingView,Platform,Dimensions,} from "react-native";

export default function DetallesCitasScreen({ navigation }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState("");
  const [motivo, setMotivo] = useState("");
  const [observacion, setObservacion] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");

  // Regex para validación de formato (se mantienen)
  const fechaRegex = /^\d{4}\/\d{2}\/\d{2}$/; 
  const horaRegex = /^\d{2}:\d{2}$/; 

  const handleSubmit = () => {
    if (!fecha || !hora || !estado || !motivo || !observacion || !tipoConsulta) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    if (!fechaRegex.test(fecha)) {
      Alert.alert("Formato incorrecto", "Fecha debe tener formato YYYY/MM/DD con barras.");
      return;
    }

    if (!horaRegex.test(hora)) {
      Alert.alert("Formato incorrecto", "Hora debe tener formato HH:MM con dos puntos.");
      return;
    }

    Alert.alert(
      "Datos enviados",
      `Fecha: ${fecha}\nHora: ${hora}\nEstado: ${estado}\nMotivo: ${motivo}\nObservación: ${observacion}\nTipo de consulta: ${tipoConsulta}`
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingContainer} // Aplica el estilo del contenedor principal
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>CITAS</Text> {/* Título principal */}
        <Text style={styles.subtitle}>Detalles de tu cita</Text> {/* Subtítulo */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}> {/* Renombrado de 'card' a 'formContainer' para consistencia */}
          <Text style={styles.formTitle}>Formulario de Detalles</Text> {/* Título dentro del formulario */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY/MM/DD"
              placeholderTextColor="#aaa" // Color del placeholder
              keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
              value={fecha}
              onChangeText={setFecha}
              maxLength={10}
              accessibilityLabel="Campo fecha"
            />
            <View style={styles.inputUnderline}></View> {/* Subrayado */}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              placeholderTextColor="#aaa"
              keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
              value={hora}
              onChangeText={setHora}
              maxLength={5}
              accessibilityLabel="Campo hora"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Estado</Text>
            <TextInput
              style={styles.input}
              placeholder="Estado de su cita"
              placeholderTextColor="#aaa"
              value={estado}
              onChangeText={setEstado}
              accessibilityLabel="Campo estado"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Motivo</Text>
            <TextInput
              style={styles.input}
              placeholder="Motivo de la cita"
              placeholderTextColor="#aaa"
              value={motivo}
              onChangeText={setMotivo}
              accessibilityLabel="Campo motivo"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Observación</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Observaciones adicionales"
              placeholderTextColor="#aaa"
              value={observacion}
              onChangeText={setObservacion}
              multiline
              numberOfLines={4}
              accessibilityLabel="Campo observación"
            />
            <View style={styles.inputUnderline}></View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tipo de Consulta</Text>
            <TextInput
              style={styles.input}
              placeholder="Tipo de su consulta"
              placeholderTextColor="#aaa"
              value={tipoConsulta}
              onChangeText={setTipoConsulta}
              accessibilityLabel="Campo tipo de consulta"
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
  buttonText: { // Este estilo es para el texto del BottonComponent, si se usa directamente.
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
