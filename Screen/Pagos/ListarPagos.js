import React, { useEffect, useState } from "react"; 
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";  
import { useNavigation } from "@react-navigation/native"; 
import { listarPagos, eliminarPagos } from "../../Src/Services/PagosService"; 
import PagosCard from "../../components/PagosCard"; 

// Componente principal ListarPagosScreen
export default function ListarPagosScreen() {
  const [pagos, setPagos] = useState([]);  // Estado para almacenar la lista de pagos
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar los pagos
const handleCargarPagos = async () => {
    setLoading(true);  // Activa el loading
    try {
        const result = await listarPagos();  
        if (result.success) {
            setPagos(result.data);  // Actualiza el estado con los datos de pagos
        } else {
            Alert.alert("Error", result.message || "No se pudieron cargar los pagos");
        }
    } catch (error) {
        console.log(error); // Agrega este log para ver el error en la consola
        Alert.alert("Error", "No se pudieron cargar los pagos. " + (error.response?.data?.error || "Error desconocido"));
    } finally {
        setLoading(false);  // Finaliza la carga
    }
};


  // Efecto para cargar los pagos al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarPagos);
    return unsubscribe;  // Limpia el listener al desmontar
  }, [navigation]);

  // Función para eliminar un pago
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar pago",
      "¿Estás seguro que deseas eliminar este pago?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarPagos(id);  // Llama al servicio para eliminar el pago
              if (result.success) {
                handleCargarPagos();  // Recarga la lista de pagos
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el pago");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el pago");
            }
          },
        },
      ]
    );
  };

  // Función para editar un pago
  const handleEditar = (pagos) => {
    navigation.navigate("editarPagos", { pagos });  // Navega a la pantalla de edición
  };

  // Función para crear un nuevo pago
  const handleCrear = () => {
    navigation.navigate("editarPagos");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se cargan los pagos
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4ECDC4" /> {/* Color aguamarina para el indicador */}
      </View>
    );
  }

  // Renderiza la lista de pagos
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>PAGOS</Text>
        <Text style={styles.subtitle}>Listado de pagos registrados</Text>
      </View>

      <FlatList
        data={pagos}  // Datos de los pagos
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <PagosCard
            pagos={item}  // Pasa el pago al componente PagosCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay pagos registrados</Text>}  // Mensaje si no hay pagos
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
