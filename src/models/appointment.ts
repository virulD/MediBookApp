export interface Appointment {
  id: string;
  patientName: string;
  doctorId?: string;
  dispensaryId?: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  phone: string;
  email?: string;
  createdAt: string;
}
