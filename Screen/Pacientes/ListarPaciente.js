import {View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native"
import React, { useState, useEffect } from "react";
import pacienteCard from "../../components/PacienteCard";
import { useNavigation } from "@react-navigation/native";
import { listarPasientes } from "../../Src/Services/PacienteService";
import { eliminarPasientes } from "../../Src/Services/PacienteService";

export default function Pacientes (){
    const[Pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    const handlePacientes = async () => {
        setLoading(true);
        try {
            const result = await listarPasientes();
            if (result.success) {
                setPacientes(result.data);
            } else {
                Alert.alert("Error", result.message || "Error al cargar pacientes");
            }
        }catch (error) {
            Alert.alert("Error", "Error al cargar pacientes");
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handlePacientes);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar esta paciente?",
            [
                {text: "Cancelar",style: "cancel"},
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarPasientes(id);
                            if (result.success) {
                                handlePacientes();
                            } else {
                                Alert.alert("Error", result.message || "Error al eliminar paciente");
                            }
                        } catch (error) {
                            Alert.alert("Error", "Error al eliminar paciente");
                        }
                    },
                }
            ]
        );
    }

    const handleEditar = (paciente) => {
        navigation.navigate("EditarPaciente", { paciente });
    }

    const handleCrear = () => {
        navigation.navigate("EditarPacientes");
    }

    if (loading) {
        return (
            <View style={StyleSheet.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <FlatList
            data={Pacientes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <pacienteCard
                    paciente={item} //pasa la actividad a la tarjeta
                    onEdit={() => handleEditar(item)}
                    onDelete={() => handleEliminar(item.id)}
                />
            )}
            />
            <TouchableOpacity style={Style.botonCrear} onPress={handleCrear}>
                <Text style={Style.TextoBoton}>+ Nuevo paciente</Text>
            </TouchableOpacity>
        </View>
    )
}

const Style = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#888",
        fontSize: 16,
    },
    botonCrear: {
        backgroundColor: "#1976D2",
        padding: 16,
        borderRadius: 8,
        margin: 16,
        alignItems: "center",
    },
    TextoBoton: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    }
});
