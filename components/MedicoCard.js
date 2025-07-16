import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';  
import { Ionicons } from '@expo/vector-icons';  

// Componente principal MedicoCard
export default function MedicoCard({ medicos, onEdit, onDelete }) {
    // Estado para mostrar/ocultar detalles del médico
    const [showDetails, setShowDetails] = useState(false);

    // Renderizado del componente
    return (
        <View style={style.card}>
            {/* Contenedor para la información del médico */}
            <View style={style.info}>
                {/* Botón táctil que alterna la visibilidad de los detalles */}
                <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                    {/* Muestra el nombre del médico */}
                    <Text style={style.nombre}>Médico: {medicos?.nombre}</Text>

                    {showDetails && (
                        <>
                            {/* Detalles que se muestran si showDetails es true */}
                            <Text style={style.detalle}>Apellido: {medicos?.apellido}</Text>
                            <Text style={style.detalle}>Número de documento: {medicos.num_documento}</Text>
                            <Text style={style.detalle}>Tipo de documento: {medicos.tipo_documento}</Text>
                            <Text style={style.detalle}>Registro del médico: {medicos.reg_medicos}</Text>
                            <Text style={style.detalle}>Médico está activo o inactivo: {medicos.activo}</Text>
                            <Text style={style.detalle}>Teléfono: {medicos.telefono}</Text>
                            <Text style={style.detalle}>Correo electrónico: {medicos.correo}</Text>
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
