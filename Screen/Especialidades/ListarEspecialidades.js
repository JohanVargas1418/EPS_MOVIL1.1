import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ListarEspecialidades({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listar Especialidades</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("DetalleEspecialidades")}
            >
                <Text style={styles.buttonText}>Ver Especialidad</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("EditarEspecialidades")}
            >
                <Text style={styles.buttonText}>Editar Especialidad</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d3e8e7", // Color de fondo
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#6de2b4", // Color de fondo del botón
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: "80%", // Ancho del botón
        alignItems: "center", // Centrar texto
    },
    buttonText: {
        color: "#FFFFFF", // Color del texto del botón
        fontSize: 18,
        fontWeight: "600",
    },
});
