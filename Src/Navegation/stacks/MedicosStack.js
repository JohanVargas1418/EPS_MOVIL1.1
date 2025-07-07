import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarMedicos from "../../../Screen/Medicos/ListarMedicos";
import DetalleMedicos from "../../../Screen/Medicos/DetalleMedicos";
import EditarMedicos from "../../../Screen/Medicos/EditarMedicos";

const Stack = createStackNavigator();

export default function MedicosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarMedicos"
                component={ListarMedicos}
                options={{
                    title: "Medicos",
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
                name= "DetalleMedicos"
                component={DetalleMedicos}
                options={{
                    title: "Detalle Medicos",
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
                name= "EditarMedicos"
                component={EditarMedicos}
                options={{
                    title: "Nuevo/Editar Medicos",
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