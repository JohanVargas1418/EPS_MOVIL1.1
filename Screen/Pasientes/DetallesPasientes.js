import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// import BotonComponent from "../../components/BottonComponent"; // No se usa en el original, pero se puede añadir si es necesario

export default function DetallesPasientesScreen() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Datos de pacientes de ejemplo (reemplaza tu lógica de fetch real aquí)
  useEffect(() => {
    // Simular una carga de datos
    const mockFetchPacientes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simula una llamada a la API
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        const data = [
          {
            id: 1,
            nombre: "Ana García",
            edad: 30,
            genero: "Femenino",
            telefono: "555-1234",
            direccion: "Calle Falsa 123, Ciudad",
            antecedentes: "Ninguno relevante",
          },
          {
            id: 2,
            nombre: "Juan Pérez",
            edad: 45,
            genero: "Masculino",
            telefono: "555-5678",
            direccion: "Avenida Siempre Viva 742, Pueblo",
            antecedentes: "Hipertensión",
          },
          {
            id: 3,
            nombre: "María López",
            edad: 22,
            genero: "Femenino",
            telefono: "555-8765",
            direccion: "Carrera 10 #20-30, Capital",
            antecedentes: "Alergia a la penicilina",
          },
        ];
        setPacientes(data);
      } catch (err) {
        setError("Hubo un error al cargar los datos de pacientes.");
        Alert.alert("Error", "No se pudieron cargar los datos de pacientes.");
      } finally {
        setLoading(false);
      }
    };

    mockFetchPacientes();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4ECDC4" />
        <Text style={styles.loadingText}>Cargando detalles de los pacientes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Hubo un error al cargar los datos.</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (pacientes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noDataText}>No hay datos disponibles de pacientes.</Text>
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
        <Text style={styles.logo}>PACIENTES</Text>
        <Text style={styles.subtitle}>Información detallada de los pacientes</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Detalles de los Pacientes</Text>
          {pacientes.map((paciente, index) => (
            <View key={paciente.id || index} style={styles.card}>
              <Text style={styles.cardTitle}>{paciente.nombre || paciente.name || "Nombre no disponible"}</Text>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Edad:</Text>
                <Text style={styles.value}>{paciente.edad ?? paciente.age ?? "N/A"} años</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Género:</Text>
                <Text style={styles.value}>{paciente.genero ?? paciente.gender ?? "N/A"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Teléfono:</Text>
                <Text style={styles.value}>{paciente.telefono ?? paciente.phone ?? "N/A"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Dirección:</Text>
                <Text style={styles.value}>{paciente.direccion ?? paciente.address ?? "N/A"}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Antecedentes:</Text>
                <Text style={styles.value}>{paciente.antecedentes ?? paciente.history ?? "N/A"}</Text>
              </View>
            </View>
          ))}
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
    height: '25%', // Altura relativa para el encabezado
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
  formContainer: { // Renombrado de 'card' a 'formContainer' para el contenedor principal
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
  formTitle: { // Nuevo estilo para el título dentro del formContainer
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3436", // Un color oscuro para el título del formulario
    marginBottom: 24,
    textAlign: "center",
  },
  card: { // Estilo para cada tarjeta de paciente dentro del formContainer
    backgroundColor: "#f9fafb", // Un color ligeramente diferente para las tarjetas internas
    borderRadius: 12,
    padding: 20,
    marginBottom: 20, // Espacio entre tarjetas
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, // Sombra más sutil para las tarjetas internas
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 22, // Tamaño de fuente ligeramente más grande
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: 'flex-start', // Alinea la parte superior de la etiqueta y el valor
  },
  label: {
    fontWeight: "600",
    width: 120, // Aumentar ancho para etiquetas más largas
    color: "#636e72", // Color de texto consistente
    fontSize: 14, // Tamaño de fuente más pequeño para la etiqueta
  },
  value: {
    flex: 1,
    color: "#2d3436", // Color de texto consistente
    flexWrap: "wrap",
    fontSize: 16, // Tamaño de fuente consistente
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#E0FFFF', // Fondo aguamarina claro para el loading/error
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6A5ACD", // Color consistente con el subtítulo
    fontWeight: '500',
  },
  errorText: {
    color: "#b00020", // Rojo para errores
    fontSize: 18, // Tamaño de fuente más grande para errores
    textAlign: "center",
    fontWeight: 'bold',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 18, // Tamaño de fuente más grande
    color: "#636e72", // Color de texto consistente
    textAlign: "center",
    fontWeight: '500',
    marginTop: 20,
  },
});
