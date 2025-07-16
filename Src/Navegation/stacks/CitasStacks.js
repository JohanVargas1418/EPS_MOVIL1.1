import React from 'react';  // React
import { createStackNavigator } from '@react-navigation/stack';  
import { createNativeStackNavigator } from "@react-navigation/native-stack";  

// Importación de las pantallas
import ListarCitas from '../../../Screen/Citas/ListarCitas'; 
import DetalleCitas from '../../../Screen/Citas/DetalleCitas';  
import EditarCitas from '../../../Screen/Citas/EditarCitas';

// Crea el stack navigator
const Stack = createNativeStackNavigator();

// Componente principal CitasStack
export default function CitasStack() {
    return (
        <Stack.Navigator>
            {/* Pantalla para listar citas */}
            <Stack.Screen 
                name="listarCitas" 
                component={ListarCitas} 
                options={{ title: "Citas" }} 
            />
            {/* Pantalla para editar o crear citas */}
            <Stack.Screen 
                name="editarCitas" 
                component={EditarCitas} 
                options={{ title: "Nuevo/Editar Citas" }} 
            />
            {/* Pantalla para mostrar detalles de una cita */}
            <Stack.Screen 
                name="DetalleCitas"  
                component={DetalleCitas} 
                options={{ title: "Detalles Citas" }} 
            />
        </Stack.Navigator>
    );
}
