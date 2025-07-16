import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 

// Componente principal CitasCard
export default function CitasCard({ cita, onEdit, onDelete }) {
    /**
     * Estado para controlar la visibilidad de los detalles de la cita
     * showDetails: booleano que indica si mostrar o no los detalles
     * setShowDetails: función para actualizar el estado
     */
    const [showDetails, setShowDetails] = useState(false);

    // Renderizado del componente
    return (
        // Vista principal que contiene toda la tarjeta de la cita
        <View style={style.card}>
            <View style={style.info}>
                {/**
                 * Botón táctil que alterna la visibilidad de los detalles
                 * Al presionarlo, cambia el estado showDetails
                 */}
                <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                    <Text style={style.nombre}>Paciente: {cita.pasiente?.nombre}</Text>

                    {/**
                     * Condicional para mostrar los detalles cuando showDetails es true
                     * Si es true
                     */}
                    {showDetails && (
                        <>
                            <Text style={style.detalle}>Observacion: {cita.observacion}</Text>
                            <Text style={style.detalle}>Tipo de la Consulta: {cita.tipo_consulta}</Text>
                            <Text style={style.detalle}>Estado: {cita.estado}</Text>
                            <Text style={style.detalle}>Hora: {cita.hora}</Text>
                            <Text style={style.detalle}>Fecha: {cita.fecha}</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>

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
        shadowColor: '#000',  // Color de sombra
        shadowOffset: { width: 0, height: 2 },  // Desplazamiento de sombra
        shadowOpacity: 0.1,  // Opacidad de sombra
        shadowRadius: 4,  // Radio de difuminado de sombra
        elevation: 3,  // Elevación 
    },
    info: {
        flex: 1,  // Ocupa todo el espacio disponible
    },
    nombre: {
        fontSize: 18,  
        fontWeight: 'bold',  // Negrita
        color: '#000080',   // Azul oscuro para contraste
        marginBottom: 4,  
    },
    detalle: {
        fontSize: 14,  
        color: '#333333',   // Gris oscuro para contraste
        marginBottom: 2,  
    },
    actions: {
        flexDirection: 'row',  // Alineación horizontal de los botones
        marginLeft: 8, 
    },
    iconBtn: {
        marginLeft: 12, 
    },
});