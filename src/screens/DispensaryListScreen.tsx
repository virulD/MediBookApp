import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Dispensary } from '../models/dispensary';
import { useDataContext } from '../DataContext';

type DispensaryListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DispensaryList'>;

interface Props {
  navigation: DispensaryListScreenNavigationProp;
}

export default function DispensaryListScreen({ navigation }: Props) {
  const { dispensaries } = useDataContext();

  const renderDispensary = ({ item }: { item: Dispensary }) => (
    <View style={styles.dispensaryCard}>
      <View style={styles.dispensaryHeader}>
        <View style={styles.dispensaryImage}>
          <Text style={styles.dispensaryEmoji}>{item.image}</Text>
        </View>
        <View style={styles.dispensaryInfo}>
          <Text style={styles.dispensaryName}>{item.name}</Text>
          <Text style={styles.dispensaryAddress}>{item.address}</Text>
          <View style={styles.dispensaryMeta}>
            <Text style={styles.distance}>📍 {item.distance}</Text>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, item.isOpen ? styles.open : styles.closed]} />
            <Text style={[styles.statusText, item.isOpen ? styles.openText : styles.closedText]}>
              {item.isOpen ? 'Open' : 'Closed'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        <Text style={styles.servicesTitle}>Services:</Text>
        <View style={styles.servicesList}>
          {item.services.map((service: string, index: number) => (
            <Text key={index} style={styles.service}>{service}</Text>
          ))}
        </View>
      </View>

      <View style={styles.contactContainer}>
        <Text style={styles.phone}>{item.phone}</Text>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => navigation.navigate('AppointmentBooking', { dispensaryId: item.id })}
        >
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Dispensaries</Text>
        <Text style={styles.headerSubtitle}>
          Find pharmacies and medical dispensaries in your area
        </Text>
      </View>

      <FlatList
        data={dispensaries}
        renderItem={renderDispensary}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  listContainer: {
    padding: 16,
  },
  dispensaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dispensaryHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dispensaryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dispensaryEmoji: {
    fontSize: 30,
  },
  dispensaryInfo: {
    flex: 1,
  },
  dispensaryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  dispensaryAddress: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  dispensaryMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  distance: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight: '600',
  },
  rating: {
    fontSize: 12,
    color: '#f39c12',
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  open: {
    backgroundColor: '#27ae60',
  },
  closed: {
    backgroundColor: '#e74c3c',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  openText: {
    color: '#27ae60',
  },
  closedText: {
    color: '#e74c3c',
  },
  servicesContainer: {
    marginBottom: 16,
  },
  servicesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  service: {
    fontSize: 11,
    color: '#4A90E2',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phone: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  contactButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
