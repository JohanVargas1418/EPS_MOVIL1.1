import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditarPaciente = ({ route, navigation }) => {
  // Estados del formulario
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [genero, setGenero] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [alergias, setAlergias] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  // Cargar datos si estamos editando
  useEffect(() => {
    if (route.params?.paciente) {
      const paciente = route.params.paciente;
      setId(paciente.id);
      setNombre(paciente.nombre);
      setApellido(paciente.apellido);
      setFechaNacimiento(new Date(paciente.fechaNacimiento));
      setGenero(paciente.genero);
      setTelefono(paciente.telefono);
      setCorreo(paciente.correo);
      setDireccion(paciente.direccion);
      setAlergias(paciente.alergias);
      setModoEdicion(true);
    }
  }, [route.params?.paciente]);

  const handleFechaChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFechaNacimiento(selectedDate);
    }
  };

  const validarFormulario = () => {
    if (!nombre.trim() || !apellido.trim()) {
      Alert.alert('Error', 'Nombre y apellido son requeridos');
      return false;
    }
    if (!telefono.trim()) {
      Alert.alert('Error', 'El teléfono es requerido');
      return false;
    }
    return true;
  };

  const handleGuardar = () => {
    if (!validarFormulario()) return;

    const paciente = {
      id: modoEdicion ? id : Date.now().toString(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      fechaNacimiento: fechaNacimiento.toISOString(),
      genero: genero.trim(),
      telefono: telefono.trim(),
      correo: correo.trim(),
      direccion: direccion.trim(),
      alergias: alergias.trim(),
      imagen: `https://placehold.co/200x200?text=${nombre.trim().charAt(0)}${apellido.trim().charAt(0)}`
    };

    console.log('Paciente guardado:', paciente);
    navigation.goBack();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.titulo}>
        {modoEdicion ? 'Editar Paciente' : 'Nuevo Paciente'}
      </Text>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="Nombre*"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Apellido*"
          value={apellido}
          onChangeText={setApellido}
        />
      </View>

      <TouchableOpacity 
        style={styles.input} 
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {formatDate(fechaNacimiento) || 'Fecha de nacimiento'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={fechaNacimiento}
          mode="date"
          display="default"
          onChange={handleFechaChange}
          maximumDate={new Date()}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Género"
        value={genero}
        onChangeText={setGenero}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono*"
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
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Alergias conocidas"
        value={alergias}
        onChangeText={setAlergias}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
        <Text style={styles.textoBoton}>
          {modoEdicion ? 'Actualizar Paciente' : 'Registrar Paciente'}
        </Text>
      </TouchableOpacity>

      {modoEdicion && (
        <TouchableOpacity 
          style={styles.botonEliminar} 
          onPress={() => {
            Alert.alert(
              'Confirmar',
              '¿Estás seguro de eliminar este paciente?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => {
                  console.log('Paciente eliminado ID:', id);
                  navigation.goBack();
                }}
              ]
            );
          }}
        >
          <Text style={styles.textoBoton}>Eliminar Paciente</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#2c3e50',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15
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
  dateText: {
    fontSize: 16,
    color: '#2c3e50'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
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

export default EditarPaciente;
