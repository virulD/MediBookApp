import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { DataProvider } from './DataContext';

// Import screens
import LandingScreen from './screens/LandingScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import DoctorListScreen from './screens/DoctorListScreen';
import DispensaryListScreen from './screens/DispensaryListScreen';
import AppointmentBookingScreen from './screens/AppointmentBookingScreen';
import AppointmentConfirmationScreen from './screens/AppointmentConfirmationScreen';
import AddDoctorScreen from './screens/AddDoctorScreen';
import AddDispensaryScreen from './screens/AddDispensaryScreen';

export type RootStackParamList = {
  Landing: undefined;
  AdminLogin: undefined;
  AdminDashboard: undefined;
  DoctorList: undefined;
  DispensaryList: undefined;
  AppointmentBooking: { doctorId?: string; dispensaryId?: string };
  AppointmentConfirmation: { appointmentId: string; date: string; time: string };
  AddDoctor: undefined;
  AddDispensary: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#4A90E2" />
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4A90E2',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Landing" 
            component={LandingScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="AdminLogin" 
            component={AdminLoginScreen}
            options={{ title: 'Admin Login' }}
          />
          <Stack.Screen 
            name="AdminDashboard" 
            component={AdminDashboardScreen}
            options={{ title: 'Admin Dashboard' }}
          />
          <Stack.Screen 
            name="DoctorList" 
            component={DoctorListScreen}
            options={{ title: 'Available Doctors' }}
          />
          <Stack.Screen 
            name="DispensaryList" 
            component={DispensaryListScreen}
            options={{ title: 'Nearby Dispensaries' }}
          />
          <Stack.Screen 
            name="AppointmentBooking" 
            component={AppointmentBookingScreen}
            options={{ title: 'Book Appointment' }}
          />
          <Stack.Screen 
            name="AppointmentConfirmation" 
            component={AppointmentConfirmationScreen}
            options={{ title: 'Confirmation' }}
          />
          <Stack.Screen 
            name="AddDoctor" 
            component={AddDoctorScreen}
            options={{ title: 'Add Doctor' }}
          />
          <Stack.Screen 
            name="AddDispensary" 
            component={AddDispensaryScreen}
            options={{ title: 'Add Dispensary' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
