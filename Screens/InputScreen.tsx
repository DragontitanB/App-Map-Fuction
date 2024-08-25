import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Input: undefined;
  Map: {
    firstName: string;
    lastName: string;
    latitude: number;
    longitude: number;
  };
};

type InputScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Input'>;

type Props = {
  navigation: InputScreenNavigationProp;
};

const InputScreen: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handlePress = () => {
    navigation.navigate('Map', {
      firstName,
      lastName,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Nombre"
      />
      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Apellido"
      />
      <Text style={styles.label}>Latitud:</Text>
      <TextInput
        style={styles.input}
        value={latitude}
        onChangeText={setLatitude}
        placeholder="Latitud"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Longitud:</Text>
      <TextInput
        style={styles.input}
        value={longitude}
        onChangeText={setLongitude}
        placeholder="Longitud"
        keyboardType="numeric"
      />
      <Button title="Siguiente" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});

export default InputScreen;