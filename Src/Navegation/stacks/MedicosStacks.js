import React from 'react';  
import { createStackNavigator } from '@react-navigation/stack';  

import ListarMedicos from '../../../Screen/Medicos/ListarMedicos';  
import DetalleMedicos from '../../../Screen/Medicos/DetallesMedicos';  
import EditarMedicos from '../../../Screen/Medicos/EditarMedicos'; 

// Crea el stack navigator
const Stack = createStackNavigator();

// Componente principal MedicoStack
export default function MedicoStack() {
    return (
        <Stack.Navigator>
            {/* Pantalla para listar médicos */}
            <Stack.Screen 
                name='listarMedicos' 
                component={ListarMedicos} 
                options={{ title: "Médicos" }}  
            />
            {/* Pantalla para editar o crear médicos */}
            <Stack.Screen 
                name='editarMedicos' 
                component={EditarMedicos} 
                options={{ title: "Nuevo/Editar Médicos" }} 
            />
            {/* Pantalla para mostrar detalles de un médico */}
            <Stack.Screen 
                name='DetalleMedicos'  
                component={DetalleMedicos} 
                options={{ title: "Detalles Médicos" }}  
            />
        </Stack.Navigator>
    );
}
