import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';  
import { Ionicons } from '@expo/vector-icons'; 

// Componente principal EspecialidadesCard
export default function EspecialidadesCard({ especialidades, onEdit, onDelete }) {
    // Estado para controlar la visibilidad de los detalles de la especialidad
    const [showDetails, setShowDetails] = useState(false);

    // Renderizado del componente
    return (
        <View style={style.card}>
            {/* Contenedor para la información de la especialidad */}
            <View style={style.info}>
                {/* Botón táctil que alterna la visibilidad de los detalles */}
                <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                    {/* Muestra el nombre de la especialidad */}
                    <Text style={style.nombre}>Especialidad: {especialidades?.nombre}</Text>
                    {showDetails && (
                        <>
                            {/* Descripción de la especialidad que se muestra si showDetails es true */}
                            <Text style={style.detalle}>Descripción de la especialidad: {especialidades.descripcion}</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
            {/* Contenedor para los botones de acción */}
            <View style={style.actions}>
                <TouchableOpacity onPress={onEdit} style={style.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete} style={style.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#D32f2f" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Objeto de estilos utilizando StyleSheet
const style = StyleSheet.create({
    card: {
        flexDirection: 'row', 
        justifyContent: 'space-between',  
        alignItems: 'center',  
        backgroundColor: '#AFEEEE', // Verde aguamarina claro
        padding: 16, 
        marginVertical: 8, 
        marginHorizontal: 16, 
        borderRadius: 12,  
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 2 },  // Desplazamiento de sombra
        shadowOpacity: 0.1,  // Opacidad de sombra
        shadowRadius: 4,  // Radio de difuminado de sombra
        elevation: 3,  // Elevación (para Android)
    },
    info: {
        flex: 1,  
    },
    nombre: {
        fontSize: 18,  
        fontWeight: 'bold',
        color: '#000080',  // Azul oscuro para contraste
        marginBottom: 4, 
    },
    detalle: {
        fontSize: 14,
        color: '#333333',  // Gris oscuro para contraste
        marginBottom: 2, 
    },
    actions: {
        flexDirection: 'row', 
        marginLeft: 8, 
    },
    iconBtn: {
        marginLeft: 12,  
    },
});
