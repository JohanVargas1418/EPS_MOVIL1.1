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
            
            <Stack.Screen 
                name='listarPasientes' 
                component={ListarPasientes} 
                options={{ title: "Pasientes" }} 
            />
            
            <Stack.Screen 
                name='editarPasientes' 
                component={EditarPasientes} 
                options={{ title: "Nuevo/Editar Pasientes" }} 
            />
            
            <Stack.Screen 
                name='DetallePasientes' 
                component={DetallePasientes} 
                options={{ title: "Detalles Pasientes" }} 
            />
        </Stack.Navigator>
    );
}
