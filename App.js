// import { View } from "react-native-reanimated/lib/typescript/Animated";
import React, { useEffect } from 'react';
import AppNavegacion from "./Src/Navegation/AppNavegacion";
import * as Notification from 'expo-notifications';
import { Button,View } from 'react-native';

export default function App() {

  useEffect(() => {
    Notification.setNotificationHandler({
      // Como manejar las notificaciones cuando la app esta avierta 
      handleNotification: async () => ({
        shouldShowAlert: true, // Muestra una alerta al recibir una notificación
        shouldPlaySound: true, // Reproduce un sonido al recibir una notificación
        shouldSetBadge: true, // Establece el badge al recibir una notificación
      }),
    });

    const getPermissions = async () => {
      const { status } = await Notification.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso de notificaciones no concedido');
      }
    };
    getPermissions(); // Solicita permisos para notificaciones al iniciar la app
    enviarNotificacionLocal(); // Enviar una notificación local de prueba al iniciar la app
  }, []);

  const enviarNotificacionLocal = async () => {
    await Notification.scheduleNotificationAsync({
      content: {
        title: "Notificación Local",
        body: "Esta es una notificación local de prueba.",
      },
      trigger: null, // Dispara inmediatamente
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <AppNavegacion />
      {/* Botón para enviar una notificación local */}
      <Button title="Enviar Notificación Local" onPress={enviarNotificacionLocal}
      />
    </View>

  );
}

