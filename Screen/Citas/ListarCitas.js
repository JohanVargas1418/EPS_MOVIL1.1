import React, { useEffect, useState } from "react";  
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Dimensions } from "react-native";  
import { useNavigation } from "@react-navigation/native"; 
import { listarCitas, eliminarCitas } from "../../Src/Services/CitasService";  
import CitaCard from "../../components/CitasCard"; 

// Componente principal ListarCitasScreen
export default function ListarCitasScreen() {
  const [citas, setCitas] = useState([]);  // Estado para almacenar las citas
  const [loading, setLoading] = useState(true);  // Estado para controlar el loading
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar las citas
  const handleCargarCitas = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarCitas();  
      if (result.success) {
        setCitas(result.data);  // Actualiza el estado con las citas obtenidas
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar las citas");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las citas");
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  };

  // Efecto para cargar citas al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarCitas);
    return unsubscribe;  // Limpia el listener al desmontar el componente
  }, [navigation]);

  // Función para manejar la eliminación (con restricción)
  const handleEliminar = (id) => {
    Alert.alert(
      "Acción no permitida",
      "No tienes permisos para eliminar citas",
      [
        { text: "Entendido", style: "cancel" }
      ]
    );
  };

  // Función para manejar la edición de una cita
  const handleEditar = (cita) => {
    navigation.navigate("editarCitas", { cita });  // Navega a la pantalla de edición
  };

  // Función para manejar la creación de una nueva cita
  const handleCrear = () => {
    navigation.navigate("editarCitas");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se obtienen las citas
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4ECDC4" /> {/* Color aguamarina para el indicador */}
      </View>
    );
  }

  // Renderiza la lista de citas
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>CITAS</Text>
        <Text style={styles.subtitle}>Tus citas programadas</Text>
      </View>

      <FlatList
        data={citas}  // Datos de las citas
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <CitaCard
            cita={item}  // Pasa la cita al componente CitaCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay citas registradas</Text>}  // Mensaje si no hay citas
        contentContainerStyle={styles.flatListContent}  // Estilo para el contenido de la lista
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handleCrear}>
        <Text style={styles.floatingButtonText}>+</Text> {/* Icono de más para crear */}
      </TouchableOpacity>
    </View>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF', // Aguamarina claro (LightCyan)
    justifyContent: 'space-between', // Distribuye el espacio verticalmente
  },
  header: {
    height: '22%', // Altura relativa para el encabezado (ajustado para dejar más espacio a la lista)
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#E0FFFF', // Fondo aguamarina claro para el loading
  },
  flatListContent: {
    paddingTop: 20, // Espacio superior para la lista
    paddingHorizontal: 15, // Padding horizontal para que las tarjetas no toquen los bordes
    paddingBottom: 100, // Espacio para el botón flotante
  },
  empty: {
    textAlign: "center",
    marginTop: 40, // Más margen superior para el mensaje de vacío
    fontSize: 18, // Tamaño de fuente más grande
    color: "#636e72", // Color de texto consistente
    fontWeight: '500',
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: '#4ECDC4', // Aguamarina más saturado para el botón
    width: 60,
    height: 60,
    borderRadius: 30, // Botón circular
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 30, // Ajuste para centrar el "+"
  },
});
