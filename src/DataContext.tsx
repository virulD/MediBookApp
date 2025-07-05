import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor } from './models/doctor';
import { Dispensary } from './models/dispensary';

interface DataContextType {
  doctors: Doctor[];
  dispensaries: Dispensary[];
  addDoctor: (doctor: Doctor) => void;
  addDispensary: (dispensary: Dispensary) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useDataContext must be used within a DataProvider');
  return ctx;
};

const initialDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: '15 years',
    rating: 4.8,
    availableSlots: ['09:00 AM', '10:00 AM', '02:00 PM'],
    image: '👩‍⚕️',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    experience: '12 years',
    rating: 4.9,
    availableSlots: ['11:00 AM', '03:00 PM', '04:00 PM'],
    image: '👨‍⚕️',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    experience: '8 years',
    rating: 4.7,
    availableSlots: ['09:30 AM', '01:00 PM', '03:30 PM'],
    image: '👩‍⚕️',
  },
  {
    id: '4',
    name: 'Dr. David Kim',
    specialization: 'Orthopedic Surgeon',
    experience: '20 years',
    rating: 4.9,
    availableSlots: ['10:30 AM', '02:30 PM', '05:00 PM'],
    image: '👨‍⚕️',
  },
];

const initialDispensaries: Dispensary[] = [
  {
    id: '1',
    name: 'MediCare Pharmacy',
    address: '123 Main Street, Downtown',
    distance: '0.5 km',
    rating: 4.6,
    isOpen: true,
    phone: '+1 (555) 123-4567',
    services: ['Prescription', 'Over-the-counter', 'Consultation'],
    image: '🏥',
  },
  {
    id: '2',
    name: 'HealthFirst Dispensary',
    address: '456 Oak Avenue, Westside',
    distance: '1.2 km',
    rating: 4.8,
    isOpen: true,
    phone: '+1 (555) 234-5678',
    services: ['Prescription', 'Vaccines', 'Health Screening'],
    image: '💊',
  },
  {
    id: '3',
    name: 'Community Pharmacy',
    address: '789 Pine Road, Eastside',
    distance: '2.1 km',
    rating: 4.4,
    isOpen: false,
    phone: '+1 (555) 345-6789',
    services: ['Prescription', 'Compounding', 'Delivery'],
    image: '🏪',
  },
  {
    id: '4',
    name: 'Express Meds',
    address: '321 Elm Street, Northside',
    distance: '3.0 km',
    rating: 4.7,
    isOpen: true,
    phone: '+1 (555) 456-7890',
    services: ['Prescription', '24/7 Service', 'Drive-thru'],
    image: '🚗',
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [dispensaries, setDispensaries] = useState<Dispensary[]>(initialDispensaries);

  const addDoctor = (doctor: Doctor) => setDoctors(prev => [...prev, doctor]);
  const addDispensary = (dispensary: Dispensary) => setDispensaries(prev => [...prev, dispensary]);

  return (
    <DataContext.Provider value={{ doctors, dispensaries, addDoctor, addDispensary }}>
      {children}
    </DataContext.Provider>
  );
} 