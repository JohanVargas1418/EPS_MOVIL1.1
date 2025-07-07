import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'; // Importa ScrollView desde react-native

const DetalleMedicos = ({ route }) => {
  const { medico } = route.params || {};
  
  const datosEjemplo = {
    id: '1',
    nombre: 'Dr. Juan Pérez',
    especialidad: 'Cardiología',
    cedula: '12345678',
    telefono: '555-1234',
    correo: 'juan.perez@example.com',
    horario: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
    imagen: 'https://placehold.co/300x300?text=Dr.+Pérez',
    descripcion: 'Cardiólogo con 10 años de experiencia en intervenciones coronarias y manejo de arritmias.'
  };

  const datos = medico || datosEjemplo;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Encabezado con imagen */}
        <View style={styles.header}>
          <Image 
            source={{ uri: datos.imagen }} 
            style={styles.foto}
            resizeMode="cover"
            onError={() => console.log("Error cargando imagen")}
          />
          <Text style={styles.nombre}>{datos.nombre}</Text>
          <Text style={styles.especialidad}>{datos.especialidad}</Text>
        </View>

        {/* Información profesional */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Información Profesional</Text>
          <View style={styles.item}>
            <Text style={styles.label}>Cédula profesional:</Text>
            <Text style={styles.valor}>{datos.cedula}</Text>
          </View>
          
          {datos.descripcion && (
            <View style={styles.item}>
              <Text style={styles.label}>Descripción:</Text>
              <Text style={[styles.valor, styles.descripcion]}>{datos.descripcion}</Text>
            </View>
          )}
        </View>

        {/* Datos de contacto */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Contacto</Text>
          <View style={styles.item}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.valor}>{datos.telefono}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Correo:</Text>
            <Text style={[styles.valor, styles.correo]}>{datos.correo}</Text>
          </View>
        </View>

        {/* Horario */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Horario de atención</Text>
          <Text style={styles.horario}>{datos.horario}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3e8e7'
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginBottom: 25
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#e9ecef'
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center'
  },
  especialidad: {
    fontSize: 18,
    color: '#4285F4',
    textAlign: 'center',
    marginTop: 5
  },
  seccion: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  item: {
    marginBottom: 12
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3
  },
  valor: {
    fontSize: 16,
    color: '#2c3e50'
  },
  descripcion: {
    lineHeight: 22,
    textAlign: 'justify'
  },
  correo: {
    color: '#4285F4'
  },
  horario: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24
  }
});

export default DetalleMedicos;
