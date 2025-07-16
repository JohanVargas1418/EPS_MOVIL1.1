import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function ConficStacks() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuracion</Text>
            <Text style={styles.subtitle}>Aqui estara la configuracion de tu app</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
});

