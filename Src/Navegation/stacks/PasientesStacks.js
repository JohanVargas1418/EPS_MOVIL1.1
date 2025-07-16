import React from 'react';  // React
import { createStackNavigator } from '@react-navigation/stack'; 

import ListarPasientes from '../../../Screen/Pasientes/ListarPasientes';  
import DetallePasientes from '../../../Screen/Pasientes/DetallesPasientes';  
import EditarPasientes from '../../../Screen/Pasientes/EditarPasientes'; 

// Crea el stack navigator
const Stack = createStackNavigator();

// Componente principal PasientesStack
export default function PasientesStack() { 
    return (
        <Stack.Navigator>
            {/* Pantalla para listar pacientes */}
            <Stack.Screen 
                name='listarPasientes' 
                component={ListarPasientes} 
                options={{ title: "Pasientes" }} 
            />
            {/* Pantalla para editar o crear pacientes */}
            <Stack.Screen 
                name='editarPasientes' 
                component={EditarPasientes} 
                options={{ title: "Nuevo/Editar Pasientes" }} 
            />
            {/* Pantalla para mostrar detalles de un paciente */}
            <Stack.Screen 
                name='DetallePasientes' 
                component={DetallePasientes} 
                options={{ title: "Detalles Pasientes" }} 
            />
        </Stack.Navigator>
    );
}
