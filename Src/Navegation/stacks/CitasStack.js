import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarCitas from "../../../Screen/Citas/ListarCitas";
import DetalleCitas from "../../../Screen/Citas/DetalleCitas";
import EditarCitas from "../../../Screen/Citas/EditarCitas";

const Stack = createStackNavigator();

export default function CitasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarCitas"
                component={ListarCitas}
                options={{
                    title: "Citas",
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
                name= "DetalleCitas"
                component={DetalleCitas}
                options={{
                    title: "Detalle citas",
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
                name= "EditarCitas"
                component={EditarCitas}
                options={{
                    title: "Nuevo/Editar Citas",
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