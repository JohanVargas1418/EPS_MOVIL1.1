import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function DetalleActividad({ route }) {
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if (route.params?.cita) {
            setModoEdicion(true);
            setId(route.params.cita.id || "");
            setNombre(route.params.cita.nombre || "");
            setFecha(route.params.cita.fecha || "");
            setHora(route.params.cita.hora || "");
            setDescripcion(route.params.cita.descripcion || "");
        }
    }, [route.params?.cita]);

    const handleGuardar = () => {
        if (!nombre || !fecha || !hora) {
            Alert.alert("Error", "Por favor complete todos los campos requeridos");
            return;
        }

        const nuevaCita = {
            id: modoEdicion ? id : Date.now().toString(),
            nombre,
            fecha,
            hora,
            descripcion
        };

        console.log(nuevaCita);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{modoEdicion ? "Editar Cita" : "Nueva Cita"}</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Nombre del paciente*"
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                style={styles.input}
                placeholder="Fecha* (DD/MM/AAAA)"
                value={fecha}
                onChangeText={setFecha}
            />

            <TextInput
                style={styles.input}
                placeholder="Hora* (HH:MM)"
                value={hora}
                onChangeText={setHora}
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descripción"
                multiline
                numberOfLines={4}
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar}>
                <Text style={styles.textoBoton}>
                    {modoEdicion ? "Actualizar Cita" : "Crear Cita"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#d3e8e7"
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 15
    },
    textArea: {
        height: 100,
        textAlignVertical: "top"
    },
    boton: {
        backgroundColor: "#6de2b4",
        padding: 15,
        borderRadius: 5,
        alignItems: "center"
    },
    textoBoton: {
        color: "#fff",
        fontWeight: "bold"
    }
});
