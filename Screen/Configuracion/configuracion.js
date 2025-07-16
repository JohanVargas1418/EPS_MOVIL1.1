import React, { useState, useEffect } from "react";
import { View, Text, Switch, Alert, ActivityIndicator } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Configuración() {
    const [permisosNotificaciones, setPermisosNotificaciones] = useState(false);
    const [loading, setLoading] = useState(true); // Inicializa en true para mostrar el indicador de carga

    useEffect(() => {
        const checkPermisos = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            const preferencia = await AsyncStorage.getItem('notificaciones_activas');
            setPermisosNotificaciones(status === 'granted' && preferencia === 'true');
            setLoading(false); // Cambia a false después de verificar permisos
        };
        checkPermisos();
    }, []);

    const toggleSwitch = async (valor) => {
        if (valor) {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                await AsyncStorage.setItem('notificaciones_activas', 'true');
                setPermisosNotificaciones(true);
                Alert.alert("Notificaciones activadas", "Ahora recibirás notificaciones.");
            } else {
                await AsyncStorage.setItem('notificaciones_activas', 'false');
                setPermisosNotificaciones(false);
                Alert.alert("Permiso denegado", "No se pueden activar las notificaciones sin permiso.");
            }
        } else {
            await AsyncStorage.setItem('notificaciones_activas', 'false');
            setPermisosNotificaciones(false);
            Alert.alert("Desactivadas", "Si deseas desactivar completamente las notificaciones, debes hacerlo desde la configuración de tu dispositivo.");
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando configuración...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18, marginTop: 10 }}>
                Notificaciones: {permisosNotificaciones ? "Activadas" : "Desactivadas"}
            </Text>
            <Switch
                value={permisosNotificaciones}
                onValueChange={toggleSwitch}
            />
        </View>
    );
}
