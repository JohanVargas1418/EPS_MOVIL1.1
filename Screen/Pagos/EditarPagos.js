import React, { useEffect, useState } from "react"; 
import {
    View,
    Text,
    TextInput,
    Alert,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
} from "react-native";  
import { Picker } from "@react-native-picker/picker";  
import { useNavigation, useRoute } from "@react-navigation/native";  
import { listarPasientes } from "../../Src/Services/PasientesService";  
import { crearPagos, editarPagos } from "../../Src/Services/PagosService";  
import BotonComponent from "../../components/BottonComponent"; // Assuming this component exists and is styled appropriately

// Componente principal EditarPagosScreen
export default function EditarPagosScreen() {
    const navigation = useNavigation();  // Hook para la navegación
    const route = useRoute();  // Hook para acceder a los parámetros de la ruta
    const pagos = route.params?.pagos;  // Obtiene el pago a editar desde los parámetros de la ruta

    // Estados para los campos del formulario
    const [fecha, setFecha] = useState(pagos?.fecha || "");
    const [total, setTotal] = useState(pagos?.total?.toString() || ""); // Renamed from setDocumento for clarity
    const [estado, setEstado] = useState(pagos?.estado?.toString() || "");
    const [met_pago, setMetPago] = useState(pagos?.met_pago?.toString() || "");
    const [idPasientes, setIdPasientes] = useState(pagos?.idPasientes?.toString() || "");
    const [idCitas, setIdCitas] = useState(pagos?.idCitas?.toString() || "");

    const [loading, setLoading] = useState(false);  // Estado para controlar el loading
    const [pasientes, setPasientes] = useState([]);  // Estado para almacenar la lista de pacientes

    // Efecto para cargar la lista de pacientes
    useEffect(() => {
        const cargarPasientes = async () => {
            const result = await listarPasientes(); 
            if (result.success) {
                setPasientes(result.data);  // Actualiza el estado con los datos de pacientes
            } else {
                Alert.alert(
                    "Error",
                    result.message || "No se pudieron cargar los pacientes"
                );
            }
        };
        cargarPasientes();  // Llama a la función para cargar pacientes
    }, []);

    const esEdicion = !!pagos;  // Determina si es una edición o una nueva creación

    // Función para manejar el guardado del pago
   const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!fecha || !total || !estado || !met_pago || !idPasientes || !idCitas) {
        Alert.alert("Error", "Por favor completa todos los campos");
        return;
    }

    setLoading(true);  // Activa el loading

    try {
        let result;
        // Llama a la función de editar o crear según corresponda
        if (esEdicion) {
            result = await editarPagos(pagos.id, {
                fecha,
                total: parseFloat(total), // Convertir a número
                estado,
                met_pago,
                idPasientes: parseInt(idPasientes),
                idCitas: parseInt(idCitas),
            });
        } else {
            result = await crearPagos({
                fecha,
                total: parseFloat(total), // Convertir a número
                estado,
                met_pago,
                idPasientes: parseInt(idPasientes),
                idCitas: parseInt(idCitas),
            });
        }

        // Manejo de la respuesta
        if (result?.success) {
            Alert.alert(
                "Éxito",
                `Pago ${esEdicion ? "editado" : "creado"} correctamente`
            );
            navigation.goBack();  // Regresa a la pantalla anterior
        } else {
            let errorMsg = "No se pudo guardar el pago";
            if (typeof result.message === "object") {
                errorMsg = Object.entries(result.message)
                    .map(([key, val]) => `${key}: ${val.join(", ")}`)
                    .join("\n");
            } else if (typeof result.message === "string") {
                errorMsg = result.message;
            }
            Alert.alert("Error", errorMsg);  // Muestra el mensaje de error
        }
    } catch (error) {
        console.log(error); // Agrega este log para ver el error en la consola
        Alert.alert(
            "Error",
            "Ocurrió un error al guardar el pago. " + (error.response?.data?.error || "Error desconocido.")
        );
    } finally {
        setLoading(false);  // Desactiva el loading
    }
};

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={100}
        >
            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.logo}>PAGOS</Text> {/* Título principal */}
                <Text style={styles.subtitle}>
                    {esEdicion ? "Editar detalles del pago" : "Registrar nuevo pago"}
                </Text> {/* Subtítulo dinámico */}
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>{esEdicion ? "Formulario de Edición" : "Formulario de Registro"}</Text>

                    {/* Selector de pacientes */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Seleccione Paciente</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={idPasientes}
                                onValueChange={setIdPasientes}
                                style={styles.picker}
                            >
                                <Picker.Item label="Seleccione pacientes" value="" />
                                {pasientes.map(e => (
                                    <Picker.Item key={e.id} label={e.nombre} value={e.id.toString()} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.inputUnderline}></View>
                    </View>

                    {/* Campos del formulario */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Fecha</Text>
                        <TextInput
                            placeholder="Fecha"
                            placeholderTextColor="#aaa"
                            value={fecha}
                            onChangeText={setFecha}
                            style={styles.input}
                        />
                        <View style={styles.inputUnderline}></View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Total</Text>
                        <TextInput
                            placeholder="Total"
                            placeholderTextColor="#aaa"
                            value={total}
                            onChangeText={setTotal} // Changed from setDocumento
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        <View style={styles.inputUnderline}></View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Estado</Text>
                        <TextInput
                            placeholder="Estado"
                            placeholderTextColor="#aaa"
                            value={estado}
                            onChangeText={setEstado}
                            style={styles.input}
                        />
                        <View style={styles.inputUnderline}></View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Método de Pago</Text>
                        <TextInput
                            placeholder="Método de Pago"
                            placeholderTextColor="#aaa"
                            value={met_pago}
                            onChangeText={setMetPago}
                            style={styles.input}
                        />
                        <View style={styles.inputUnderline}></View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>ID Citas</Text>
                        <TextInput
                            placeholder="ID Citas"
                            placeholderTextColor="#aaa"
                            value={idCitas}
                            onChangeText={setIdCitas}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        <View style={styles.inputUnderline}></View>
                    </View>

                    {/* Botón para guardar el pago */}
                    <BotonComponent
                        title={loading ? "Guardando..." : (esEdicion ? "Guardar Cambios" : "Registrar Pago")}
                        onPress={handleGuardar}
                        disabled={loading}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
        backgroundColor: '#E0FFFF', // Aguamarina claro (LightCyan)
    },
    header: {
        height: '22%', // Altura relativa para el encabezado
        backgroundColor: '#AFEEEE', // Aguamarina suave (PaleTurquoise) para el desvanecido
        justifyContent: '10%',
        alignItems: 'center',
        paddingTop: 30,
        borderBottomLeftRadius: 3, // Bordes redondeados más pronunciados
        borderBottomRightRadius: 3,
        shadowColor: '#000', // Sombra del encabezado
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    logo: {
        fontSize: 22, // Tamaño de fuente más grande
        fontWeight: 'bold',
        color: '#2F4F4F', // Gris oscuro para un buen contraste
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#6A5ACD', // Azul pizarra (SlateBlue) para el subtítulo
        letterSpacing: 1,
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
        paddingTop: 40, // Más padding superior para el formulario
        backgroundColor: '#FFFFFF', // Fondo blanco para el formulario
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2, // Sombra más visible
        shadowRadius: 20,
        elevation: 10,
        marginTop: -60, // Superposición con el encabezado
        marginBottom: 20,
    },
    formTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2d3436", // Un color oscuro para el título del formulario
        marginBottom: 24,
        textAlign: "center",
    },
    inputContainer: {
        marginBottom: 25, // Más espacio entre inputs
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
    pickerContainer: {
        borderWidth: 0, // Eliminar el borde del pickerContainer
        borderRadius: 0, // Eliminar el radio de borde del pickerContainer
        overflow: 'hidden', // Asegura que el borde redondeado se aplique
        borderBottomWidth: 2, // Simular subrayado para el picker
        borderBottomColor: '#dfe6e9', // Subrayado más claro para el picker
        marginBottom: 5, // Espacio entre el picker y el subrayado
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#2d3436', // Color del texto del picker
    },
    // Estilos para BotonComponent (si se usa directamente)
    saveButton: {
        backgroundColor: '#4ECDC4', // Aguamarina más saturado para el botón
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    saveButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
    },
});
