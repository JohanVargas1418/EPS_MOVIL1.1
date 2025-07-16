import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  

// Componente principal ConsultorioCard
export default function ConsultorioCard({ consultorio, onEdit, onDelete }) {
    // Estado para controlar la visibilidad de los detalles del consultorio
    const [showDetails, setShowDetails] = useState(false);

    // Renderizado del componente
    return (
        <View style={style.card}>
            {/* Contenedor para la información del consultorio */}
            <View style={style.info}>
                {/* Botón táctil que alterna la visibilidad de los detalles */}
                <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                    {/* Muestra el nombre del edificio */}
                    <Text style={style.nombre}>Nombre del Edificio: {consultorio?.edificio}</Text>
                    {showDetails && (
                        <>
                            {/* Detalles del consultorio que se muestran si showDetails es true */}
                            <Text style={style.detalle}>Número del consultorio: {consultorio.numero}</Text>
                            <Text style={style.detalle}>Número de piso del consultorio: {consultorio.piso}</Text>
                            <Text style={style.detalle}>Descripción del consultorio: {consultorio.descripcion}</Text>
                            <Text style={style.detalle}>Consultorios disponibles: {consultorio.disponible}</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
            {/* Contenedor para los botones de acción */}
            <View style={style.actions}>
                {/* Botón para editar el consultorio */}
                <TouchableOpacity onPress={onEdit} style={style.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2" />
                </TouchableOpacity>

                {/* Botón para eliminar el consultorio */}
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
        flexDirection: 'row',  // Alineación horizontal de los botones
        marginLeft: 8,  
    },
    iconBtn: {
        marginLeft: 12,  
    },
});