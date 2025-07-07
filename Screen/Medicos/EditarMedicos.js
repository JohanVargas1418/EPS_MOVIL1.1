import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';

const EditarMedicos = ({ route, navigation }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [horario, setHorario] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  const [especialidades] = useState([
    'Cardiología',
    'Pediatría',
    'Dermatología',
    'Neurología',
    'Ortopedia'
  ]);

  useEffect(() => {
    if (route.params?.medico) {
      const medico = route.params.medico;
      setId(medico.id);
      setNombre(medico.nombre);
      setEspecialidad(medico.especialidad);
      setCedula(medico.cedula);
      setTelefono(medico.telefono);
      setCorreo(medico.correo);
      setHorario(medico.horario);
      setModoEdicion(true);
    }
  }, [route.params?.medico]);

  const validarFormulario = () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre del médico es requerido');
      return false;
    }
    if (!especialidad.trim()) {
      Alert.alert('Error', 'La especialidad es requerida');
      return false;
    }
    if (!cedula.trim()) {
      Alert.alert('Error', 'El número de cédula es requerido');
      return false;
    }
    return true;
  };

  const handleGuardar = () => {
    if (!validarFormulario()) return;

    const medico = {
      id: modoEdicion ? id : Date.now().toString(),
      nombre: nombre.trim(),
      especialidad: especialidad.trim(),
      cedula: cedula.trim(),
      telefono: telefono.trim(),
      correo: correo.trim(),
      horario: horario.trim(),
      imagen: `https://placehold.co/200x200?text=${nombre.trim().charAt(0)}`
    };

    console.log('Médico guardado:', medico);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>
        {modoEdicion ? 'Editar Médico' : 'Nuevo Médico'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo*"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Especialidad*"
        value={especialidad}
        onChangeText={setEspecialidad}
      />

      <TextInput
        style={styles.input}
        placeholder="Número de cédula*"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Horario de atención"
        value={horario}
        onChangeText={setHorario}
      />

      <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
        <Text style={styles.textoBoton}>
          {modoEdicion ? 'Actualizar Médico' : 'Registrar Médico'}
        </Text>
      </TouchableOpacity>

      {modoEdicion && (
        <TouchableOpacity 
          style={styles.botonEliminar} 
          onPress={() => {
            Alert.alert(
              'Confirmar',
              '¿Estás seguro de eliminar este médico?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => {
                  console.log('Médico eliminado ID:', id);
                  navigation.goBack();
                }}
              ]
            );
          }}
        >
          <Text style={styles.textoBoton}>Eliminar Médico</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#2c3e50',
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16
  },
  botonGuardar: {
    backgroundColor: '#6de2b4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15
  },
  botonEliminar: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default EditarMedicos;
