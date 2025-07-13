import React from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import {Ionicons} from "@expo/vector-icons"


export default function CitaCard({paciente, onEdit, onDelete}) {
    return (
        <View style={Style.card}>
            <View style={Style.info}>
                <Text style={Style.nombre}>{paciente.nombre}</Text>
                <Text style={Style.apellido}>{paciente.apellido}</Text>
                <Text style={Style.num_documento}>{paciente.num_documento}</Text>
                <Text style={Style.tipo_documento}>{paciente.tipo_documento}</Text>
                <Text style={Style.genero}>{paciente.genero}</Text>
                <Text style={Style.telefono}>{paciente.telefono}</Text>
                <Text style={Style.correo}>{paciente.correo}</Text>
            </View>
            <View style={Style.actions}>
                <TouchableOpacity onPress={onEdit} style={Style.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={Style.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="black"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const Style = StyleSheet.create({
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