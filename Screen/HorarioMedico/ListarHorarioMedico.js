import React, { useEffect, useState } from "react";  
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";  
import { useNavigation } from "@react-navigation/native";  
import { listarHoraMedico, eliminarHoraMedico } from "../../Src/Services/HoraMedicaService"; 
import HoraMedicaCard from "../../components/HorarioMedicoCard";

// Componente principal ListarHorarioMedicoScreen
export default function ListarHorarioMedicoScreen() {
  const [hora_medico, setHoraMedico] = useState([]);  // Estado para almacenar los horarios médicos
  const [loading, setLoading] = useState(true);  // Estado para controlar el loading
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar los horarios médicos
  const handleCargarHoraMedico = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarHoraMedico(); 
      if (result.success) {
        setHoraMedico(result.data);  // Actualiza el estado con los horarios médicos obtenidos
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los horarios médicos");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los horarios médicos");
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  };

  // Efecto para cargar horarios médicos al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarHoraMedico);
    return unsubscribe;  // Limpia el listener al desmontar el componente
  }, [navigation]);

  // Función para manejar la eliminación de un horario médico
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar horario médico",
      "¿Estás seguro que deseas eliminar el horario médico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarHoraMedico(id);  // Llama al servicio para eliminar el horario médico
              if (result.success) {
                handleCargarHoraMedico();  // Recarga los horarios médicos después de eliminar
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar los horarios médicos");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar los horarios médicos");
            }
          },
        },
      ]
    );
  };

  // Función para manejar la edición de un horario médico
  const handleEditar = (item) => {
    navigation.navigate("editarHoraMedico", { hora_medico: item });  // Navega a la pantalla de edición
  };

  // Función para manejar la creación de un nuevo horario médico
  const handleCrear = () => {
    navigation.navigate("editarHoraMedico");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se obtienen los horarios médicos
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4ECDC4" /> {/* Color aguamarina para el indicador */}
      </View>
    );
  }

  // Renderiza la lista de horarios médicos
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>HORARIOS MÉDICOS</Text>
        <Text style={styles.subtitle}>Listado de horarios de médicos</Text>
      </View>

      <FlatList
        data={hora_medico}  // Datos de los horarios médicos
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <HoraMedicaCard
            hora_medico={item}  // Pasa el horario médico al componente HoraMedicaCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay horarios médicos registrados</Text>}  // Mensaje si no hay horarios médicos
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
