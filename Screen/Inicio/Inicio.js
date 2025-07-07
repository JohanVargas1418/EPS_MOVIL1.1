// src/Screen/Inicio/Inicio.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { AntDesign, FontAwesome6, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla para estilos responsivos
const itemWidth = (width / 2) - 30; // 2 ítems por fila con margen

export default function Inicio() {
    const navigation = useNavigation();

    const navigateToFlow = (flowName) => {
        navigation.navigate(flowName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="black" /> {/* Estilo de la barra de estado */}
            <View style={styles.container}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>SE BIENVENIDO</Text>
                    <Text style={styles.headerSubtitle}>A tu EPS de confianza</Text>
                    <Text style={styles.headerSubtitle}>Selecciona una opción</Text>
                    
                </View>

                {/* Contenedor de las casillas de la cuadrícula */}
                <View style={styles.gridContainer}>
                    {/* Casilla de Asociados */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('CitasFlow')}
                    >
                        <AntDesign name="medicinebox" size={24} color="black" />
                        <Text style={styles.gridItemText}>Citas</Text>
                    </TouchableOpacity>

                    {/* Casilla de Actividades */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('EspecialidadesFlow')}
                    >
                        <MaterialIcons name="folder-special" size={24} color="black" />
                        <Text style={styles.gridItemText}>Especialidades</Text>
                    </TouchableOpacity>

                    {/* Casilla de Participaciones */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('MedicosFlow')}
                    >
                        <FontAwesome6 name="user-doctor" size={24} color="black" />
                        <Text style={styles.gridItemText}>Medicos</Text>
                    </TouchableOpacity>

                    {/* Casilla de Préstamos */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('PacienteFlow')}
                    >
                        <Fontisto name="bed-patient" size={24} color="black" />
                        <Text style={styles.gridItemText}>Pacientes</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f2f5', // Un fondo gris claro para toda la pantalla
    },
    container: {
        flex: 1,
        backgroundColor: '#d3e8e7', // Asegura que el fondo sea consistente
        padding: 20, // Padding general para el contenido
    },
    header: {
        alignItems: 'center',
        marginBottom: 40, // Más espacio debajo del encabezado
        marginTop: 20, // Espacio superior para el encabezado
    },
    headerTitle: {
        fontSize: 32, // Tamaño de fuente más grande para el título
        fontWeight: '800', // Más negrita
        color: '#1d503c', // Color de texto oscuro
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#666', // Color de texto gris medio
    },
    statusText: {
        fontWeight: 'bold',
        color: 'blue', // Un verde brillante para "Habilitado"
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around', // Distribuye los ítems uniformemente
        paddingHorizontal: 5, // Pequeño padding horizontal
    },
    gridItem: {
        width: itemWidth, // Ancho calculado para 2 ítems por fila
        height: itemWidth, // Para hacerlo cuadrado
        backgroundColor: '#ffffff', // Fondo blanco para las casillas
        borderRadius: 15, // Bordes más redondeados
        marginVertical: 10, // Margen vertical entre filas
        alignItems: 'center',
        justifyContent: 'center',
        // Sombras para Android
        elevation: 8,
        // Sombras para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    gridItemText: {
        marginTop: 15, // Más espacio entre el icono y el texto
        fontSize: 17, // Tamaño de fuente ligeramente más grande
        fontWeight: '600', // Negrita media
        color: '#444', // Color de texto oscuro
        textAlign: 'center',
    },
});