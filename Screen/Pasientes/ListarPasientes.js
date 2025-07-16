import React, { useEffect, useState } from "react"; 
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";  
import { useNavigation } from "@react-navigation/native";  
import { listarPasientes, eliminarPasientes } from "../../Src/Services/PasientesService";  
import PasientesCard from "../../components/PasientesCard";  

// Componente principal ListarPasientesScreen
export default function ListarPasientesScreen() {
  const [pasientes, setPasientes] = useState([]);  // Estado para almacenar la lista de pacientes
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar los pacientes
  const handleCargarPasientes = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarPasientes();  
      if (result.success) {
        setPasientes(result.data);  // Actualiza el estado con los datos de pacientes
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los pacientes");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los pacientes");
    } finally {
      setLoading(false);  // Finaliza la carga
    }
  };

  // Efecto para cargar los pacientes al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarPasientes);
    return unsubscribe;  // Limpia el listener al desmontar
  }, [navigation]);

  // Función para eliminar un paciente
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar paciente",
      "¿Estás seguro que deseas eliminar este paciente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarPasientes(id);  // Llama al servicio para eliminar el paciente
              if (result.success) {
                handleCargarPasientes();  // Recarga la lista de pacientes
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el paciente");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el paciente");
            }
          },
        },
      ]
    );
  };

  // Función para editar un paciente
  const handleEditar = (pasiente) => {
    navigation.navigate("editarPasientes", { pasientes: pasiente });  // Navega a la pantalla de edición
  };

  // Función para crear un nuevo paciente
  const handleCrear = () => {
    navigation.navigate("editarPasientes");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se cargan los pacientes
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4ECDC4" /> {/* Color aguamarina para el indicador */}
      </View>
    );
  }

  // Renderiza la lista de pacientes
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>PACIENTES</Text>
        <Text style={styles.subtitle}>Listado de pacientes registrados</Text>
      </View>

      <FlatList
        data={pasientes}  // Datos de los pacientes
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <PasientesCard
            pasientes={item}  // Pasa el paciente al componente PasientesCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay pacientes registrados</Text>}  // Mensaje si no hay pacientes
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
