import React from 'react';  
import { createStackNavigator } from '@react-navigation/stack';  

// Importación de las pantallas
import ListarPagos from '../../../Screen/Pagos/ListarPagos';  
import DetallePagos from '../../../Screen/Pagos/DetallesPagos';  
import EditarPagos from '../../../Screen/Pagos/EditarPagos';  

// Crea el stack navigator
const Stack = createStackNavigator();

// Componente principal PagosStack
export default function PagosStack() {
    return (
        <Stack.Navigator>
            {/* Pantalla para listar pagos */}
            <Stack.Screen 
                name='listarPagos' 
                component={ListarPagos} 
                options={{ title: "Pagos" }}  
            />
            {/* Pantalla para editar o crear pagos */}
            <Stack.Screen 
                name='editarPagos' 
                component={EditarPagos} 
                options={{ title: "Nuevo/Editar Pagos" }} 
            />
            {/* Pantalla para mostrar detalles de un pago */}
            <Stack.Screen 
                name='DetallePagos'  
                component={DetallePagos} 
                options={{ title: "Detalles Pagos" }}
            />
        </Stack.Navigator>
    );
}
