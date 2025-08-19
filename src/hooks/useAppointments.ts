import { useQuery } from '@tanstack/react-query';
import { fetchAppointments } from '../services/api';

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
  });
};