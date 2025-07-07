// src/stacks/InicioStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importa la pantalla de Inicio (el "dashboard" con las 4 casillas)
import Inicio from "../../../Screen/Inicio/Inicio";

// Importa los stacks secundarios que quieres anidar
import CitasStack from "./CitasStack";
import EspecialidadesStack from "./EspecialidadesStack";
import MedicosStack from "./MedicosStack";
import PacienteStack from "./PacienteStack";

const Stack = createStackNavigator();

export default function InicioStack () {
    return (
        <Stack.Navigator>
            {/* 1. La pantalla principal de tu pestaña "Inicio" */}
            <Stack.Screen
                name="InicioPantalla" // Este es el nombre que usarás si necesitas navegar directamente a esta pantalla
                component={Inicio}
                options={{ headerShown: false }} // Oculta el encabezado en esta pantalla específica
            />

            {/* 2. Anidación de los Stacks completos */}
            {/* Es crucial que los 'name' aquí coincidan con lo que pasas a navigation.navigate() en Inicio.js */}
            <Stack.Screen
                name="CitasFlow" // Nombre consistente con la navegación en Inicio.js
                component={CitasStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="EspecialidadesFlow" // Nombre consistente con la navegación en Inicio.js
                component={EspecialidadesStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="MedicosFlow" // Nombre consistente con la navegación en Inicio.js
                component={MedicosStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PacienteFlow" // Este ya estaba correcto
                component={PacienteStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}