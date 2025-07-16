import React from 'react';  // React
import { createStackNavigator } from '@react-navigation/stack';  
import ListarEspecialidades from '../../../Screen/Especialisaciones/ListarEspecialisaciones';  
import DetallesEspecialidades from '../../../Screen/Especialisaciones/DetallesEspecialisaciones';  
import EditarEspecialidades from '../../../Screen/Especialisaciones/EditarEspecializaciones';  

// Crea el stack navigator
const Stack = createStackNavigator();

// Componente principal EspecialidadesStack
export default function EspecialidadesStack() {
    return (
        <Stack.Navigator>
            
            <Stack.Screen 
                name='listarEspecialidad' 
                component={ListarEspecialidades} 
                options={{ title: "Especializaciones" }}  
            />
            
            <Stack.Screen 
                name='editarEspecialidad' 
                component={EditarEspecialidades} 
                options={{ title: "Nuevo/Editar Especializaciones" }} 
            />
            
            <Stack.Screen 
                name='detallesEspecialidades'  
                component={DetallesEspecialidades} 
                options={{ title: "Detalles Especializaciones" }}  
            />
        </Stack.Navigator>
    );
}
