import React from "react";
import { View,Text, StyleSheet, TouchableOpacity, StyleSheet } from "react-native";
import {Ionicons} from "@expo/vector-icons"


export default function CitaCard({paciente, onEdit, onDelete}) {
    return (
        <View style={StyleSheet.card}>
            <View style={StyleSheet.info}>
                <Text style={StyleSheet.nombre}>{paciente.nombre}</Text>
                <Text style={StyleSheet.apellido}>{paciente.apellido}</Text>
                <Text style={StyleSheet.num_documento}>{paciente.num_documento}</Text>
                <Text style={StyleSheet.tipo_documento}>{paciente.tipo_documento}</Text>
                <Text style={StyleSheet.genero}>{paciente.genero}</Text>
                <Text style={StyleSheet.telefono}>{paciente.telefono}</Text>
                <Text style={StyleSheet.correo}>{paciente.correo}</Text>
            </View>
            <View style={StyleSheet.actions}>
                <TouchableOpacity onPress={onEdit} style={StyleSheet.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={StyleSheet.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="black"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const StyleSheet = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset:{width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    info:{
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    apellido: {
        fontSize: 14,
        color: "#555",
    },
    num_documento: {
        fontSize: 14,
        color: "#555",
    },
    tipo_documento: {
        fontSize: 14,
        color: "#555",
    },
    genero: {
        fontSize: 14,
        color: "#555",
    },
    telefono: {
        fontSize: 14,
        color: "#555",
    },
    correo: {
        fontSize: 14,
        color: "#555",
    },
    actions: {
        flexDirection: "row",
        marginLeft: 8,
    },
    iconBtn: {
        marginHorizontal: 4,
        padding: 4,
    },
})