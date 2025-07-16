import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import PantallaLogin from '../../Screen/Auth/Login';
import PantallaRegistro from '../../Screen/Auth/Registro'; 

// Crea el stack navigator
const Stack = createNativeStackNavigator();

// Componente principal AuthNavegacion
export default function AuthNavegacion() {
  return (
    <Stack.Navigator>
      {/* Pantalla para iniciar sesión */}
      <Stack.Screen
        name="Login" 
        component={PantallaLogin} // Componente que se renderiza
        options={{ title: 'Iniciar Sesión' }} 
      />
      {/* Pantalla para registro */}
      <Stack.Screen
        name="Registro" 
        component={PantallaRegistro} 
        options={{ title: 'Registro' }} 
      />
    </Stack.Navigator>
  );
}
