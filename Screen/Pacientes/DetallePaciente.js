import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DetallePaciente = ({ route }) => {
  const { paciente } = route.params || {};

  const datosEjemplo = {
    id: '1',
    nombre: 'Ana',
    apellido: 'Martínez',
    edad: '32 años',
    fechaNacimiento: '15/05/1990',
    genero: 'Femenino',
    telefono: '555-7890',
    correo: 'ana.martinez@example.com',
    direccion: 'Av. Principal 456, Ciudad',
    alergias: 'Ninguna conocida',
    historial: '1 cirugía de apéndice (2015)',
    imagen: 'https://placehold.co/300x300?text=Ana+Martínez'
  };

  const datos = paciente || datosEjemplo;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header con foto y nombre */}
      <View style={styles.header}>
        <Image 
          source={{ uri: datos.imagen }}
          style={styles.fotoPerfil}
          onError={() => console.log("Error cargando imagen")}
        />
        <Text style={styles.nombreCompleto}>{`${datos.nombre} ${datos.apellido}`}</Text>
        <Text style={styles.infoBasica}>
          {datos.edad || calcularEdad(datos.fechaNacimiento)} • {datos.genero}
        </Text>
      </View>

      {/* Sección de información de contacto */}
      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>Información de contacto</Text>
        
        <View style={styles.item}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.valor}>{datos.telefono}</Text>
        </View>
        
        <View style={styles.item}>
          <Text style={styles.label}>Correo electrónico:</Text>
          <Text style={[styles.valor, styles.link]}>{datos.correo}</Text>
        </View>
        
        <View style={styles.item}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.valor}>{datos.direccion}</Text>
        </View>
      </View>

      {/* Sección médica */}
      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>Información médica</Text>
        
        <View style={styles.item}>
          <Text style={styles.label}>Alergias conocidas:</Text>
          <Text style={styles.valor}>{datos.alergias}</Text>
        </View>
        
        {datos.historial && (
          <View style={styles.item}>
            <Text style={styles.label}>Historial médico:</Text>
            <Text style={styles.valor}>{datos.historial}</Text>
          </View>
        )}
      </View>

      {/* Sección adicional para citas recientes podría ir aquí */}
    </ScrollView>
  );
};

// Función para calcular edad si tenemos fecha de nacimiento
function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return '';
  
  const fechaNac = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const m = hoy.getMonth() - fechaNac.getMonth();
  
  if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }
  
  return `${edad} años`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3e8e7'
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginBottom: 25
  },
  fotoPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#e9ecef'
  },
  nombreCompleto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center'
  },
  infoBasica: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
    textAlign: 'center'
  },
  seccion: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    paddingBottom: 8
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
    color: '#2c3e50',
    lineHeight: 22
  },
  link: {
    color: '#4285F4'
  }
});

export default DetallePaciente;
