import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener @expo/vector-icons instalado

/**
 * Componente CitasCard combinado y mejorado.
 * Muestra los detalles de una cita y permite editarla o eliminarla.
 * Los detalles adicionales se pueden expandir/contraer.
 * El botón de eliminar solo es visible para usuarios con rol 'admin'.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {object} props.cita - Objeto que contiene los detalles de la cita.
 * @param {function} props.onEdit - Función a ejecutar al presionar el botón de editar.
 * @param {function} props.onDelete - Función a ejecutar al presionar el botón de eliminar.
 * @param {string} props.userRole - El rol del usuario actual (ej. 'admin', 'user').
 */
export default function CitasCard({ cita, onEdit, onDelete, userRole }) {
    // Estado para controlar la visibilidad de los detalles adicionales de la cita
    const [showDetails, setShowDetails] = useState(false);

    return (
        // Contenedor principal de la tarjeta de la cita
        <View style={styles.card}>
            {/* Sección de información de la cita, que se puede expandir/contraer */}
            <View style={styles.info}>
                {/* Botón táctil para alternar la visibilidad de los detalles */}
                <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                    {/* Nombre del paciente, siempre visible */}
                    <Text style={styles.nombre}>Paciente: {cita.pasiente?.nombre || 'Desconocido'}</Text>

                    {/* Detalles adicionales que se muestran condicionalmente */}
                    {showDetails && (
                        <>
                            {/* Detalles del médico y motivo de la cita (del primer código) */}
                            <Text style={styles.detalle}>Médico: {cita.medico?.nombre || 'Médico Desconocido'}</Text>
                            <Text style={styles.detalle}>Motivo: {cita.motivo || 'No especificado'}</Text>

                            {/* Detalles específicos de la segunda versión del código */}
                            <Text style={styles.detalle}>Observación: {cita.observacion || 'Sin observación'}</Text>
                            <Text style={styles.detalle}>Tipo de Consulta: {cita.tipo_consulta || 'No especificado'}</Text>
                            <Text style={styles.detalle}>Estado: {cita.estado || 'Desconocido'}</Text>
                            <Text style={styles.detalle}>Hora: {cita.hora || 'No especificada'}</Text>
                            <Text style={styles.detalle}>Fecha: {cita.fecha || 'No especificada'}</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>

            {/* Sección de acciones (botones de editar y eliminar) */}
            <View style={styles.actions}>
                {/* Botón de editar, siempre visible */}
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2" /> {/* Azul para editar */}
                </TouchableOpacity>

                {/* Botón de eliminar, visible solo si el userRole es 'admin' */}
                {userRole === 'admin' && (
                    <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                        <Ionicons name="trash-outline" size={24} color="#D32f2f" /> {/* Rojo para eliminar */}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

// Objeto de estilos utilizando StyleSheet para optimización y claridad
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row', // Alineación horizontal de los elementos dentro de la tarjeta
        justifyContent: 'space-between', // Espacio equitativo entre los elementos
        alignItems: 'center', // Centra los elementos verticalmente
        backgroundColor: '#AFEEEE', // Color de fondo aguamarina claro
        padding: 16, // Relleno interno
        marginVertical: 8, // Margen vertical entre tarjetas
        marginHorizontal: 16, // Margen horizontal
        borderRadius: 12, // Bordes redondeados
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.1, // Opacidad de la sombra
        shadowRadius: 4, // Radio de difuminado de la sombra
        elevation: 3, // Elevación para Android (simula sombra)
    },
    info: {
        flex: 1, // Permite que esta sección ocupe el espacio disponible
    },
    nombre: {
        fontSize: 18, // Tamaño de fuente para el nombre del paciente
        fontWeight: 'bold', // Negrita
        color: '#000080', // Azul oscuro para un buen contraste
        marginBottom: 4, // Margen inferior
    },
    detalle: {
        fontSize: 14, // Tamaño de fuente para los detalles
        color: '#333333', // Gris oscuro para los detalles
        marginBottom: 2, // Margen inferior
    },
    actions: {
        flexDirection: 'row', // Alineación horizontal de los botones de acción
        marginLeft: 8, // Margen izquierdo para separar de la información
    },
    iconBtn: {
        marginLeft: 12, // Margen izquierdo entre los iconos
    },
});
