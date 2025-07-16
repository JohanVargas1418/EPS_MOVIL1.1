import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions, Animated, Easing } from "react-native";
import { useState, useEffect, useRef } from "react";
import { loginUser } from "../../Src/Services/AuthServices"; // Importa la función para manejar el inicio de sesión
import BottonComponent from "../../components/BottonComponent"; // Importa un componente de botón personalizado

export default function LoginScreen({ navigation }) {
  // Estados para manejar el email, la contraseña y el estado de carga
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Referencias para animaciones
  const rippleScale = useRef(new Animated.Value(0)).current; // Para el efecto de onda en el botón
  const formPosition = useRef(new Animated.Value(Dimensions.get('window').height * 0.3)).current; // Para la animación de entrada del formulario

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    // Animación que mueve el formulario hacia arriba
    Animated.timing(formPosition, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.back(1)), // Efecto de rebote
      useNativeDriver: true,
    }).start();
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    setLoading(true); // Cambia el estado de carga a verdadero
    // Inicia la animación de onda
    Animated.loop(
      Animated.sequence([
        Animated.timing(rippleScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rippleScale, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    try {
      // Llama a la función de inicio de sesión
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "¡Bienvenido!"); // Muestra un mensaje de éxito
      } else {
        Alert.alert("Error", result.message || "Error al iniciar sesión"); // Muestra un mensaje de error
      }
    } catch (error) {
      Alert.alert("Error", "Error inesperado"); // Manejo de errores
    } finally {
      rippleScale.setValue(0); // Resetea el efecto de onda
      setLoading(false); // Cambia el estado de carga a falso
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateY: formPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100] // Mueve el encabezado hacia arriba
                })
              }
            ]
          }
        ]}
      >
        <Text style={styles.logo}>APP</Text>
        <Text style={styles.subtitle}>Conecta con tu EPS</Text>
        <View style={styles.wave}></View> 
      </Animated.View>

      <Animated.View
        style={[
          styles.formContainer,
          {
            transform: [{ translateY: formPosition }] // Aplica la animación de entrada
          }
        ]}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CORREO</Text>
          <TextInput
            style={styles.input}
            placeholder="correo electronico"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail} // Actualiza el estado del email
            keyboardType="email-address"
          />
          <View style={styles.inputUnderline}></View> 
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CONTRASEÑA</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword} // Actualiza el estado de la contraseña
            secureTextEntry
          />
          <View style={styles.inputUnderline}></View> 
        </View>

        <BottonComponent
          title="Iniciar Sesión"
          onPress={handleLogin} // Llama a la función de inicio de sesión
          disabled={!loading} // Desactiva el botón si está cargando
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Registro")}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>¿Nuevo aquí? <Text style={styles.registerHighlight}>Crea una cuenta</Text></Text>

        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// Estilos para los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF', // Aguamarina muy claro (LightCyan)
  },
  header: {
    height: '30%',
    backgroundColor: '#AFEEEE', // Aguamarina suave (PaleTurquoise)
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    shadowColor: '#000', // Sombra del encabezado
    shadowOffset: { width: 0, height: 8 }, // Sombra más suave
    shadowOpacity: 0.1, // Sombra muy sutil
    shadowRadius: 12, // Radio de sombra ajustado
    elevation: 6, // Elevación ajustada
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2F4F4F', // Gris oscuro para un buen contraste
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6A5ACD', // Azul pizarra (SlateBlue) para el subtítulo
    letterSpacing: 1,
  },
  wave: {
    position: 'absolute',
    bottom: -20,
    width: '100%',
    height: 40,
    backgroundColor: '#E0FFFF', // Aguamarina muy claro (para que coincida con el fondo del contenedor)
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  formContainer: {
    width: '90%', // Ancho fijo para el formulario
    alignSelf: 'center', // Centra el formulario horizontalmente
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: '#FFFFFF', // Fondo blanco para el formulario
    borderRadius: 20, // Bordes redondeados para el formulario
    shadowColor: '#000', // Sombra más pronunciada
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25, // Sombra ligeramente más opaca
    shadowRadius: 25, // Radio de sombra más grande
    elevation: 12, // Elevación ajustada
    marginTop: -60, // Ajusta para superponer con el encabezado
    marginBottom: 20, // Añade un margen inferior para que no se pegue al fondo
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    color: '#636e72', // Mantener un color oscuro para la legibilidad
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    fontSize: 16,
    color: '#2d3436', // Mantener un color oscuro para el texto de entrada
    paddingVertical: 8,
  },
  inputUnderline: {
    height: 2,
    backgroundColor: '#B0C4DE', // Azul grisáceo claro para el subrayado
    marginTop: 5,
  },
  buttonRipple: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#4DB6AC', // Aguamarina medio (más llamativo para el efecto de onda)
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20, // Añadir padding para que el enlace no se pegue al borde inferior del formulario
  },
  registerText: {
    color: '#636e72', // Mantener un color oscuro para la legibilidad
    fontSize: 14,
  },
  registerHighlight: {
    color: '#4DB6AC', // Aguamarina medio (más llamativo para el enlace)
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: '#6c5ce7',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
