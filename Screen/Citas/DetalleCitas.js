import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const citasEjemplo = [
  {
    id: '1',
    fecha: '15/05/2023',
    hora: '10:00',
    medico: 'Dr. García',
    especialidad: 'Cardiología',
    descripcion: 'Consulta de seguimiento postoperatorio'
  },
  {
    id: '2',
    fecha: '20/05/2023',
    hora: '14:30',
    medico: 'Dra. López',
    especialidad: 'Dermatología',
    descripcion: 'Revisión de tratamiento para acné'
  }
];

const DetalleCitas = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Citas</Text>
      
      <FlatList
        data={citasEjemplo}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.citaContainer}>
            <View style={styles.fechaHoraContainer}>
              <Text style={styles.fecha}>{item.fecha}</Text>
              <Text style={styles.hora}>{item.hora}</Text>
            </View>
            
            <View style={styles.infoContainer}>
              <Text style={styles.medico}>{item.medico}</Text>
              <Text style={styles.especialidad}>{item.especialidad}</Text>
              
              <View style={styles.descripcionContainer}>
                <Text style={styles.descripcion}>{item.descripcion}</Text>
              </View>
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
    padding: 20,
    backgroundColor: '#d3e8e7'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  citaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  fechaHoraContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  fecha: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5
  },
  hora: {
    color: '#666',
    fontSize: 14
  },
  infoContainer: {
    flex: 1
  },
  medico: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 2
  },
  especialidad: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8
  },
  descripcionContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 8
  },
  descripcion: {
    fontSize: 14,
    color: '#555'
  }
});

export default DetalleCitas;
