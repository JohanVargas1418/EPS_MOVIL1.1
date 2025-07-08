import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import React, {useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {crearPaciente, editarPaciente} from "../../Src/Services/PacienteService";

export default function EditarPaciente () {
  const navigation = useNavigation();
  const route = useRoute();

  const paciente = route.params?.paciente;

  const [nombre, setNombre] = useState(paciente.nombre || "");
  const [edad, setEdad] = useState(paciente.edad || "");
  const [telefono, setTelefono] = useState(paciente.telefono || "");
  const [direccion, setDireccion] = useState(paciente.direccion || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente;

  const handleGuardar = async () => {
        if (!nombre || !edad || !telefono || !direccion) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try{
            let  result; 
            if (esEdicion) {
                result = await editarPaciente(paciente.id, { nombre, edad, telefono, direccion });
            } else {
                result = await crearPaciente({ nombre, edad, telefono, direccion });
            } 
            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Paciente actualizado" : "Paciente creado");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Error al guardar al paciente");
            }        
        } catch (error) {
            Alert.alert("Error", "Error al guardar al paciente");
        } finally {
            setLoading(false);
        }
    }
    return (
      <View style={Styles.container}>
            <Text style={Styles.titulo}>{esEdicion ? "Editar Paciente" : "Crear Paciente"}</Text>
            <TextInput
                style={Styles.input}
                placeholder="Nombre del paciente"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={Styles.input}
                placeholder="Edad del paciente"
                value={edad}
                onChangeText={setEdad}
            />
            <TextInput
                style={Styles.input}
                placeholder="Telefono"
                value={telefono}
                keyboardType="numeric"
                onChangeText={setTelefono}
            />
            <TextInput
                style={Styles.input}
                placeholder="Dirección"
                value={direccion}
                keyboardType="numeric"
                onChangeText={setDireccion}
            />
            <TouchableOpacity
            style={Styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={Styles.botonTexto}>{esEdicion ? "Actualizar" : "Crear"}</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    boton: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        borderRadius: 5,
    },
    botonTexto: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
});