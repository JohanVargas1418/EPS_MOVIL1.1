import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import InicioStack from "./stacks/InicioStack";
import PerfilesStack from "./stacks/PerfilStack";
import ConfiguracionesStack from "./stacks/ConfiguracionStack";

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1da294',
          borderTopWidth: 1,
          borderTopColor: '#3d481d',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#000701",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Inicio',
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          tabBarLabel: 'Perfil',
        }}
      />

      <Tab.Screen
        name="Configuración"
        component={ConfiguracionesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Configuración',
        }}
      />
    </Tab.Navigator>
  );
}