import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useDataContext } from '../DataContext';

function generateId() {
  return Date.now().toString();
}

type AddDoctorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddDoctor'>;

interface Props {
  navigation: AddDoctorScreenNavigationProp;
}

export default function AddDoctorScreen({ navigation }: Props) {
  const [form, setForm] = useState({
    name: '',
    specialization: '',
    experience: '',
    rating: '',
    image: '',
  });
  const { addDoctor } = useDataContext();

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.specialization) {
      Alert.alert('Error', 'Name and Specialization are required');
      return;
    }
    addDoctor({
      id: generateId(),
      name: form.name,
      specialization: form.specialization,
      experience: form.experience || '1 year',
      rating: form.rating ? parseFloat(form.rating) : 4.5,
      availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
      image: form.image || '👨‍⚕️',
    });
    Alert.alert('Success', 'Doctor added!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Name *</Text>
        <TextInput style={styles.input} value={form.name} onChangeText={v => handleChange('name', v)} placeholder="Doctor Name" />
        <Text style={styles.label}>Specialization *</Text>
        <TextInput style={styles.input} value={form.specialization} onChangeText={v => handleChange('specialization', v)} placeholder="Specialization" />
        <Text style={styles.label}>Experience (years)</Text>
        <TextInput style={styles.input} value={form.experience} onChangeText={v => handleChange('experience', v)} placeholder="e.g. 10" keyboardType="numeric" />
        <Text style={styles.label}>Rating</Text>
        <TextInput style={styles.input} value={form.rating} onChangeText={v => handleChange('rating', v)} placeholder="e.g. 4.8" keyboardType="decimal-pad" />
        <Text style={styles.label}>Image (emoji)</Text>
        <TextInput style={styles.input} value={form.image} onChangeText={v => handleChange('image', v)} placeholder="e.g. 👨‍⚕️" />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Doctor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  form: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginTop: 40 },
  label: { fontSize: 14, fontWeight: '600', color: '#2c3e50', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#e9ecef', borderRadius: 8, padding: 10, marginTop: 4 },
  button: { backgroundColor: '#4A90E2', marginTop: 24, padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 