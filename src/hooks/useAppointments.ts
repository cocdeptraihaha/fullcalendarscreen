import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchAppointments, 
  createAppointment, 
  updateAppointment, 
  deleteAppointment 
} from '../services/api';

// Query keys
export const QUERY_KEYS = {
  appointments: ['appointments'],
  appointmentTypes: ['appointmentTypes'],
  contacts: ['contacts'],
  staff: ['staff'],
  services: ['services'],
  staffServices: ['staffServices'],
} as const;

// Appointments query
export const useAppointments = () => {
  return useQuery({
    queryKey: QUERY_KEYS.appointments,
    queryFn: fetchAppointments,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create appointment mutation
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.appointments });
      queryClient.invalidateQueries({ queryKey: ['allData'] });
    },
    onError: (error) => {
      console.error('Create appointment failed:', error);
    },
  });
};

// Update appointment mutation
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      updateAppointment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.appointments });
      queryClient.invalidateQueries({ queryKey: ['allData'] });
    },
    onError: (error) => {
      console.error('Update appointment failed:', error);
    },
  });
};

// Delete appointment mutation
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.appointments });
      queryClient.invalidateQueries({ queryKey: ['allData'] });
    },
    onError: (error) => {
      console.error('Delete appointment failed:', error);
    },
  });
};