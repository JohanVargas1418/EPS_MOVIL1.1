import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarEspecialidades from "../../../Screen/Especialidades/ListarEspecialidades";
import DetalleEspecialidades from "../../../Screen/Especialidades/DetalleEspecialidades";
import EditarEspecialidades from "../../../Screen/Especialidades/EditarEspecialidades";

const Stack = createStackNavigator();

export default function EspecialidadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarEspecialidades"
                component={ListarEspecialidades}
                options={{
                    title: "Especialidades",
                    headerStyle: { // <-- Estilo de encabezado para esta pantalla
                        backgroundColor: '#1da294', // Color azul
                    },
                    headerTintColor: '#fff', // Color blanco para el texto del título y el icono de retroceso
                    headerTitleStyle: {
                        fontWeight: 'bold', // Título en negrita
                    },
                }}
            />
            <Stack.Screen
                name= "DetalleEspecialidades"
                component={DetalleEspecialidades}
                options={{
                    title: "Detalle Especialidades",
                    headerStyle: { // <-- Estilo de encabezado para esta pantalla
                        backgroundColor: '#1da294', // Mismo color para consistencia
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name= "EditarEspecialidades"
                component={EditarEspecialidades}
                options={{
                    title: "Nuevo/Editar Especialidades",
                    headerStyle: { // <-- Estilo de encabezado para esta pantalla
                        backgroundColor: '#1da294', // Mismo color para consistencia
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
}