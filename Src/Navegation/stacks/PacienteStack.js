import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarPaciente from "../../../Screen/Pacientes/ListarPaciente";
import DetallePaciente from "../../../Screen/Pacientes/DetallePaciente";
import EditarPaciente from "../../../Screen/Pacientes/EditarPaciente";

const Stack = createStackNavigator();

export default function PacienteStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarPaciente"
                component={ListarPaciente}
                options={{
                    title: "Paciente",
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
                name= "DetallePaciente"
                component={DetallePaciente}
                options={{
                    title: "Detalle Paciente",
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
                name= "EditarPaciente"
                component={EditarPaciente}
                options={{
                    title: "Nuevo/Editar Paciente",
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