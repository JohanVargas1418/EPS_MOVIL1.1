import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React, { useState } from "react";
import { registroUser  } from "../../Src/Services/AuthServices"; // Importa la función para manejar el registro
import BottonComponent from "../../components/BottonComponent"; // Importa un componente de botón personalizado

export default function RegistroScreen({ navigation }) {
    // Estados para manejar el nombre, rol, correo y contraseña
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Función para manejar el registro
    const handleRegister = async () => {
        // Verifica que todos los campos estén llenos
        if (!name || !email || !password || !role) {
            return Alert.alert("Error", "Todos los campos son obligatorios");
        }

        // Llama a la función de registro
        const result = await registroUser (name, email, password, role);

        // Manejo de la respuesta del registro
        if (result.success) {
            Alert.alert("Éxito", "Registro exitoso", [
                { text: "OK", onPress: () => navigation.navigate("Login") }, // Navega a la pantalla de inicio de sesión
            ]);
        } else {
            Alert.alert("Error", result.message || "No se pudo registrar"); // Muestra un mensaje de error
        }
    };

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.logo}>REGISTRO</Text>
                <Text style={styles.subtitle}>Únete a nuestra EPS</Text>
            </View>

            {/* Contenedor de desplazamiento para el formulario */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled" // Permite que el teclado no cierre el formulario al tocar
            >
                <View style={styles.formContainer}>
                    {/* Campo de entrada para el nombre */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu nombre"
                            placeholderTextColor="#aaa"
                            value={name}
                            onChangeText={setName} // Actualiza el estado del nombre
                        />
                        <View style={styles.inputUnderline}></View>
                    </View>

                    {/* Campo de entrada para el rol */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Rol</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="admin o user"
                            placeholderTextColor="#aaa"
                            value={role}
                            onChangeText={setRole} // Actualiza el estado del rol
                        />
                        <View style={styles.inputUnderline}></View>
                    </View>

                    {/* Campo de entrada para el correo electrónico */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Correo Electrónico</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu correo electrónico"
                            placeholderTextColor="#aaa"
                            value={email}
                            onChangeText={setEmail} // Actualiza el estado del correo
                            keyboardType="email-address" // Teclado específico para correos
                            autoCapitalize="none" // No capitaliza automáticamente
                        />
                        <View style={styles.inputUnderline}></View>
                    </View>

                    {/* Campo de entrada para la contraseña */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="*********"
                            placeholderTextColor="#aaa"
                            value={password}
                            onChangeText={setPassword} // Actualiza el estado de la contraseña
                            secureTextEntry // Oculta el texto de la contraseña
                        />
                        <View style={styles.inputUnderline}></View>
                    </View>

                    {/* Botón de registro */}
                    <BottonComponent
                        title="Registrarse"
                        onPress={handleRegister} // Llama a la función de registro
                    />
                </View>
            </ScrollView>

            {/* Enlace para ir a la pantalla de inicio de sesión */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={styles.loginLink}
                >
                    <Text style={styles.loginText}>
                        ¿Ya tienes cuenta? <Text style={styles.loginHighlight}>Inicia sesión</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Estilos para los componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0FFFF', // Aguamarina claro (LightCyan)
        justifyContent: 'space-between', // Distribuye el espacio verticalmente
    },
    header: {
        height: '22%', // Altura relativa para el encabezado
        backgroundColor: '#AFEEEE', // Aguamarina suave (PaleTurquoise) para el desvanecido
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        borderBottomLeftRadius: 3, // Bordes redondeados más pronunciados
        borderBottomRightRadius: 3,
        shadowColor: '#000', // Sombra del encabezado
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    logo: {
        fontSize: 48, // Tamaño de fuente más grande
        fontWeight: 'bold',
        color: '#2F4F4F', // Gris oscuro para un buen contraste
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#6A5ACD', // Azul pizarra (SlateBlue) para el subtítulo
        letterSpacing: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    formContainer: {
        width: '90%',
        paddingHorizontal: 30,
        paddingTop: 70, // Más padding superior para el formulario
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2, // Sombra más visible
        shadowRadius: 30,
        elevation: 20,
        marginTop: -70, // Superposición con el encabezado
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 30, // Más espacio entre inputs
    },
    label: {
        color: '#636e72',
        fontSize: 12, // Tamaño de fuente más pequeño para la etiqueta
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 1,
    },
    input: {
        fontSize: 16,
        color: '#2d3436',
        paddingVertical: 8, // Menos padding vertical
        borderWidth: 0, // Eliminar el borde
    },
    inputUnderline: {
        height: 2,
        backgroundColor: '#dfe6e9', // Subrayado más claro
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    footer: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    loginLink: {
        paddingVertical: 10,
    },
    loginText: {
        fontSize: 13,
        color: '#636e72',
        textAlign: 'center',
    },
    loginHighlight: {
        color: '#4ECDC4', // Aguamarina más saturado para el enlace
        fontWeight: 'bold',
    },
});
