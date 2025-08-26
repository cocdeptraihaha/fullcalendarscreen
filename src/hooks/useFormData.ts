import { useQuery } from '@tanstack/react-query';
import { 
  fetchContacts, 
  fetchStaff, 
  fetchServices, 
  fetchAppointmentTypes,
  getServicesByStaffId 
} from '../services/api';

// Query keys
export const FORM_QUERY_KEYS = {
  contacts: ['contacts'],
  staff: ['staff'],
  services: ['services'],
  appointmentTypes: ['appointmentTypes'],
  servicesByStaff: (staffId: string) => ['services', 'staff', staffId],
} as const;

// Contacts query
export const useContacts = () => {
  return useQuery({
    queryKey: FORM_QUERY_KEYS.contacts,
    queryFn: fetchContacts,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Staff query
export const useStaff = () => {
  return useQuery({
    queryKey: FORM_QUERY_KEYS.staff,
    queryFn: fetchStaff,
    staleTime: 10 * 60 * 1000,
  });
};

// Services query
export const useServices = () => {
  return useQuery({
    queryKey: FORM_QUERY_KEYS.services,
    queryFn: fetchServices,
    staleTime: 10 * 60 * 1000,
  });
};

// Appointment types query
export const useAppointmentTypes = () => {
  return useQuery({
    queryKey: FORM_QUERY_KEYS.appointmentTypes,
    queryFn: fetchAppointmentTypes,
    staleTime: 10 * 60 * 1000,
  });
};

// Services by staff query
export const useServicesByStaff = (staffId: string) => {
  return useQuery({
    queryKey: FORM_QUERY_KEYS.servicesByStaff(staffId),
    queryFn: () => getServicesByStaffId(staffId),
    enabled: !!staffId,
    staleTime: 5 * 60 * 1000,
  });
};