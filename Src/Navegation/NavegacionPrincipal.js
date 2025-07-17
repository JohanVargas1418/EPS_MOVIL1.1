import React from "react"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import InicioStacks from "./stacks/InicioStacks";
import Configuracion from "../../Screen/Configuracion/configuracion"; 
import CitasStack from "./stacks/CitasStacks"; 
import ConsultoriosStack from "./stacks/ConsultorioStacks";
import EspecialidadesStack from "./stacks/EspecialidadesStacks";
import HorarioMedicoStack from "./stacks/HorarioMedicoStacks"; 
import MedicoStack from "./stacks/MedicosStacks"; 
import PagosStack from "./stacks/PagosStacks";
import PasientesStack from "./stacks/PasientesStacks"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa las pantallas de perfil (asegúrate de que las rutas sean correctas)
import PantallaPerfil from "../../Screen/main/perfil"; // Tu pantalla de perfil actual
import EditarPerfil from "../../Screen/main/EditarPerfil"; // Asegúrate de tener esta ruta correcta

// Crea los navegadores
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- Nuevo: Stack Navigator para el Perfil ---
function PerfilStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PantallaPerfil" component={PantallaPerfil} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        </Stack.Navigator>
    );
}

// Componente de navegación de pestañas
function NavegacionNav() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#AFEEEE",
                tabBarInactiveTintColor: "#757575",
                tabBarStyle: { backgroundColor: "#fff" }, 
            }}
        >
            <Tab.Screen 
                name="Inicio"
                component={InicioStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} /> 
                    ),
                }}
            />
            
            {/* --- Modificado: La pestaña "Perfil" ahora usa el PerfilStackNavigator --- */}
            <Tab.Screen
                name="Perfil"
                component={PerfilStackNavigator} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={size} color={color} /> 
                    ),
                }}
            />
            
            <Tab.Screen
                name="Configuración"
                component={Configuracion}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} /> 
                    ),
                }}
            />
            {/* Puedes añadir más Tab.Screen para otros Stacks si los quieres en la barra de pestañas */}
        </Tab.Navigator>
    );
}

// Componente principal de navegación (que contiene el Tab Navigator y otros Stacks)
export default function NavegacionPrincipal() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}> 
            <Stack.Screen name="NavegacionNav" component={NavegacionNav} options={{ headerShown: false }} /> 
            <Stack.Screen name="Perfil" component={PantallaPerfil} options={{ title: "Mi Perfil" }} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ title: "Editar Perfil" }} />
            <Stack.Screen name="CitasStack" component={CitasStack} /> 
            <Stack.Screen name="ConsultoriosStack" component={ConsultoriosStack} /> 
            <Stack.Screen name="EspecialidadesStack" component={EspecialidadesStack} /> 
            <Stack.Screen name="HorarioMedicoStack" component={HorarioMedicoStack} /> 
            <Stack.Screen name="MedicoStack" component={MedicoStack} />
            <Stack.Screen name="PagosStack" component={PagosStack} />
            <Stack.Screen name="PasientesStack" component={PasientesStack} /> 
        </Stack.Navigator>
    );
}