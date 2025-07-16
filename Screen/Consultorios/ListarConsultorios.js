import React, { useEffect, useState } from "react";  
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Dimensions } from "react-native";  
import { useNavigation } from "@react-navigation/native";  
import { listarConsultorios, eliminarConsultorios } from "../../Src/Services/ConsultorioService";  
import ConsultorioCard from "../../components/ConsultorioCard";  

// Componente principal ListarConsultoriosScreen
export default function ListarConsultoriosScreen() {
  const [consultorio, setConsultorio] = useState([]);  // Estado para almacenar los consultorios
  const [loading, setLoading] = useState(true);  // Estado para controlar el loading
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar los consultorios
  const handleCargarConsultorio = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarConsultorios(); 
      if (result.success) {
        setConsultorio(result.data);  // Actualiza el estado con los consultorios obtenidos
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los consultorios");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los consultorios");
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  };

  // Efecto para cargar consultorios al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarConsultorio);
    return unsubscribe;  // Limpia el listener al desmontar el componente
  }, [navigation]);

  // Función para manejar la eliminación de un consultorio
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar consultorio",
      "¿Estás seguro que deseas eliminar este consultorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarConsultorios(id);  // Llama al servicio para eliminar el consultorio
              if (result.success) {
                handleCargarConsultorio();  // Recarga los consultorios después de eliminar
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el consultorio");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el consultorio");
            }
          },
        },
      ]
    );
  };

  // Función para manejar la edición de un consultorio
  const handleEditar = (item) => {
    navigation.navigate("editarConsultorios", { consultorio: item });  // Navega a la pantalla de edición
  };

  // Función para manejar la creación de un nuevo consultorio
  const handleCrear = () => {
    navigation.navigate("editarConsultorios");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se obtienen los consultorios
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4ECDC4" /> {/* Color aguamarina para el indicador */}
      </View>
    );
  }

  // Renderiza la lista de consultorios
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>CONSULTORIOS</Text>
        <Text style={styles.subtitle}>Listado de consultorios disponibles</Text>
      </View>

      <FlatList
        data={consultorio}  // Datos de los consultorios
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <ConsultorioCard
            consultorio={item}  // Pasa el consultorio al componente ConsultorioCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay consultorios registrados</Text>}  // Mensaje si no hay consultorios
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
    height: '25%', // Altura relativa para el encabezado (ajustado para dejar más espacio a la lista)
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
