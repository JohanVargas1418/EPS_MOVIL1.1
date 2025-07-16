import React from 'react';  // React
import { createStackNavigator } from '@react-navigation/stack';  

import listarConsultorios from '../../../Screen/Consultorios/ListarConsultorios';  
import EditarConsultorios from '../../../Screen/Consultorios/EditarConsultorios';  
import DetalleConsultorios from '../../../Screen/Consultorios/DetallesConsultorio';  

// Crea el stack navigator
const Stack = createStackNavigator();

// Componente principal ConsultoriosStack
export default function ConsultoriosStack() {
    return (
        <Stack.Navigator>
            {/* Pantalla para listar consultorios */}
            <Stack.Screen 
                name='listarConsultorios' 
                component={listarConsultorios} 
                options={{ title: "Consultorios" }}  
            />
            {/* Pantalla para editar o crear consultorios */}
            <Stack.Screen 
                name='editarConsultorios' 
                component={EditarConsultorios} 
                options={{ title: "Nuevo/Editar Consultorios" }}  
            />
            {/* Pantalla para mostrar detalles de un consultorio */}
            <Stack.Screen 
                name='detalleConsultorios'  
                component={DetalleConsultorios} 
                options={{ title: "Detalles Consultorios" }}  
            />
        </Stack.Navigator>
    );
}
