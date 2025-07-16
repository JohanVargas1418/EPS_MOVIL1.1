import React from "react"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import InicioStacks from "./stacks/InicioStacks";
import Configuración from "../../Screen/Configuracion/configuracion"; 
import CitasStack from "./stacks/CitasStacks"; 
import ConsultoriosStack from "./stacks/ConsultorioStacks";
import EspecialidadesStack from "./stacks/EspecialidadesStacks";
import HorarioMedicoStack from "./stacks/HorarioMedicoStacks"; 
import MedicoStack from "./stacks/MedicosStacks"; 
import PagosStack from "./stacks/PagosStacks";
import PasientesStack from "./stacks/PasientesStacks"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Perfil from "../../Screen/main/perfil"; 

// Crea el tab navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
            {/* Pantalla de inicio */}
            <Tab.Screen 
                name="Inicio"
                component={InicioStacks}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} /> 
                    ),
                }}
            />
            {/* Pantalla de perfil */}
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={size} color={color} /> 
                    ),
                }}
            />
            {/* Pantalla de configuración */}
            <Tab.Screen
                name="Configuración"
                component={Configuración}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} /> 
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

// Componente principal de navegación
export default function NavegacionPrincipal() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}> 
            <Stack.Screen name="NavegacionNav" component={NavegacionNav} /> 
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
