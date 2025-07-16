import React from 'react';  // React
import { createStackNavigator } from '@react-navigation/stack';  

import ListarHorarioMedico from '../../../Screen/HorarioMedico/ListarHorarioMedico';
import DetalleHorarioMedico from '../../../Screen/HorarioMedico/DetallesHorarioMedico';  
import EditarHorarioMedico from '../../../Screen/HorarioMedico/EditarHorarioMedico';  

// Crea el stack navigator
const Stack = createStackNavigator();

// Componente principal HorarioMedicoStack
export default function HorarioMedicoStack() {
    return (
        <Stack.Navigator>
            
            <Stack.Screen 
                name='listarHoraMedico' 
                component={ListarHorarioMedico} 
                options={{ title: "Horario de los Médicos" }}  
            />
            
            <Stack.Screen 
                name='editarHoraMedico' 
                component={EditarHorarioMedico} 
                options={{ title: "Nuevo/Editar Horario de los Médicos" }}  
            />
            
            <Stack.Screen 
                name='DetalleHorarioMedico'  
                component={DetalleHorarioMedico} 
                options={{ title: "Detalles Horario de los Médicos" }}  
            />
        </Stack.Navigator>
    );
}
