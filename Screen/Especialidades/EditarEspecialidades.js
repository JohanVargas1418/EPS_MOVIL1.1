import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const EditarEspecialidades = ({ route, navigation }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [doctores, setDoctores] = useState('');
  const [imagen, setImagen] = useState('');

  React.useEffect(() => {
    if (route.params?.especialidad) {
      setModoEdicion(true);
      const { id, nombre, descripcion, doctores, imagen } = route.params.especialidad;
      setId(id);
      setNombre(nombre);
      setDescripcion(descripcion);
      setDoctores(doctores.join(', '));
      setImagen(imagen);
    }
  }, [route.params?.especialidad]);

  const handleGuardar = () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre de la especialidad es requerido');
      return;
    }

    const listaDoctores = doctores.split(',').map(d => d.trim()).filter(d => d);

    const especialidad = {
      id: modoEdicion ? id : Date.now().toString(),
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      doctores: listaDoctores,
      imagen: imagen.trim() || `https://placehold.co/600x400?text=${nombre.trim()}`
    };

    console.log('Especialidad guardada:', especialidad);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {modoEdicion ? 'Editar Especialidad' : 'Nueva Especialidad'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la especialidad*"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción"
        multiline
        numberOfLines={4}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TextInput
        style={styles.input}
        placeholder="Doctores (separados por comas)"
        value={doctores}
        onChangeText={setDoctores}
      />

      <TextInput
        style={styles.input}
        placeholder="URL de imagen (opcional)"
        value={imagen}
        onChangeText={setImagen}
      />

      <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
        <Text style={styles.textoBoton}>
          {modoEdicion ? 'Actualizar' : 'Guardar'}
        </Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 20,
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
  textArea: {
    height: 120,
    textAlignVertical: 'top'
  },
  botonGuardar: {
    backgroundColor: '#6de2b4',
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

export default EditarEspecialidades;
