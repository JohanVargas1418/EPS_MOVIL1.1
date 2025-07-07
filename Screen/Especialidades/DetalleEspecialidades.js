import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const especialidadesEjemplo = [
  {
    id: '1',
    nombre: 'Cardiología',
    descripcion: 'Especialidad médica que estudia el corazón y el sistema cardiovascular',
    doctores: ['Dr. García', 'Dr. Martínez'],
  },
  {
    id: '2',
    nombre: 'Dermatología',
    descripcion: 'Especialidad médica enfocada en el cuidado de la piel y sus enfermedades',
    doctores: ['Dra. López', 'Dra. Rodríguez'],
  },
  {
    id: '3',
    nombre: 'Pediatría',
    descripcion: 'Especialidad médica dedicada a la salud de niños y adolescentes',
    doctores: ['Dr. Pérez', 'Dra. Gómez'],
  }
];

const DetalleEspecialidades = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuestras Especialidades</Text>
      
      <FlatList
        data={especialidadesEjemplo}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.especialidadContainer}>
            <View style={styles.imagenContainer}>
              <Text style={styles.imagenTexto}>{item.nombre}</Text>
            </View>
            
            <View style={styles.detalleContainer}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.descripcion}>{item.descripcion}</Text>
              
              <Text style={styles.subtitulo}>Doctores:</Text>
              {item.doctores.map((doctor, index) => (
                <Text key={index} style={styles.doctor}>{doctor}</Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#d3e8e7'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center'
  },
  especialidadContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  imagenContainer: {
    height: 150,
    backgroundColor: '#e1e4e8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagenTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  detalleContainer: {
    padding: 15
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8
  },
  descripcion: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
    lineHeight: 20
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5
  },
  doctor: {
    fontSize: 14,
    color: '#3498db',
    marginBottom: 3
  }
});

export default DetalleEspecialidades;
