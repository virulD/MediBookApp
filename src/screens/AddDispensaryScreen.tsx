import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useDataContext } from '../DataContext';

function generateId() {
  return Date.now().toString();
}

type AddDispensaryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddDispensary'>;

interface Props {
  navigation: AddDispensaryScreenNavigationProp;
}

export default function AddDispensaryScreen({ navigation }: Props) {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    services: '',
    image: '',
  });
  const { addDispensary } = useDataContext();

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.address) {
      Alert.alert('Error', 'Name and Address are required');
      return;
    }
    addDispensary({
      id: generateId(),
      name: form.name,
      address: form.address,
      distance: '0.1 km',
      rating: 4.5,
      isOpen: true,
      phone: form.phone || '',
      services: form.services ? form.services.split(',').map(s => s.trim()) : ['Prescription'],
      image: form.image || '🏥',
    });
    Alert.alert('Success', 'Dispensary added!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Name *</Text>
        <TextInput style={styles.input} value={form.name} onChangeText={v => handleChange('name', v)} placeholder="Dispensary Name" />
        <Text style={styles.label}>Address *</Text>
        <TextInput style={styles.input} value={form.address} onChangeText={v => handleChange('address', v)} placeholder="Address" />
        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} value={form.phone} onChangeText={v => handleChange('phone', v)} placeholder="Phone Number" keyboardType="phone-pad" />
        <Text style={styles.label}>Services (comma separated)</Text>
        <TextInput style={styles.input} value={form.services} onChangeText={v => handleChange('services', v)} placeholder="e.g. Prescription, Vaccines" />
        <Text style={styles.label}>Image (emoji)</Text>
        <TextInput style={styles.input} value={form.image} onChangeText={v => handleChange('image', v)} placeholder="e.g. 🏥" />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Dispensary</Text>
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